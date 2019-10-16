1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
329
330
331
332
333
334
335
336
337
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
364
365
366
367
368
369
370
371
372
373
374
375
376
377
378
379
380
381
382
383
384
385
386
387
388
389
390
391
392
393
394
395
396
397
398
399
400
401
402
403
404
405
406
407
408
409
410
411
412
413
414
415
416
417
418
419
420
421
422
423
424
425
426
427
428
429
430
431
432
433
434
435
436
437
438
439
440
441
442
443
444
445
446
447
448
449
450
451
452
453
454
455
456
457
458
459
460
461
462
463
464
465
466
467
468
469
470
471
472
473
474
475
476
477
478
479
480
481
482
483
484
485
486
487
488
489
490
491
492
493
494
495
496
497
498
499
500
501
502
503
504
505
506
507
508
509
510
511
512
513
514
515
516
517
518
519
520
521
522
523
524
525
526
527
528
529
530
531
532
533
534
535
536
537
538
539
540
541
542
543
544
545
546
547
548
549
550
551
552
553
554
555
556
557
558
559
560
561
562
563
564
565
566
567
568
569
570
571
572
573
574
575
576
577
578
579
580
581
582
583
584
585
586
587
588
589
590
591
592
593
594
595
596
597
598
599
600
601
602
603
604
605
606
607
608
609
610
611
612
613
614
615
616
617
618
619
620
621
622
623
624
625
626
627
628
629
630
631
632
633
634
635
636
637
638
639
640
641
642
643
644
645
646
647
648
649
650
651
652
653
654
655
656
657
658
659
660
661
662
663
664
665
666
667
668
669
670
671
672
673
674
675
676
677
678
679
680
681
682
683
684
685
686
687
688
689
690
691
692
693
694
695
696
697
698
699
700
701
702
703
704
705
706
707
708
709
710
711
712
713
714
715
716
717
718
719
720
721
722
723
724
725
726
727
728
729
730
731
732
733
734
735
736
737
738
739
740
741
742
743
744
745
746
747
748
749
750
751
752
753
754
755
756
757
758
759
760
761
762
763
764
765
766
767
768
769
770
771
772
773
774
775
776
777
778
779
780
781
782
783
784
785
786
787
788
789
790
791
792
793
794
795
796
797
798
799
800
801
802
803
804
805
806
807
808
809
810
811
812
813
814
815
816
817
818
819
820
821
822
823
824
825
826
827
828
829
830
831
832
833
834
835
836
837
838
839
840
841
842
843
844
845
846
847
848
849
850
851
852
853
854
855
856
857
858
859
860
861
862
863
864
865
866
867
868
869
870
871
872
873
874
875
876
877
878
879
880
881
882
883
884
885
886
887
888
889
890
891
892
893
894
895
896
897
898
899
900
901
902
903
904
905
906
907
908
909
910
911
912
913
914
915
916
917
918
919
920
921
922
923
924
925
926
927
928
929
930
931
932
933
934
935
936
937
938
939
940
941
942
943
944
945
946
947
948
949
950
951
952
953
954
955
956
957
958
959
960
961
962
963
964
965
966
967
968
969
970
971
972
973
974
975
976
977
978
979
980
981
982
983
984
985
986
987
988
989
990
991
992
993
994
995
996
997
998
999
1000
1001
1002
1003
1004
1005
1006
1007
1008
1009
1010
1011
1012
1013
1014
1015
1016
1017
1018
1019
1020
1021
1022
1023
1024
1025
1026
1027
1028
1029
1030
1031
1032
1033
1034
1035
1036
1037
1038
1039
1040
1041
1042
1043
1044
1045
1046
1047
1048
1049
1050
1051
1052
1053
1054
1055
1056
1057
1058
1059
1060
1061
1062
1063
1064
1065
1066
1067
1068
1069
1070
1071
1072
1073
1074
1075
1076
1077
1078
1079
1080
1081
1082
1083
1084
1085
1086
1087
1088
1089
1090
1091
1092
1093
1094
1095
1096
1097
1098
1099
1100
1101
1102
1103
1104
1105
1106
1107
1108
1109
1110
1111
1112
1113
1114
1115
1116
1117
1118
1119
1120
1121
1122
1123
1124
1125
1126
1127
1128
1129
1130
1131
1132
1133
1134
1135
1136
1137
1138
1139
1140
1141
1142
1143
1144
1145
1146
1147
1148
1149
1150
1151
1152
1153
1154
1155
1156
1157
1158
1159
1160
1161
1162
1163
1164
1165
1166
1167
1168
1169
1170
1171
1172
1173
1174
1175
1176
1177
1178
1179
1180
1181
1182
1183
1184
1185
1186
1187
1188
1189
1190
1191
1192
1193
1194
1195
1196
1197
1198
1199
1200
1201
1202
1203
1204
1205
1206
1207
1208
1209
1210
1211
1212
1213
1214
1215
1216
1217
1218
1219
1220
1221
1222
1223
1224
1225
1226
1227
1228
1229
1230
1231
1232
1233
1234
1235
1236
1237
1238
1239
1240
1241
1242
1243
1244
1245
1246
1247
1248
1249
1250
1251
1252
1253
1254
1255
1256
1257
1258
1259
1260
1261
1262
1263
1264
1265
1266
1267
1268
1269
1270
1271
1272
1273
1274
1275
1276
1277
1278
1279
1280
1281
1282
1283
1284
1285
1286
1287
1288
1289
1290
1291
1292
1293
1294
1295
1296
1297
1298
1299
1300
1301
1302
1303
1304
1305
1306
1307
1308
1309
1310
1311
1312
1313
1314
1315
1316
1317
1318
1319
1320
1321
1322
1323
1324
1325
1326
1327
1328
1329
1330
1331
1332
1333
1334
1335
1336
1337
1338
1339
1340
1341
1342
1343
1344
1345
1346
1347
1348
1349
1350
1351
1352
1353
1354
1355
1356
1357
1358
1359
1360
1361
1362
1363
1364
1365
1366
1367
1368
1369
1370
1371
1372
1373
1374
1375
1376
1377
1378
1379
1380
1381
1382
1383
1384
1385
1386
1387
1388
1389
1390
1391
1392
1393
1394
1395
1396
1397
1398
1399
1400
1401
1402
1403
1404
1405
1406
1407
1408
1409
1410
1411
1412
1413
1414
1415
1416
1417
1418
1419
1420
1421
1422
1423
1424
1425
1426
1427
1428
1429
1430
1431
1432
1433
1434
1435
1436
1437
1438
1439
1440
1441
1442
1443
1444
1445
1446
1447
1448
1449
1450
1451
1452
1453
1454
1455
1456
1457
1458
1459
1460
1461
1462
1463
1464
1465
1466
1467
1468
1469
1470
1471
1472
1473
1474
1475
1476
1477
1478
1479
1480
1481
1482
1483
1484
1485
1486
1487
1488
1489
1490
1491
1492
1493
1494
1495
1496
1497
1498
1499
1500
1501
1502
1503
1504
1505
1506
1507
1508
1509
1510
1511
1512
1513
1514
1515
1516
1517
1518
1519
1520
1521
1522
1523
1524
1525
1526
1527
1528
1529
1530
1531
1532
1533
1534
1535
1536
1537
1538
1539
1540
1541
1542
1543
1544
1545
1546
1547
1548
1549
1550
1551
1552
1553
1554
1555
1556
1557
1558
1559
1560
1561
1562
1563
1564
1565
1566
1567
1568
1569
1570
1571
1572
1573
1574
1575
1576
1577
1578
1579
1580
1581
1582
1583
1584
1585
1586
1587
1588
1589
1590
1591
1592
1593
1594
1595
1596
1597
1598
1599
1600
1601
1602
1603
1604
1605
1606
1607
1608
1609
1610
1611
1612
1613
1614
1615
1616
1617
1618
1619
1620
1621
1622
1623
1624
1625
1626
1627
1628
1629
1630
1631
1632
1633
1634
1635
1636
1637
1638
1639
1640
1641
1642
1643
1644
1645
1646
1647
1648
1649
1650
1651
1652
1653
1654
1655
1656
1657
1658
1659
1660
1661
1662
1663
1664
1665
1666
1667
1668
1669
1670
1671
1672
1673
1674
1675
1676
1677
1678
1679
1680
1681
1682
1683
1684
1685
1686
1687
1688
1689
1690
1691
1692
1693
1694
1695
1696
1697
1698
1699
1700
1701
1702
1703
1704
1705
1706
1707
1708
1709
1710
1711
1712
1713
1714
1715
1716
1717
1718
1719
1720
1721
1722
1723
1724
1725
1726
1727
1728
1729
1730
1731
1732
1733
1734
1735
1736
1737
1738
1739
1740
1741
1742
1743
1744
1745
1746
1747
1748
1749
1750
1751
1752
1753
1754
1755
1756
1757
1758
1759
1760
1761
1762
1763
1764
1765
1766
1767
1768
1769
1770
1771
1772
1773
1774
1775
1776
1777
1778
1779
1780
1781
1782
1783
1784
1785
1786
1787
1788
1789
1790
1791
1792
1793
1794
1795
1796
1797
1798
1799
1800
1801
1802
1803
1804
1805
1806
1807
1808
1809
1810
1811
1812
1813
1814
1815
1816
1817
1818
1819
1820
1821
1822
1823
1824
1825
1826
1827
1828
1829
1830
1831
1832
1833
1834
1835
1836
1837
1838
1839
1840
1841
1842
1843
1844
1845
1846
1847
1848
1849
1850
1851
1852
1853
1854
1855
1856
1857
1858
1859
1860
1861
1862
1863
1864
1865
1866
1867
1868
1869
1870
1871
1872
1873
1874
1875
1876
1877
1878
1879
1880
1881
1882
1883
1884
1885
1886
1887
1888
1889
1890
1891
1892
1893
1894
1895
1896
1897
1898
1899
1900
1901
1902
1903
1904
1905
1906
1907
1908
1909
1910
1911
1912
1913
1914
1915
1916
const playlist = {
   
  bank: [
    {
      id: 0,
      trigger: "q",
      name: "Aerobics",
      enabled: true,
      overlays: [
        { trigger: "0", location: "overlays", type: "brand", name: "beerBelly_logo_white.png" },
        { trigger: "3", location: "overlays", type: "brand", name: "incidentalBeats_logo_black.png" },
        { trigger: "8", location: "overlays", type: "artist", name: "nprevail_logo_white.png" },
        { trigger: "9", location: "overlays", type: "artist", name: "nprevail_logo_black.png" }
      ],
      gifs: [
        { trigger: "q", location: "Aerobics/", name: "aerobic-trails-1_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobic-trails-2_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobic-trails-3_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobic-trails-4_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobics-leg-warmer-feet_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_1" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_10" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_11" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_12" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_13" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_14" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_15" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_16" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_17" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_18" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_19" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_2" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_20" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_21" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_22" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_23" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_24" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_25" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_26" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_27" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_28" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_29" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_3" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_30" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_31" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_32" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_4" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_5" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_6" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_7" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_8" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_9" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_group1" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_group1_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobics_1_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobics_2_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobics_4_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobics_5_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobics_group_1_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobics_group_2_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobics_group_3_o" },
        { trigger: "q", location: "Aerobics/Group2/", name: "aerobics2_2019-04-2708.42.16" },
        { trigger: "q", location: "Aerobics/Group2/", name: "aerobics2_2019-04-2708.47.44" },
        { trigger: "q", location: "Aerobics/Group2/", name: "aerobics2_2019-04-2708.49.01" },
        { trigger: "q", location: "Aerobics/Group2/", name: "aerobics2_2019-04-2708.50.56" },
        { trigger: "q", location: "Aerobics/Group2/", name: "aerobics2_2019-04-2708.53.20" },
        { trigger: "q", location: "Aerobics/Group2/", name: "aerobics2_2019-04-2708.54.42" },
        { trigger: "q", location: "Aerobics/Group2/", name: "aerobics2_2019-04-2708.56.58" },
        { trigger: "q", location: "Aerobics/Group2/", name: "aerobics2_2019-04-2708.59.30" },
        { trigger: "q", location: "Aerobics/Group2/", name: "aerobics2_2019-04-2709.01.46" },
        { trigger: "q", location: "Aerobics/Group3/", name: "aerobics3_2019-04-2713.26.24" },
        { trigger: "q", location: "Aerobics/Group3/", name: "aerobics3_2019-04-2713.28.16" },
        { trigger: "q", location: "Aerobics/Group3/", name: "aerobics3_2019-04-2713.29.45" },
        { trigger: "q", location: "Aerobics/Group3/", name: "aerobics3_2019-04-2713.31.01" },
        { trigger: "q", location: "Aerobics/Group3/", name: "aerobics3_2019-04-2713.32.58" },
        { trigger: "q", location: "Aerobics/Group3/", name: "aerobics3_2019-04-2713.34.36" },
        { trigger: "q", location: "Aerobics/Group3/", name: "aerobics3_2019-04-2713.35.53" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2709.15.42" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2709.19.02" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2709.20.53" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2709.22.40" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2709.25.01" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2709.26.31" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2709.28.11" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2709.32.35" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2709.35.23" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2709.49.51" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2709.51.11" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2709.53.01" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2709.54.44" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2709.56.20" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2709.58.28" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2709.59.32" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2710.01.07" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2710.03.08" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2711.00.26" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2711.02.08" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2711.03.51" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2711.07.55" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2711.09.27" },
        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise_2019-04-2711.15.38" },
   
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.31.44'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.34.32'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.36.16'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.38.26'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.39.48'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.41.37'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.42.33'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.45.03'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.47.45'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.51.57'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.54.08'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.59.43'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.02.08'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.03.18'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.04.28'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.06.27'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.07.44'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.10.20'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.11.34'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.13.01'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.14.13'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.17.44'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.18.42'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.22.10'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.24.59'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.27.05'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.29.22'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.30.34'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.31.28'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.34.56'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.36.14'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.37.59'},
        { 'trigger' : '', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.39.08'},      ],
      colorPalette: [],
      gradient: false,
      overlays: [
        { trigger: "0", location: "overlays", name: "beerBelly_logo_white.png" },
      ],
    },
    {
      id: 1,
      trigger: "w",
      name: "Dancing",
      enabled: true,
      overlays: [
        { trigger: "1", location: "overlays", type: "brand", name: "beerBelly_logo_black.png" },
        { trigger: "2", location: "overlays", type: "brand", name: "incidentalBeats_logo_white.png" },
        { trigger: "8", location: "overlays", type: "artist", name: "nprevail_logo_white.png" },
        { trigger: "9", location: "overlays", type: "artist", name: "nprevail_logo_black.png" }
      ],
      gifs: [
        { 'trigger' : '', 'location' : 'Heman/', 'name' : 'heman_dodgingLasers_o'},
        { 'trigger' : '', 'location' : 'CableTV/', 'name' : 'cableTV_39'},
        { 'trigger' : '', 'location' : 'Gabber/', 'name' : 'gabber_2019-04-2200.00.37'},
        { 'trigger' : '', 'location' : 'Gabber/', 'name' : 'gabber_2019-04-2200.02.11'},
        { 'trigger' : '', 'location' : 'Gabber/', 'name' : 'gabber_2019-04-2200.03.29'},
        { 'trigger' : '', 'location' : 'Gabber/', 'name' : 'gabber_2019-04-2200.04.30'},
        { 'trigger' : '', 'location' : 'Gabber/', 'name' : 'gabber_2019-04-2200.05.49'},
        { 'trigger' : '', 'location' : 'Gabber/', 'name' : 'gabber_2019-04-2200.06.43'},
        { 'trigger' : '', 'location' : 'Gabber/', 'name' : 'gabber_2019-04-2200.07.57'},
        { 'trigger' : '', 'location' : 'Gabber/', 'name' : 'gabber_2019-04-2200.09.00'},
        { 'trigger' : '', 'location' : 'Gabber/', 'name' : 'gabber_2019-04-2200.09.55'},
        { 'trigger' : '', 'location' : 'Gabber/', 'name' : 'gabber_2019-04-2200.11.03'},
        { 'trigger' : '', 'location' : 'Unarius/', 'name' : 'unarious_29'},
        { trigger: "q", location: "Jem/", name: "jem_lips_o" },
        { trigger: "q", location: "Jem/", name: "jem_misfit_fire_dance2_o" },
        { trigger: "q", location: "Jem/", name: "jem_misfit_fire_dance_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_laurieDancingTransformation_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_laurie_dancingFire_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_laurie_dancingFire_o_t" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_laurie_dancingOutlines2_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_laurie_dancingOutlines2_o_t" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_laurie_dancingOutlines_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_laurie_dancingWavyLines_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_laurie_dancingWavyLines_o_t" },
        { trigger: "q", location: "AnimatedBands/", name: "bradyBunch_dancing_pandas2_o" },
        { trigger: "q", location: "AnimatedBands/", name: "bradyBunch_dancing_pandas_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_dancerCrowd_o" },
        { trigger: "q", location: "AnimatedBands/", name: "sabrinaTeenageWitch_friends_dancing_o" },
        { trigger: "q", location: "AnimatedBands/", name: "sabrinaTeenageWitch_cu_legs_dancing_o" },
        { trigger: "q", location: "AnimatedBands/", name: "sabrinaTeenageWitch_sabrina_dances_withClone_o" },
        { trigger: "q", location: "AnimatedBands/", name: "sabrinaTeenageWitch_sabrina_friend_dances_o" },
        { 'trigger' : '', 'location' : 'RomperRoom/', 'name' : 'romperRoom_13'},
        { 'trigger' : '', 'location' : 'RomperRoom/', 'name' : 'romperRoom_14'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_1'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_10'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_11'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_12'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_13'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_14'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_15'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_16'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_17'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_18'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_19'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_2'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_20'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_21'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_22'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_23'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_24'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_25'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_26'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_27'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_3'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_4'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_5'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_6'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_7'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_8'},
        { trigger : 'q', location : 'FlashBeagle/', name : 'flashBeagle_9'},
        { trigger: "q", location: "BettyBoop/", name: "bettyBoop_2019-04-2401.12.00" },
        { trigger: "q", location: "BettyBoop/", name: "bettyBoop_2019-04-2401.16.04" },
        { trigger: "q", location: "BettyBoop/", name: "bettyBoop_2019-04-2401.17.39" },
        { trigger: "q", location: "BettyBoop/", name: "bettyBoop_2019-04-2401.19.02" },
        { trigger: "q", location: "BettyBoop/", name: "bettyBoop_2019-04-2401.20.28" },
        { trigger: "q", location: "BettyBoop/", name: "bettyBoop_2019-04-2401.21.52" },
        { trigger: "q", location: "BettyBoop/", name: "bettyBoop_2019-04-2401.23.13" },
        { trigger: "q", location: "BettyBoop/", name: "bettyBoop_2019-04-2401.23.58" },
        { trigger: "q", location: "BettyBoop/", name: "bettyBoop_2019-04-2401.25.20" },
        { trigger: "q", location: "BettyBoop/", name: "bettyBoop_2019-04-2401.26.47" },
        { trigger: "q", location: "BettyBoop/", name: "bettyBoop_2019-04-2401.27.47" },
        { trigger: "q", location: "BettyBoop/", name: "bettyBoop_2019-04-2401.31.20" },
        { trigger: "q", location: "BettyBoop/", name: "bettyBoop_2019-04-2401.33.43" },
        { trigger: "q", location: "BettyBoop/", name: "bettyBoop_2019-04-2401.34.37" },
        { trigger: "q", location: "BettyBoop/", name: "bettyBoop_2019-04-2401.37.12" },
        { trigger: "q", location: "BettyBoop/", name: "bettyBoop_2019-04-2401.38.33" },
        { trigger: "q", location: "BettyBoop/", name: "bettyBoop_2019-04-2401.39.38" },
        { trigger: "q", location: "BettyBoop/", name: "bettyBoop_2019-04-2401.40.42" },
        { trigger: "q", location: "BettyBoop/", name: "bettyBoop_2019-04-2401.41.37"},
        { trigger: "q", location: "BettyBoop/", name: "bettyBoop_2019-04-2401.42.52"},
        { trigger: "q", location: "Robots/", name: "digitalDance_seq1_o" },
        { trigger: "q", location: "Robots/", name: "digitalDance_seq2_o" },
        { trigger: "q", location: "Robots/", name: "digitalDance_seq3_o" },
        { trigger: "q", location: "Robots/", name: "digitalDance_seq4_o" },
   
        { 'trigger' : '', 'location' : 'KidVideos/', 'name' : 'hulk-step-walk_o'},
        { 'trigger' : '', 'location' : 'KidVideos/', 'name' : 'dancing-hulk_o'},
        { 'trigger' : '', 'location' : 'KidVideos/', 'name' : 'superhero-toilet-dance_o'},
        { trigger: "q", location: "BotP/", name: "battleOfThePlanets_markOnGlass_o" },
   
        { 'trigger' : '', 'location' : 'VideoKids/', 'name' : 'videokids_4'},
        { 'trigger' : '', 'location' : 'VideoKids/', 'name' : 'videokids_5'},
        { 'trigger' : '', 'location' : 'VideoKids/', 'name' : 'videokids_7'},
        { 'trigger' : '', 'location' : 'VideoKids/', 'name' : 'videokids_9'},
        { 'trigger' : '', 'location' : 'VideoKids/', 'name' : 'videokids_10'},
        { 'trigger' : '', 'location' : 'VideoKids/', 'name' : 'videokids_13'},
        { 'trigger' : '', 'location' : 'VideoKids/', 'name' : 'videokids_14'},
        { 'trigger' : '', 'location' : 'VideoKids/', 'name' : 'videokids_15'},
        { 'trigger' : '', 'location' : 'VideoKids/', 'name' : 'videokids_16'},
        { 'trigger' : '', 'location' : 'VideoKids/', 'name' : 'videokids_17'},
   
        { trigger: "q", location: "Hammerman/", name: "hammerman_hammerDancing2_o" },
        { trigger: "q", location: "Hammerman/", name: "hammerman_hammerDancing3_o" },
        { trigger: "q", location: "Hammerman/", name: "hammerman_hammerDancing4_o" },
        { trigger: "q", location: "Hammerman/", name: "hammerman_hammerFeet2_o" },
        { trigger: "q", location: "Hammerman/", name: "hammerman_hammerFeetDancing_o" },
        { trigger: "q", location: "Hammerman/", name: "hammerman_hammerFeet_o" },
        { trigger: "q", location: "Hammerman/", name: "hammerman_hammer_dance_o" },
        { trigger: "q", location: "Hammerman/", name: "hammerman_hammer_twoFemaleDancers_o" },
        { trigger: "q", location: "Hammerman/", name: "hammerman_intro_shoes_o" },
        { trigger: "q", location: "Hammerman/", name: "hammerman_kidsDancing_o" },
   
        { trigger: "q", location: "BotP/", name: "battleOfThePlanets_discoBallLight_o" },
        { trigger: "q", location: "BotP/", name: "battleOfThePlanets_discoDancers_o" },
        { trigger: "q", location: "BotP/", name: "battleOfThePlanets_keyopDiscoDance_o" },
   
        { 'trigger' : '', 'location' : 'SillySymphoniesPiedPiper/', 'name' : 'piedPiper_childrenSkipping'},
        { 'trigger' : '', 'location' : 'SillySymphoniesPiedPiper/', 'name' : 'piedPiper_crowdChant'},
   
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_19'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_20'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_3'},
   
        { trigger: "q", location: "DancingTrails/", name: "dancingTrails_a" },
        { trigger: "q", location: "DancingTrails/", name: "dancingTrails_b" },
        { trigger: "q", location: "DancingTrails/", name: "dancingTrails_c" },
        { trigger: "q", location: "DancingTrails/", name: "dancingTrails_d" },
        { trigger: "q", location: "DancingTrails/", name: "dancingTrails_e" },
        { trigger: "q", location: "DancingTrails/", name: "dancingTrails_f" },
        { trigger: "q", location: "DancingTrails/", name: "dancingTrails_g" },
        { trigger: "q", location: "DancingTrails/", name: "dancingTrails_h" },
        { trigger: "q", location: "DancingTrails/", name: "dancingTrails_i" },
        { trigger: "q", location: "DancingTrails/", name: "dancingTrails_j" },
   
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycatsSpace_robotDancing_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycatsSpace_robotHandOnHead_o" },
   
        { trigger: "q", location: "BotP/", name: "battleOfThePlanets_princessDiscoDance2_o" },
        { trigger: "q", location: "BotP/", name: "battleOfThePlanets_princessDiscoDance3_o" },
        { trigger: "q", location: "BotP/", name: "battleOfThePlanets_princessDiscoDance4_o" },
        { trigger: "q", location: "BotP/", name: "battleOfThePlanets_princessDiscoDance_o" },
   
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_6'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_7'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_14'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_15'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_16'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_17'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_18'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_19'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_24'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_25'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_26'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_27'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_28'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_29'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_31'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_32'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_33'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_35'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_36'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_38'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_39'},
   
        { trigger: "q", location: "AnimatedBands/", name: "jerryLewis_flamenco_dance1_o" },
        { trigger: "q", location: "AnimatedBands/", name: "jerryLewis_flamenco_dance2_o" },
        { trigger: "q", location: "AnimatedBands/", name: "jerryLewis_runningAroungScreen_o" },
   
        { trigger: "q", location: "Misc/", name: "orbots_girls_dance_o" },
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'Righeira_musicVideo'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'Righeira_musicVideo2'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'Righeira_musicVideo3'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'Righeira_musicVideo4'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'Righeira_musicVideo10'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'Righeira_musicVideo9'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'Righeira_musicVideo12'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'computerAnimation_dinerDancers'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'computerAnimation_ducksMarch'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'computerAnimation_ducksMarch2'},
   
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_dancing1'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_dancing2'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_dancing3'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_dancing4'},
   
        { 'trigger' : '', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_1'},
        { 'trigger' : '', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_10'},
        { 'trigger' : '', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_11'},
        { 'trigger' : '', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_12'},
        { 'trigger' : '', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_13'},
        { 'trigger' : '', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_14'},
        { 'trigger' : '', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_15'},
        { 'trigger' : '', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_16'},
        { 'trigger' : '', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_18'},
        { 'trigger' : '', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_19'},
        { 'trigger' : '', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_2'},
        { 'trigger' : '', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_3'},
        { 'trigger' : '', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_4'},
        { 'trigger' : '', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_5'},
        { 'trigger' : '', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_6'},
        { 'trigger' : '', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_7'},
        { 'trigger' : '', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_8'},
        { 'trigger' : '', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_9'},
   
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_traag_dance-beam-shoot2_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_traag_dance2_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_traag_dance3_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_traag_dance4_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_traag_dance_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_traag_dance_shoot2_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_draag_dance_shoot_REDO'},
   
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_hulaDance1_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_hulaDance2_o" },
        { trigger: "q", location: "JacksonFive/", name: "jackson5_flashing_circle_dancing_silhouettes_o" },
 
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_1'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_3'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_4'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_5'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_6'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_7'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_8'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_9'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_10'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_11'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_15'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_16'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_22'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_28'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_29'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_30'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_36'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_40'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_45'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_46'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_47'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_48'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_06'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_12'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_49'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_07'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_11'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_12'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_13'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_14'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_15'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_39'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_40'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_41'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_42'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_43'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_44'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_49'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_50'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_51'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_52'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_53'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_54'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_63'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_64'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_65'},
      ]
    },
    {
      id: 2,
      trigger: "e",
      name: "BAND - Guitar",
      enabled: true,
      gifs: [
        { 'trigger' : '', 'location' : 'Flintstones/', 'name' : 'flintstones_fred_eyesClosed_holdingGuitar_o'},
        { 'trigger' : '', 'location' : 'Flintstones/', 'name' : 'flintstones_fred_guitar_dance_o'},
        { 'trigger' : '', 'location' : 'Flintstones/', 'name' : 'flintstones_fred_guitar_dance_shuffle2_o'},
        { 'trigger' : '', 'location' : 'Flintstones/', 'name' : 'flintstones_fred_guitar_dance_sideShuffle_o'},
        { 'trigger' : '', 'location' : 'Flintstones/', 'name' : 'flintstones_fred_guitar_dance_spin_o'},
        { 'trigger' : '', 'location' : 'Flintstones/', 'name' : 'flintstones_fred_jumpsOnStage_spin_o'},
        { 'trigger' : '', 'location' : 'Flintstones/', 'name' : 'flintstones_fred_on_ground_guitarFace_o'},
        { 'trigger' : '', 'location' : 'Flintstones/', 'name' : 'flintstones_fred_spins_falls_o'},
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_bass2_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_bass3_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_bass_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_cuGuitarHand_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_guitar2_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_guitar3_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_guitar_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_studio_bass2_O" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_studio_bass_O" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_studio_guitar2_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_studio_guitar_o" },
        { trigger: "q", location: "AnimatedBands/", name: "billAndTed_guitar2_o" },
        { trigger: "q", location: "AnimatedBands/", name: "bradyBunch_cindy_guitar_o" },
        { trigger: "q", location: "AnimatedBands/", name: "groovieGhoulies_wolfman_strums_cu_o" },
        { trigger: "q", location: "AnimatedBands/", name: "groovieGhoulies_wolfman_strums_o" },
        { trigger: "q", location: "AnimatedBands/", name: "missionMagic_rickGuitar_colorChange2_o" },
        { trigger: "q", location: "AnimatedBands/", name: "missionMagic_rickGuitar_colorChange_o" },
        { trigger: "q", location: "AnimatedBands/", name: "myFavoriteMartian_two_guitars_playingThemselves_o" },
        { trigger: "q", location: "AnimatedBands/", name: "myFavoriteMartian_two_playing_guitar_o" },
        { trigger: "q", location: "AnimatedBands/", name: "myFavoriteMartian_two_playing_guitar_withDancers_o" },
        { trigger: "q", location: "AnimatedBands/", name: "bradyBunch_greg_guitar_o" },
        { trigger: "q", location: "AnimatedBands/", name: "silverhawks_strumming_guitar_cu_o" },
        { trigger: "q", location: "AnimatedBands/", name: "silverhawks_strumming_guitar_o" },
        { trigger: "q", location: "AnimatedBands/", name: "bradyBunch_peter_guitar_o" },
        { 'trigger' : '', 'location' : 'HeroHigh/', 'name' : 'heroHigh_punker_play_guitar_o'},
        { 'trigger' : '', 'location' : 'HeroHigh/', 'name' : 'heroHigh_punker_smashedByHeadphones_o'},
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_fingersOnGuitarStrings2_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_fingersOnGuitarStrings_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_fingersOnGuitarStrings_o_t" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_keithAndKidsOutlines2_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_keithAndKidsOutlines3_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_keithAndKidsOutlines_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_keithGuitarOutlines2_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_keithGuitarOutlines_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_laurie_dancingOutlines_keithGuitar_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycatsSpace_redhead_guitar_o" },
        { trigger: "q", location: "Jem/", name: "jem_guitar_and_keyboard_o" },
        { trigger: "q", location: "Jem/", name: "jem_guitar_cu_o" },
        { trigger: "q", location: "Jem/", name: "jem_snake_takes_misfitGuitar_o" },
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_22'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_4'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_5'},
        { 'trigger' : '', 'location' : 'SpongeBob/', 'name' : 'spongeBob_liftingGuitar_o'},
        { 'trigger' : '', 'location' : 'SpongeBob/', 'name' : 'spongeBob_sandy_guitar_o'},
   
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_guitar1'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_guitar3'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_guitar4'},
        { 'trigger' : '', 'location' : 'Bravestarr/', 'name' : 'bravestarr_bass_strum'},
        { 'trigger' : '', 'location' : 'Bravestarr/', 'name' : 'bravestarr_guitar_strum_electricity'},
        { 'trigger' : '', 'location' : 'Bravestarr/', 'name' : 'bravestarr_oldMan_guitarElectricty'},
        { 'trigger' : '', 'location' : 'MissionMagic/', 'name' : 'missionMagic_rickGuitar_morphToHat'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_07'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_08'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_10'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_11'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_14'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_15'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_21'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_23'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_34'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_41'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_55'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_56'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_65'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_73'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_05'},
      ]
    },
    {
      id: 3,
      trigger: "r",
      name: "BAND - Drums",
      enabled: true,
      gifs: [
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_drummer2_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_drummer_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_studioCUDrummer_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_studio_drummer2_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_studio_drummerSlowZoom_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_studio_drummer_o" },
        { trigger: "q", location: "AnimatedBands/", name: "bradyBunch_bobby_drums_o" },
        { trigger: "q", location: "AnimatedBands/", name: "bradyBunch_greg_guitar_bobby_drums_o" },
        { trigger: "q", location: "AnimatedBands/", name: "sabrinaTeenageWitch_caveman_beats_drum_fast_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycatsSpace_blonde_drumming_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_drumsticksPlaying_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_drumsticksPlaying_o_t" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_chris_drums2_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_chris_drums_o" },
        { trigger: "q", location: "Jem/", name: "jem_drumming_fire_o" },
        { trigger: "q", location: "Jem/", name: "jem_drumming_o" },
        { trigger: "q", location: "Jem/", name: "jem_drums2_o" },
        { trigger: "q", location: "Jem/", name: "jem_drums_o" },
        { trigger: "q", location: "Jem/", name: "jem_hittingDrumPads_o" },
        { 'trigger' : '', 'location' : 'PercussionInstruments/', 'name' : 'percussion_bassDrumKick'},
        { 'trigger' : '', 'location' : 'PercussionInstruments/', 'name' : 'percussion_bongos'},
        { 'trigger' : '', 'location' : 'PercussionInstruments/', 'name' : 'percussion_cowbell'},
        { 'trigger' : '', 'location' : 'PercussionInstruments/', 'name' : 'percussion_hittingDrum'},
        { 'trigger' : '', 'location' : 'PercussionInstruments/', 'name' : 'percussion_maracas'},
        { 'trigger' : '', 'location' : 'PercussionInstruments/', 'name' : 'rotoscopedDrummer'},
        { 'trigger' : '', 'location' : 'SpongeBob/', 'name' : 'spongeBob_patrick_drums_o'},
        { 'trigger' : '', 'location' : 'SpongeBob/', 'name' : 'spongeBob_patrick_drums2_o'},
        { 'trigger' : '', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_jazzKingDrumming'},
        { 'trigger' : '', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_jazzKingDrumming2'},
        { 'trigger' : '', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_jazzKingDrumming3'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'computerAnimation_drummers'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_drummer1'},
        { 'trigger' : '', 'location' : 'Bravestarr/', 'name' : 'bravestarr_man_drumming_o'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_24'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_25'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_26'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_31'},
      ]
    },
    {
      id: 4,
      trigger: "t",
      name: "BAND - Keyboards",
      enabled: true,
      gifs: [
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_keyboards2_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_keyboards_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_studio_keyboards_o" },
        { trigger: "q", location: "AnimatedBands/", name: "groovieGhoulies_countOnKeyboard_o" },
        { trigger: "q", location: "AnimatedBands/", name: "groovieGhoulies_floorKeyboard_o" },
        { trigger: "q", location: "AnimatedBands/", name: "bradyBunch_jan_keyboards2_o" },
        { trigger: "q", location: "AnimatedBands/", name: "bradyBunch_jan_keyboards_o" },
        { trigger: "q", location: "Hammerman/", name: "hammerman_kid_keytar_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_laurie_keyboards2_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_laurie_keyboards_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_shirley_fingers_keyboard_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_shirley_keyboards_cu_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_shirley_keyboards_o" },
        { trigger: "q", location: "Jem/", name: "jem_keyboardAndGuitar_o" },
        { trigger: "q", location: "Jem/", name: "jem_keyboard_o" },
        { trigger: "q", location: "Jem/", name: "jem_keyboards_and_drums_o" },
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_1'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_3'},
        { 'trigger' : '', 'location' : 'SpongeBob/', 'name' : 'spongeBob_keytar_o'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_keytar'},
        { 'trigger' : '', 'location' : 'Bravestarr/', 'name' : 'bravestarr_woman_keytar_o'},
        { 'trigger' : '', 'location' : 'Bravestarr/', 'name' : 'bravestarr_woman_playing_keytar_o'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_23'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_24'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_18'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_29'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_35'},
      ]
    },
    {
      id: 5,
      trigger: "y",
      name: "BAND - Misc",
      enabled: true,
      gifs: [
        { 'trigger' : '', 'location' : 'Flintstones/', 'name' : 'flintstones_barney_birdNeedle_onRecord_o'},
        { 'trigger' : '', 'location' : 'Flintstones/', 'name' : 'flintstones_birdNeedle_onRecord_o'},
        { 'trigger' : '', 'location' : 'Flintstones/', 'name' : 'flintstones_wakeUp_birdNeedle_onRecord_o'},
        { 'trigger' : '', 'location' : 'Flintstones/', 'name' : 'flintstones_betty_wilma_clapping_whistle_o'},
        { 'trigger' : '', 'location' : 'Flintstones/', 'name' : 'flintstones_betty_wilma_groovin_o'},
        { 'trigger' : '', 'location' : 'Bravestarr/', 'name' : 'bravestarr_robot_band_playing_o'},
        { 'trigger' : '', 'location' : 'Bravestarr/', 'name' : 'bravestarr_band_hoedown_singer'},
        { 'trigger' : '', 'location' : 'Bravestarr/', 'name' : 'bravestarr_synth_band_playing_o'},
        { 'trigger' : '', 'location' : 'PercussionInstruments/', 'name' : 'percussion_tambourine'},
        { 'trigger' : '', 'location' : 'PercussionInstruments/', 'name' : 'playingFlute'},
        { 'trigger' : '', 'location' : 'PercussionInstruments/', 'name' : 'playingFlute_stage'},
        { trigger: "q", location: "BotP/", name: "botp_banginSpoonsInCell2_o" },
        { trigger: "q", location: "BotP/", name: "botp_bangingSpoonInCell_o" },
        { trigger: "q", location: "AnimatedBands/", name: "bradyBunch_marsha_tambourine2_o" },
        { trigger: "q", location: "AnimatedBands/", name: "bradyBunch_marsha_tambourine_o" },
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_tracy_tambourines_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycatsSpace_tambourine_o" },
        { trigger: "q", location: "AnimatedBands/", name: "groovieGhoulies_frankenstein_xylophone_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_studio_singer_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceband_singer_o" },
        { trigger: "q", location: "Hammerman/", name: "hammerman_kids_dancingPlaying_o" },
        { trigger: "q", location: "Jem/", name: "jem_bandRockout_o" },
        { trigger: "q", location: "Jem/", name: "jem_misfit_singer_o" },
        { trigger: "q", location: "Jem/", name: "jem_misfits_on_stage_o" },
        { trigger: "q", location: "Jem/", name: "jem_misfits_play2_o" },
        { trigger: "q", location: "Jem/", name: "jem_misfits_play_o" },
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_10'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_11'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_12'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_13'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_2'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_20'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_21'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_30'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_34'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_37'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_8'},
        { 'trigger' : '', 'location' : 'AmericanPop/', 'name' : 'americanPop_9'},
        { 'trigger' : '', 'location' : 'SillySymphoniesPiedPiper/', 'name' : 'piedPiper_flutePlaying'},
        { 'trigger' : '', 'location' : 'SillySymphoniesPiedPiper/', 'name' : 'piedPiper_flutingRatsAtGate'},
        { 'trigger' : '', 'location' : 'SillySymphoniesPiedPiper/', 'name' : 'piedPiper_flutingRatsPrance'},
        { 'trigger' : '', 'location' : 'SillySymphoniesPiedPiper/', 'name' : 'piedPiper_flutingWithRatDance'},
        { 'trigger' : '', 'location' : 'SillySymphoniesPiedPiper/', 'name' : 'piedPiper_flutingWithRats'},
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_crowd_cheer_o" },
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_1'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_2'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_4'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_5'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_6'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_7'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_8'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_9'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_10'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_11'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_12'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_13'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_14'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_15'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_16'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_17'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_18'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_21'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_22'},
   
        { trigger: "q", location: "AnimatedBands/", name: "sabrinaTeenageWitch_floating_record_turntable_o" },
        { trigger: "q", location: "Jem/", name: "jem_flashing_stage_lights_o" },
        { 'trigger' : '', 'location' : 'SpongeBob/', 'name' : 'spongeBob_crowdWithLighters_o'},
        { 'trigger' : '', 'location' : 'SpongeBob/', 'name' : 'spongeBob_onStage_pyrotechnics_o'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_band1'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_band2'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_band3'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_crowd1'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_crowd2'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_crowd3'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_crowd4'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_crowd5'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_crowd6'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_crowd7'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_singer1'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_singer2'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_singer3'},
        { 'trigger' : '', 'location' : 'TheApple/', 'name' : 'TheApple_bim_stage'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_speaker'},
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_audience_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_audience2_o" },
        { 'trigger' : '', 'location' : 'HeroHigh/', 'name' : 'heroHigh_superHeroes_cheer'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'musicNote_hopping'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'musicNote_road'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'musicNote_road2'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_38'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_39'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_44'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_2'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_31'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_32'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_33'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_35'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_37'},
 
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_06'}, // sing
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_08'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_16'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_37'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_48'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_32'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_40'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_42'},
 
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_09'}, // band
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_13'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_17'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_28'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_30'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_35'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_37'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_39'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_66'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_31'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_32'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_01'},
 
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_16'}, // crowd
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_19'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_20'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_22'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_27'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_33'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_36'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_38'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_46'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_47'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_48'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_64'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_72'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_09'},      ]
    },
    {
      id: 6,
      trigger: "u",
      name: "Movement",
      enabled: true,
      overlays: [
        { trigger: "0", location: "overlays", type: "brand", name: "beerBelly_logo_white.png" },
        { trigger: "3", location: "overlays", type: "brand", name: "incidentalBeats_logo_black.png" },
        { trigger: "8", location: "overlays", type: "artist", name: "nprevail_logo_white.png" },
        { trigger: "9", location: "overlays", type: "artist", name: "nprevail_logo_black.png" }
      ],
      gifs: [
        { trigger: "q", location: "Misc/", name: "orbots_running_light_o" },
        { trigger: "q", location: "Misc/", name: "pbs-4_o" },
        { trigger: "q", location: "Misc/", name: "pbs-5_o" },
        { trigger: "q", location: "Misc/", name: "spinning-rainbow-person_o" },
        { trigger: "q", location: "AnimatedShorts/", name: "man_speedos_walking_o" },
        { trigger: "q", location: "AnimatedShorts/", name: "man_speedos_walking_o_t" },
        { trigger: "q", location: "Misc/", name: "walking-block-man" },
        { trigger: "q", location: "Misc/", name: "walking_o" },
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2818.24.32'},
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_running_space_forest_o" },
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_floating_hallway_o" },
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_space_forest_log_jumping_o" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0319.52.32" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0320.00.48" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0320.04.21" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0322.48.46" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0322.50.26" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0321.28.04" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0323.43.46" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0323.46.22" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0400.18.26" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0400.27.52" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0401.24.07" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycatsSpace_intro_alien_hop_o" },
        { trigger: "q", location: "JacksonFive/", name: "jackson5_colorful_walking_silhouettes_hearts_spiral_o" },
        { trigger: "q", location: "JacksonFive/", name: "jackson5_horse_jockey_blob_background_o" },
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_de-om-running-oms_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_deomizer-2_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_deomizer-choking_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_deomizer-running2_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_deomizer-running3_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_deomizer-running_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_deomizing-choking2_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_draag_blind_walk_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_draag_blind_walk_o_boom'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_om_fight1_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_terr_face_balls_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_terr_pest_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_terr_raining_cloud_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_terr_running2_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_terr_running_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_terr_sneak_walk_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_terr_stairs_REDO2'},
        { 'trigger' : '', 'location' : 'KidVideos/', 'name' : 'swimming-hulk-fruit-2_o'},
        { 'trigger' : '', 'location' : 'KidVideos/', 'name' : 'swimming-hulk-fruit_o'},
        { 'trigger' : '', 'location' : 'WaldoKitty/', 'name' : 'waldoKitty_waldo_walking_onShip'},
        { 'trigger' : '', 'location' : 'SuperSeven/', 'name' : 'superSeven_superStretch'},
        { 'trigger' : '', 'location' : 'SuperSeven/', 'name' : 'superSeven_superStretch_arrow_transform'},
        { 'trigger' : '', 'location' : 'SuperSeven/', 'name' : 'superSeven_superStretch_face'},
        { 'trigger' : '', 'location' : 'SuperSeven/', 'name' : 'superSeven_superStretch_jump'},
   
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_hopping_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_badGuys_running_upStairs" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_going_through_the_ringer" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_running_electricity_o" },   
        { trigger: "q", location: "BotP/", name: "botp_2019-02-2721.37.46" },    
        { trigger: "q", location: "BotP/", name: "botp_2019-02-2721.38.17" },        
        { trigger: "q", location: "BotP/", name: "botp_2019-02-2723.20.01" },    
        { trigger: "q", location: "BotP/", name: "botp_2019-02-2721.35.53" },    
        { 'trigger' : '', 'location' : 'HeroHigh/', 'name' : 'heroHigh_surfingOnARocket'},
        { 'trigger' : '', 'location' : 'SpaceSentinels/', 'name' : 'spaceSentinals_astrea_morphs'},
        { 'trigger' : '', 'location' : 'SpaceSentinels/', 'name' : 'spaceSentinals_astrea_running'},
        { 'trigger' : '', 'location' : 'Bravestarr/', 'name' : 'bravestarr_jumping_off_cliff_o'},
        { 'trigger' : '', 'location' : 'Bravestarr/', 'name' : 'bravestarr_running_animals_o'},
        { trigger: "q", location: "BotP/", name: "battleOfThePlanets_markFlipping_o" },
        { trigger: "q", location: "BotP/", name: "battleOfThePlanets_princessFlipping_o" },
        { trigger: "q", location: "SpiralZone/", name: "spiralZone_2019-01-2601.05.12" },
        { trigger: "q", location: "SpiralZone/", name: "spiralZone_2019-01-2603.15.40" },
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2921.33.08'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2921.35.08'},
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_alienWoman_flyAround_orb2_o" },
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_alienWoman_flyAround_orb_o" },
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_woman_flying_around_orb_o" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0401.26.20" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0317.07.47" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0317.19.25" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0318.07.20" },
        { trigger: "q", location: "Hercules/", name: "hercules_transform_constellation_o" },
        { trigger: "q", location: "Hercules/", name: "hercules_women_sparkle_shower2" },
        { trigger: "q", location: "Hercules/", name: "hercules_women_sparkle_shower_o" },
        { trigger: "q", location: "Hercules/", name: "hercules_women_sparkles_fadeOut_o" },
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_om_fight_cheer2_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_collar_making_machine3_REDO'},
        { 'trigger' : '', 'location' : 'VideoKids/', 'name' : 'videokids_11'},
        { 'trigger' : '', 'location' : 'VideoKids/', 'name' : 'videokids_12'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_10'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_23'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_45'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_46'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_47'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_57'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_59'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_60'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_61'},      ]
    },    {
      id: 7,
      trigger: "i",
      name: "",
      enabled: false,
      gifs: [
      ]
    },
   
    {
      id: 8,
      trigger: "o",
      name: "",
      enabled: false,
      gifs: [
      ]
    },
    {
      id: 9,
      trigger: "p",
      name: "",
      enabled: false,
      gifs: [
      ]
    },
   
    {
      id: 10,
      trigger: "a",
      name: "Wild West - Cartoon",
      enabled: true,
      colorPalette: ['#6899ba', '#ddccba', '#cc7667', '#432233', '#b89b97'],
      gradient: true,
      overlays: [
        { trigger: "0", location: "overlays", type: "brand", name: "beerBelly_logo_white.png" },
        { trigger: "3", location: "overlays", type: "brand", name: "incidentalBeats_logo_black.png" },
        { trigger: "6", location: "overlays", type: "artist", name: "floppydisco_western1_black.png" },
        { trigger: "7", location: "overlays", type: "artist", name: "floppydisco_western1_white.png" },
      ],
      gifs: [
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_01'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_02'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_03'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_04'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_05'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_06'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_07'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_08'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_09'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_10'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_11'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_12'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_16'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_17'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_18'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_19'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_20'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_21'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_22'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_23'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_24'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_25'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_26'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_27'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_28'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_29'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_30'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_31'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_32'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_33'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_34'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_35'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_36'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_37'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_38'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_40'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_41'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_44'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_45'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_46'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_47'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_48'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_50'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_51'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_52'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_53'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'wildWest_54'},
      ]
    },
    {
      id: 11,
      trigger: "s",
      name: "Wild West - Landscape",
      colorPalette: ['#6899ba', '#ddccba', '#cc7667', '#432233', '#b89b97'],
      gradient: true,
      enabled: true,
      overlays: [
        { trigger: "1", location: "overlays", type: "brand", name: "beerBelly_logo_black.png" },
        { trigger: "2", location: "overlays", type: "brand", name: "incidentalBeats_logo_white.png" },
        { trigger: "6", location: "overlays", type: "artist", name: "floppydisco_western1_black.png" },
        { trigger: "7", location: "overlays", type: "artist", name: "floppydisco_western1_white.png" },
      ],
      gifs: [ 
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_01'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_02'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_08'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_12'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_16'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_17'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_21'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_37'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_51'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_56'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_57'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_58'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_61'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_62'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_63'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_72'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_73'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_74'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_75'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_76'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_77'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_78'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_79'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_80'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_81'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_82'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_83'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_84'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_86'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_87'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_88'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_89'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_90'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_91'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_92'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_93'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_12'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_13'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_14'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_16'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_17'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_18'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_19'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_20'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_21'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_22'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_24'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_25'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_26'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_29'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_30'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_31'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_32'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_33'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_34'},
      ]
    },
    {
      id: 12,
      trigger: "d",
      name: "Wild West - Animals",
      colorPalette: ['#6899ba', '#ddccba', '#cc7667', '#432233', '#b89b97'],
      gradient: true,
      enabled: true,
      overlays: [
        { trigger: "0", location: "overlays", type: "brand", name: "beerBelly_logo_white.png" },
        { trigger: "3", location: "overlays", type: "brand", name: "incidentalBeats_logo_black.png" },
        { trigger: "6", location: "overlays", type: "artist", name: "floppydisco_western1_black.png" },
        { trigger: "7", location: "overlays", type: "artist", name: "floppydisco_western1_white.png" },
      ],
      gifs: [
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_15'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_27'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_28'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_03'}, 
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_04'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_05'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_06'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_07'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_09'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_10'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_11'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_13'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_14'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_15'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_18'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_19'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_20'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_22'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_23'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_24'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_25'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_26'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_27'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_28'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_29'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_30'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_31'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_32'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_33'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_34'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_35'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_36'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_38'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_39'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_48'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_49'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_50'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_53'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_54'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_55'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_59'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_60'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_64'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_65'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_66'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_67'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_68'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_69'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_70'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_71'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_85'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_94'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_95'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_96'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_97'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_98'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_99'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_100'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_101'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_102'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_103'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_104'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_105'},      ]
    },
    {
      id: 13,
      trigger: "f",
      name: "Wildwest - Cowboys",
      colorPalette: ['#6899ba', '#ddccba', '#cc7667', '#432233', '#b89b97'],
      gradient: true,
      enabled: true,
      overlays: [
        { trigger: "1", location: "overlays", type: "brand", name: "beerBelly_logo_black.png" },
        { trigger: "2", location: "overlays", type: "brand", name: "incidentalBeats_logo_white.png" },
        { trigger: "6", location: "overlays", type: "artist", name: "floppydisco_western1_black.png" },
        { trigger: "7", location: "overlays", type: "artist", name: "floppydisco_western1_white.png" },
      ],
      gifs: [
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_40'}, // cowboy
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_41'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_42'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_43'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_44'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_45'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_46'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_47'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desertAnimals_52'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_01'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_02'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_03'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_04'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_05'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_06'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_07'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_09'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_10'},
        { 'trigger' : '', 'location' : 'WildWest/', 'name' : 'desert_11'},
      ]
    },
    {
      id: 14,
      trigger: "g",
      name: "Galaxy Rangers",
      enabled: true,
      colorPalette: ['#6899ba', '#ddccba', '#cc7667', '#432233', '#b89b97'],
      gradient: true,
      overlays: [
        { trigger: "0", location: "overlays", type: "brand", name: "beerBelly_logo_white.png" },
        { trigger: "3", location: "overlays", type: "brand", name: "incidentalBeats_logo_black.png" },
        { trigger: "6", location: "overlays", type: "artist", name: "floppydisco_western1_black.png" },
        { trigger: "7", location: "overlays", type: "artist", name: "floppydisco_western1_white.png" },
      ],
      gifs: [
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_02'}, // misc
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_03'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_04'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_05'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_43'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_44'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_45'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_51'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_62'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_63'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_68'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_74'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_76'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_17'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_18'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_21'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_36'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_55'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_02'},
        { trigger: "q", location: "AnimatedBands/", name: "silverhawks_strumming_guitar_cu_o" },
        { trigger: "q", location: "AnimatedBands/", name: "silverhawks_strumming_guitar_o" },
 
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_12'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_07'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_11'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_12'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_13'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_14'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_15'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_39'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_41'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_42'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_43'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_50'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_51'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_53'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_63'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_64'},
      ]
    },
    {
      id: 15,
      trigger: "h",
      name: "Stunts",
      enabled: true,
      overlays: [
        { trigger: "1", location: "overlays", type: "brand", name: "beerBelly_logo_black.png" },
        { trigger: "2", location: "overlays", type: "brand", name: "incidentalBeats_logo_white.png" },
        { trigger: "6", location: "overlays", type: "artist", name: "floppydisco_western1_black.png" },
        { trigger: "7", location: "overlays", type: "artist", name: "floppydisco_western1_white.png" },
      ],
      gifs: [
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_1'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_10'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_11'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_12'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_13'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_14'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_15'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_16'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_17'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_18'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_19'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_2'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_20'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_21'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_22'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_23'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_24'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_25'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_3'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_4'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_5'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_6'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_7'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_8'},
        { 'trigger' : '', 'location' : 'HangGliding/', 'name' : 'hangGliding_9'},
   
        { 'trigger' : '', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_1'},
        { 'trigger' : '', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_10'},
        { 'trigger' : '', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_11'},
        { 'trigger' : '', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_12'},
        { 'trigger' : '', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_13'},
        { 'trigger' : '', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_2'},
        { 'trigger' : '', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_3'},
        { 'trigger' : '', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_4'},
        { 'trigger' : '', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_5'},
        { 'trigger' : '', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_6'},
        { 'trigger' : '', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_7'},
        { 'trigger' : '', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_8'},
        { 'trigger' : '', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_9'},
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.11.53" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.14.21" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.14.48" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.17.00" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.18.02" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.18.42" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.20.26" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.21.38" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.22.21" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.23.09" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.24.52" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.26.40" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.27.42" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.28.49" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.30.48" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.34.30" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.36.04" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.38.01" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.38.36" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.40.37" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.46.02" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.48.02" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-1101.50.03" },
        { trigger: "q", location: "ActionUSA/", name: "actionUSA_2019-04-11201.32.47" },
   
        { trigger: "q", location: "AnimatedShorts/", name: "crashing_cars_o" },
        { 'trigger' : '', 'location' : 'KidVideos/', 'name' : 'flying-trucks2_o'},
        { 'trigger' : '', 'location' : 'KidVideos/', 'name' : 'bus-jump-ramp_o'},
        { 'trigger' : '', 'location' : 'KidVideos/', 'name' : 'multiple-buses-jumping_o'},
        { 'trigger' : '', 'location' : 'KidVideos/', 'name' : 'ramp-jumping-trucks_o'},
        { 'trigger' : '', 'location' : 'KidVideos/', 'name' : 'spinning-trucks_o'},
        { 'trigger' : '', 'location' : 'KidVideos/', 'name' : 'superhero-banana-car-fx_o'},
        { 'trigger' : '', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_carChange'},
   
        { 'trigger' : '', 'location' : 'Men/', 'name' : 'Men_2019-04-0200.24.30'},
        { 'trigger' : '', 'location' : 'Men/', 'name' : 'Men_2019-04-0200.25.29'},
        { 'trigger' : '', 'location' : 'Men/', 'name' : 'Men_2019-04-0200.26.51'},
        { 'trigger' : '', 'location' : 'Men/', 'name' : 'Men_2019-04-0200.30.04'},
        { 'trigger' : '', 'location' : 'Men/', 'name' : 'Men_2019-04-0200.48.01'},
        { 'trigger' : '', 'location' : 'Men/', 'name' : 'Men_2019-04-0200.55.05'},
      ]
    },
    {
      id: 16,
      trigger: "j",
      name: "Motorcycle Dummies",
      enabled: true,
      overlays: [
        { trigger: "1", location: "overlays", type: "brand", name: "beerBelly_logo_black.png" },
        { trigger: "2", location: "overlays", type: "brand", name: "incidentalBeats_logo_white.png" },
        { trigger: "6", location: "overlays", type: "artist", name: "floppydisco_western1_black.png" },
        { trigger: "7", location: "overlays", type: "artist", name: "floppydisco_western1_white.png" },
      ],
      gifs: [
        { 'trigger' : '', 'location' : 'Motorcycles/', 'name' : '2019-09-2323.50.39'},
        { 'trigger' : '', 'location' : 'Motorcycles/', 'name' : '2019-09-2323.52.05'},
        { 'trigger' : '', 'location' : 'Motorcycles/', 'name' : '2019-09-2323.53.35'},
        { 'trigger' : '', 'location' : 'Motorcycles/', 'name' : '2019-09-2323.55.18'},
        { 'trigger' : '', 'location' : 'Motorcycles/', 'name' : '2019-09-2323.56.50'},
        { 'trigger' : '', 'location' : 'Motorcycles/', 'name' : '2019-09-2323.58.42'},
        { 'trigger' : '', 'location' : 'Motorcycles/', 'name' : '2019-09-2323.59.57'},
        { 'trigger' : '', 'location' : 'Motorcycles/', 'name' : '2019-09-2400.01.28'},
        { 'trigger' : '', 'location' : 'Motorcycles/', 'name' : '2019-09-2400.03.16'},
        { 'trigger' : '', 'location' : 'Motorcycles/', 'name' : '2019-09-2400.05.17'},
        { 'trigger' : '', 'location' : 'Motorcycles/', 'name' : '2019-09-2400.07.22'},
   
        { 'trigger' : '', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.27.31'},
        { 'trigger' : '', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.28.12'},
        { 'trigger' : '', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.30.43'},
        { 'trigger' : '', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.32.53'},
        { 'trigger' : '', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.34.32'},
        { 'trigger' : '', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.36.02'},
        { 'trigger' : '', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.37.17'},
        { 'trigger' : '', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.38.22'},
        { 'trigger' : '', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.40.51'},
        { 'trigger' : '', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.41.45'},
        { 'trigger' : '', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.43.00'},
        { 'trigger' : '', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.44.05'},
        { 'trigger' : '', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.45.27'},
        { 'trigger' : '', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.47.24'},
        { 'trigger' : '', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.50.01'},
        { 'trigger' : '', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.51.47'},
        { 'trigger' : '', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.52.49'},
        { 'trigger' : '', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.53.58'},
        { 'trigger' : '', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.55.52'},
        { 'trigger' : '', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.58.10'},
      ]
    },
    {
      id: 17,
      trigger: "k",
      name: "Skateboarding",
      enabled: true,
      colorPalette: ['#f5c600', '#d8460b', '#c21703', '#9b4923', '#007291'],
      gradient: true,
      overlays: [
        { trigger: "0", location: "overlays", type: "brand", name: "beerBelly_logo_white.png" },
        { trigger: "3", location: "overlays", type: "brand", name: "incidentalBeats_logo_black.png" },
        { trigger: "6", location: "overlays", type: "artist", name: "floppydisco_western1_black.png" },
        { trigger: "7", location: "overlays", type: "artist", name: "floppydisco_western1_white.png" },
      ],
      gifs: [
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_01'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_02'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_03'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_04'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_05'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_06'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_07'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_08'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_09'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_10'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_11'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_12'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_13'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_14'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_15'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_16'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_17'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_18'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_19'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_20'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_21'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_22'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_23'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_24'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_25'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_26'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_27'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_28'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_29'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_30'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_31'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_32'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_33'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_34'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_35'},
        { 'trigger' : '', 'location' : 'Skateboarding/', 'name' : 'skateboarding_36'},      ]
    },
    {
      id: 18,
      trigger: "l",
      name: "",
      enabled: false,
      gifs: [
      ]
    },
   
    {
      id: 19,
      trigger: "z",
      name: "fiftytwovista - Modern Art",
      enabled: true,
      colorPalette: ['#344261', '#4B665F', '#7C8F74', '#8A7D37', '#566A6B','#856F5D','#6B6B6B','#858585','#332A42'],
      gradient: true,
      overlays: [
        { trigger: "1", location: "overlays", type: "brand", name: "beerBelly_logo_black.png" },
        { trigger: "2", location: "overlays", type: "brand", name: "incidentalBeats_logo_white.png" },
        { trigger: "4", location: "overlays", type: "artist", name: "fiftytwovista_logo_white.png" },
        { trigger: "5", location: "overlays", type: "artist", name: "fiftytwovista_logo_black.png" },
      ],
      gifs: [
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'Book'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'Bust'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'Check'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'Circle morph'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'Door'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'IMG_8661'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'Paint circle'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'Rook'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'amsterdamn'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'apple'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'arc 2'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'architect lines'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'architecture'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'ball wavy'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'ball women'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'barcelona arc'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'beads'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'bjork'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'building collaspe'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'bull f'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'bull'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'bust2'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'bust3'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'bust4'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'cactus'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'chess'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'church'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'circle'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'city'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'cycle draw'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'draw person 2'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'draw person'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'drawing eye'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'drawing morph'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'floor'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'galaxies'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'hand rock'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'joffrey'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'letters'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'mosq'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'palm pool'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'pillar'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'plam tree'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'prague'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'red lines draw'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'roman'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'running'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'share circle'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'shirt spin'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'shooting star'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'sketch'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'space beads'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'squid ball white'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'squid ball'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'statue collaspe'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'train'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'turntable'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'volume'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'wall'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'wire'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'women reach'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/Modern/', 'name' : 'women'},
      ]
    },
    {
      id: 20,
      trigger: "x",
      name: "fiftytwovista - EV",
      enabled: true,
      colorPalette: ['#344261', '#4B665F', '#7C8F74', '#8A7D37', '#566A6B','#856F5D','#6B6B6B','#858585','#332A42'],
      gradient: true,
      overlays: [
        { trigger: "0", location: "overlays", type: "brand", name: "beerBelly_logo_white.png" },
        { trigger: "3", location: "overlays", type: "brand", name: "incidentalBeats_logo_black.png" },
        { trigger: "4", location: "overlays", type: "artist", name: "fiftytwovista_logo_white.png" },
        { trigger: "5", location: "overlays", type: "artist", name: "fiftytwovista_logo_black.png" },
      ],
      gifs: [
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/EV/', 'name' : 'Rolling'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/EV/', 'name' : 'SD'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/EV/', 'name' : 'artic'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/EV/', 'name' : 'carlight'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/EV/', 'name' : 'fluid art'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/EV/', 'name' : 'leaf drip'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/EV/', 'name' : 'money'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/EV/', 'name' : 'plam'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/EV/', 'name' : 'plams color'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/EV/', 'name' : 'plams deep'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/EV/', 'name' : 'plane'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/EV/', 'name' : 'solar'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/EV/', 'name' : 'stranger'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/EV/', 'name' : 'time stratch'},
        { 'trigger' : 'q', 'location' : 'Fiftytwovista/EV/', 'name' : 'wacy colors'},
      ]
    },
    {
      id: 21,
      trigger: "c",
      name: "ZOOM",
      enabled: true,
      gifs: [
        { trigger: "q", location: "Flythroughs/", name: "flythrough_a" },
        { trigger: "q", location: "Flythroughs/", name: "flythrough_g" },
        { trigger: "q", location: "Flythroughs/", name: "flythrough_i" },
        { trigger: "q", location: "Flythroughs/", name: "flythrough_n" },
        { trigger: "q", location: "Flythroughs/", name: "flythrough_o" },
        { trigger: "q", location: "Flythroughs/", name: "flythrough_p" },
        { trigger: "q", location: "Flythroughs/", name: "flythrough_q copy" },
        { trigger: "q", location: "Flythroughs/", name: "flythrough_q" },
        { trigger: "q", location: "Flythroughs/", name: "flythrough_s copy" },
        { trigger: "q", location: "Flythroughs/", name: "flythrough_s" },
        { trigger: "q", location: "Flythroughs/", name: "flythrough_t" },
        { trigger: "q", location: "CanyonFly/", name: "canyon_fly_1_o" },
        { trigger: "q", location: "CanyonFly/", name: "canyon_fly_2_o" },
        { trigger: "q", location: "CanyonFly/", name: "canyon_fly_2_o_t" },
        { trigger: "q", location: "CanyonFly/", name: "canyon_fly_3_o" },
        { trigger: "q", location: "CanyonFly/", name: "canyon_fly_3_o_t" },
        { trigger: "q", location: "CanyonFly/", name: "canyon_fly_3_t" },
        { trigger : 'q', location : 'Men/', name : 'Men_2019-04-0200.56.45'},
        { trigger : 'q', location : 'Men/', name : 'Men_2019-04-0200.57.42'},
        { trigger : 'q', location : 'Men/', name : 'Men_2019-04-0200.59.12'},
        { trigger : 'q', location : 'Men/', name : 'Men_2019-04-0200.54.13'},
        { trigger : 'q', location : 'Men/', name : 'Men_2019-04-0200.55.53'},
        { trigger: "q", location: "GridLines/", name: "e" },
        { trigger: "q", location: "GridLines/", name: "gird-open-doors" },
        { trigger: "q", location: "GridLines/", name: "h" },
        { trigger: "q", location: "GridLines/", name: "i" },
        { trigger: "q", location: "GridLines/", name: "m copy" },
        { trigger: "q", location: "GridLines/", name: "n copy" },
        { trigger: "q", location: "GridLines/", name: "r copy" },
        { trigger: "q", location: "GridLines/", name: "rainbow-sidewalk" },
        { trigger: "q", location: "GridLines/", name: "s" },
        { trigger: "q", location: "GridLines/", name: "t" },
        { trigger: "q", location: "GridLines/", name: "trench-fly-stars" },
        { trigger: "q", location: "GridLines/", name: "w copy" },
        { trigger: "q", location: "GridLines/", name: "w" },
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'castle_flythrough'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'castle_flythrough2'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'desert_trainRide'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'planet_flyThrough1'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'planet_flyThrough2'},
        { trigger: "q", location: "Misc/", name: "city-grid-2_o" },
        { trigger: "q", location: "Misc/", name: "city-grid_o" },
        { trigger: "q", location: "Misc/", name: "electro_pyramid_zoom" },
        { trigger: "q", location: "Misc/", name: "forbidden_world_hyperspace2" },
        { trigger: "q", location: "Misc/", name: "golden-flows_o" },
        { trigger: "q", location: "Misc/", name: "grid-open-doors_o" },
        { trigger: "q", location: "Misc/", name: "lit_wired_tunnel_o" },
        { trigger: "q", location: "Misc/", name: "rainbow_hypnotic_circles_o" },
        { trigger: "q", location: "Misc/", name: "rainbow_sparkler_zoom" },
        { trigger: "q", location: "Misc/", name: "rainbow_spinning_circles" },
        { trigger: "q", location: "Misc/", name: "spinning_space_planes" },
        { trigger: "q", location: "Misc/", name: "star_explosion_bubbles" },
        { trigger: "q", location: "Misc/", name: "stationId_black_hole_o" },
        { trigger: "q", location: "Misc/", name: "stationId_star_tunnel_o" },
        { trigger: "q", location: "Misc/", name: "stationId_star_tunnel_o_t" },
        { trigger: "q", location: "Misc/", name: "tron_zoom-into-grid_o" },
        { trigger: "q", location: "Misc/", name: "ttriangular_infinity_morph_o" },
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'computerAnimation_bulletTrain'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'computerAnimation_carrierLanding'},
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_chased_by_wave2_o" },
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_chased_by_wave_o" },
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_city_flythrough_o" },
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_flythrough_blocky_caverns_o" },
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_geometric_cave_flythrough_o" },
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_lighted_tunnel_o_t" },
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_pink_space_clouds_o" },
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_ship_flying_into_spaceClouds_o" },
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_takeoff_tunnel_o" },
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_takeoff_tunnel_withOrb_o" },
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_tunnel_twist_o_t" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0320.15.08" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0322.21.01" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0322.43.52" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0319.17.18" },
        { trigger: "q", location: "Misc/", name: "orbots_light_zoom_o" },
        { trigger: "q", location: "Misc/", name: "orbots_light_zoom_o_t" },
        { trigger: "q", location: "AnimatedShorts/", name: "shattered_triangles_o" },
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2918.46.05'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2918.54.28'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'fork_hallway1'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'fork_hallway2'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'fork_hallway3'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'fork_hallway4'},
        { trigger: "q", location: "Misc/", name: "colored_rectangular_dance" },
        { trigger: "q", location: "Misc/", name: "att_glowing_wired" },
        { trigger: "q", location: "JapaneseAnims/", name: "japan_FileAug08123439AM" },
        { trigger: "q", location: "JapaneseAnims/", name: "japan_FileAug08123703AM" },
        { trigger: "q", location: "JapaneseAnims/", name: "japan_FileJul1813455AM" },
        { trigger: "q", location: "JapaneseAnims/", name: "japan_FileJul1813902AM" },
        { trigger: "q", location: "JapaneseAnims/", name: "japan_FileJul1813914AM" },
        { trigger: "q", location: "JapaneseAnims/", name: "japan_FileJul1813937AM" },
        { trigger: "q", location: "JapaneseAnims/", name: "japan_FileJul1813947AM" },
        { trigger: "q", location: "JapaneseAnims/", name: "japan_FileJul1813957AM" },
        { trigger: "q", location: "JapaneseAnims/", name: "japan_FileJul1814555AM" },
        { trigger: "q", location: "JapaneseAnims/", name: "japan_FileJul184611AM" },
        { trigger: "q", location: "JapaneseAnims/", name: "japan_Jul1814018AM" },
        { trigger: "q", location: "JapaneseAnims/", name: "japan_Jul1814415AM" },
        { trigger: "q", location: "JapaneseAnims/", name: "japan_Jul1814448AM" },
        { trigger: "q", location: "JapaneseAnims/", name: "japan_Jul1814457AM" },
        { trigger: "q", location: "JapaneseAnims/", name: "japan_Jul1814510AM" },
        { trigger: "q", location: "JapaneseAnims/", name: "japan_Jul1814521AM" },
        { trigger: "q", location: "JapaneseAnims/", name: "japan_Jul1814531AM" },
        { trigger: "q", location: "JapaneseAnims/", name: "japan_Jul1814544AM" },
        { trigger: "q", location: "JapaneseAnims/", name: "japan_electrifying_organs" },
        { trigger: "q", location: "JapaneseAnims/", name: "japan_explosion_eray_tunnel_zoom_o" },      ]
    },
    {
      id: 22,
      trigger: "v",
      name: "Bathbombs Matter",
      enabled: true,
      gifs: [
        { trigger: "q", location: "BathBombs/", name: "bathbomb-boomerang_o" },
        { trigger: "q", location: "BathBombs/", name: "bathbomb-galaxy-1_o" },
        { trigger: "q", location: "BathBombs/", name: "bathbomb-galaxy-2_o" },
        { trigger: "q", location: "BathBombs/", name: "bathbomb-slow-1_o" },
        { trigger: "q", location: "BathBombs/", name: "bathbomb-slow-2_o" },
        { trigger: "q", location: "BathBombs/", name: "bathbomb-spinner-1_o" },
        { trigger: "q", location: "BathBombs/", name: "bathbomb-spinner-2_o" },
        { trigger: "q", location: "BathBombs/", name: "bathbomb-spinner-blur_o" },
        { trigger: "q", location: "Ferrofluid/", name: "ferrofluid-burst_o" },
        { trigger: "q", location: "Ferrofluid/", name: "ferrofluid-pingpong-1_o" },
        { trigger: "q", location: "Ferrofluid/", name: "ferrofluid-pingpong-2_o" },
        { trigger: "q", location: "Ferrofluid/", name: "ferrofluid-pingpong-3_o" },
        { trigger: "q", location: "Ferrofluid/", name: "ferrofluid-symetrical-dance-2_o" },
        { trigger: "q", location: "FullTimeTrumpet/", name: "full-time-trumpet-FX-1_o" },
        { trigger: "q", location: "FullTimeTrumpet/", name: "full-time-trumpet-FX-1_transparent_o" },
        { trigger: "q", location: "FullTimeTrumpet/", name: "full-time-trumpet-FX-2_o" },
        { trigger: "q", location: "FullTimeTrumpet/", name: "full-time-trumpet-FX-2_transparent_o" },
        { trigger: "q", location: "FullTimeTrumpet/", name: "full-time-trumpet-FX-3_o" },
        { trigger: "q", location: "FullTimeTrumpet/", name: "full-time-trumpet-FX-3_transparent_o" },
        { trigger: "q", location: "FullTimeTrumpet/", name: "full-time-trumpet-FX-4_o" },
        { trigger: "q", location: "FullTimeTrumpet/", name: "full-time-trumpet-FX-4_transparent_o" },
        { trigger: "q", location: "Matter/", name: "matterOne_2019-04-1300.37.36_t" },
        { trigger: "q", location: "Matter/", name: "matterOne_2019-04-1300.38.36_t" },
        { trigger: "q", location: "Matter/", name: "matterOne_2019-04-1300.39.35_t" },
        { trigger: "q", location: "Matter/", name: "matterOne_2019-04-1300.40.26_t" },
        { trigger: "q", location: "Matter/", name: "matterOne_2019-04-1300.41.29_t" },
        { trigger: "q", location: "Matter/", name: "matterOne_2019-04-1300.42.16_t" },
        { trigger: "q", location: "Matter/", name: "matterOne_2019-04-1300.43.25_t" },
        { trigger: "q", location: "Matter/", name: "matterOne_2019-04-1300.44.15_t" },
        { trigger: "q", location: "Matter/", name: "matterOne_2019-04-1300.46.07_t" },
        { trigger: "q", location: "Matter/", name: "matterOne_2019-04-1300.46.55_t" },
        { trigger: "q", location: "Matter/", name: "matterTwo_2019-04-13-15.11.23_t" },
        { trigger: "q", location: "Matter/", name: "matterTwo_2019-04-13-15.12.09_t" },
        { trigger: "q", location: "Matter/", name: "matterTwo_2019-04-13-15.17.55_2t" },
        { trigger: "q", location: "Matter/", name: "matterTwo_2019-04-13-15.17.55_t" },
        { trigger: "q", location: "Matter/", name: "matterTwo_2019-04-14-16.35.15" },
        { trigger: "q", location: "Matter/", name: "matterTwo_2019-04-14-16.35.15_t" },
        { trigger: "q", location: "Misc/", name: "forest-forgery-1-B-FX1_o" },
        { trigger: "q", location: "Misc/", name: "forest-forgery-2-F2-FX_o" },
        { trigger: "q", location: "Rainbow/", name: "a" },
        { trigger: "q", location: "Rainbow/", name: "b" },
        { trigger: "q", location: "Rainbow/", name: "cruz-lights-1" },
        { trigger: "q", location: "Rainbow/", name: "cruz-lights-2" },
        { trigger: "q", location: "Rainbow/", name: "cruz-lights-3" },
        { trigger: "q", location: "Rainbow/", name: "cruz-lights-4" },
        { trigger: "q", location: "Rainbow/", name: "cruz-lights-5" },
        { trigger: "q", location: "Rainbow/", name: "d" },
        { trigger: "q", location: "Rainbow/", name: "e" },
        { trigger: "q", location: "Rainbow/", name: "f" },
        { trigger: "q", location: "Rainbow/", name: "g" },
        { trigger: "q", location: "Rainbow/", name: "h" },
        { trigger: "q", location: "Rainbow/", name: "i" },
        { trigger: "q", location: "Rainbow/", name: "j" },
        { trigger: "q", location: "Rainbow/", name: "l" },
        { trigger: "q", location: "Rainbow/", name: "o" },
        { trigger: "q", location: "Rainbow/", name: "p" },
        { trigger: "q", location: "Rainbow/", name: "patriotic-orb" },
        { trigger: "q", location: "Rainbow/", name: "rainbow-checker-tunnel" },
        { trigger: "q", location: "Rainbow/", name: "rainbow-gradients" },
        { trigger: "q", location: "Rainbow/", name: "spinning-checkered-pyramid" },
      ]
    },
    {
      id: 23,
      trigger: "b",
      name: "Circles",
      enabled: true,
      gifs: [
        { trigger: "q", location: "SpinningCircles/", name: "d" },
        { trigger: "q", location: "SpinningCircles/", name: "e" },
        { trigger: "q", location: "SpinningCircles/", name: "f" },
        { trigger: "q", location: "SpinningCircles/", name: "i copy" },
        { trigger: "q", location: "SpinningCircles/", name: "i" },
        { trigger: "q", location: "SpinningCircles/", name: "j copy" },
        { trigger: "q", location: "SpinningCircles/", name: "j" },
        { trigger: "q", location: "SpinningCircles/", name: "l" },
        { trigger: "q", location: "SpinningCircles/", name: "n" },
        { trigger: "q", location: "SpinningCircles/", name: "p" },
        { trigger: "q", location: "SpinningCircles/", name: "q" },
        { trigger: "q", location: "SpinningCircles/", name: "rainbow_hypnotic_circles_o" },
        { trigger: "q", location: "SpinningCircles/", name: "rainbow_sparkler_zoom" },
        { trigger: "q", location: "SpinningCircles/", name: "rainbow_spinning_circles" },
        { trigger: "q", location: "SpinningCircles/", name: "z" },
        { trigger: "q", location: "Eyes/", name: "eye_laser_sparkles_o" },
        { trigger: "q", location: "Eyes/", name: "eye_lasers_1_o" },
        { trigger: "q", location: "Eyes/", name: "eyes_r_o" },
        { trigger: "q", location: "Eyes/", name: "eyes_s_o" },
        { trigger: "q", location: "JacksonFive/", name: "jackson5_flashingSun_o" },
      ]
    },
    {
      id: 24,
      trigger: "n",
      name: "Spacey",
      enabled: true,
      gifs: [
        { trigger: "q", location: "WonderTwins/", name: "wondertwins_spiralSpin_o" },
        { trigger: "q", location: "BotP/", name: "botp_flashingLights_o" },
        { trigger: "q", location: "BotP/", name: "botp_lightBeams_o" },
        { trigger: "q", location: "BotP/", name: "botp_lightsFlashing_o" },
        { trigger: "q", location: "BotP/", name: "botp_trippyGalaxy_o" },
        { trigger: "q", location: "BotP/", name: "botp_trippyRainbowTunnel_o" },
        { trigger: "q", location: "SpiralZone/", name: "spiralZone_2019-01-2603.18.48" },
        { 'trigger' : '', 'location' : 'VideoKids/', 'name' : 'videokids_18'},
        { 'trigger' : '', 'location' : 'VideoKids/', 'name' : 'videokids_19'},
        { 'trigger' : '', 'location' : 'VideoKids/', 'name' : 'videokids_20'},
        { 'trigger' : '', 'location' : 'SuperSeven/', 'name' : 'superSeven_explosion'},
        { 'trigger' : '', 'location' : 'SuperSeven/', 'name' : 'superSeven_explosion2'},
        { 'trigger' : '', 'location' : 'SuperSeven/', 'name' : 'superSeven_webWoman_transform'},
        { 'trigger' : '', 'location' : 'SuperSeven/', 'name' : 'superSeven_star_background'},
        { 'trigger' : '', 'location' : 'WaldoKitty/', 'name' : 'waldoKitty_shootingStars_inSpace'},
        { 'trigger' : '', 'location' : 'Unarius/', 'name' : 'unarious_2'},
        { 'trigger' : '', 'location' : 'Unarius/', 'name' : 'unarious_4'},
        { 'trigger' : '', 'location' : 'Unarius/', 'name' : 'unarious_10'},
        { 'trigger' : '', 'location' : 'Unarius/', 'name' : 'unarious_11'},
        { 'trigger' : '', 'location' : 'Unarius/', 'name' : 'unarious_12'},
        { 'trigger' : '', 'location' : 'Unarius/', 'name' : 'unarious_14'},
        { 'trigger' : '', 'location' : 'Unarius/', 'name' : 'unarious_15'},
        { 'trigger' : '', 'location' : 'Unarius/', 'name' : 'unarious_17'},
        { 'trigger' : '', 'location' : 'Unarius/', 'name' : 'unarious_18'},
        { 'trigger' : '', 'location' : 'Unarius/', 'name' : 'unarious_21'},
        { 'trigger' : '', 'location' : 'Unarius/', 'name' : 'unarious_22'},
        { 'trigger' : '', 'location' : 'Unarius/', 'name' : 'unarious_25'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2702.19.45'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2702.33.53'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2702.42.35'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2702.56.55'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2702.59.06'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2703.03.57'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2703.08.51'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2703.16.56'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2703.19.16'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2703.20.48'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2703.24.22'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2708.16.34'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2708.17.55'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2708.19.04'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2708.51.32'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2708.59.27'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2709.01.21'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2709.03.05'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2709.14.49'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2709.28.31'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2709.33.45'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2710.32.17'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2711.00.55'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2711.02.50'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2711.10.03'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2711.11.45'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2711.14.19'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2711.15.53'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2711.19.25'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2718.34.57'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2718.46.04'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2810.11.18'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2810.14.07'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2810.15.09'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2810.19.04'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2922.44.55'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2923.03.49'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_1'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_10'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_11'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_12'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_13'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_14'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_15'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_16'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_17'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_18'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_19'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_2'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_20'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_21'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_22'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_23'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_24'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_25'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_26'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_3'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_4'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_5'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_6'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_7'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_8'},
        { 'trigger' : '', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_9'},
        { trigger: "q", location: "Misc/", name: "john-whitney-4_o" },
        { trigger: "q", location: "Misc/", name: "john-whitney-5_o" },
        { trigger: "q", location: "Misc/", name: "fantasticVoyage_spinningStripes_o" },
        { trigger: "q", location: "Hercules/", name: "hercules_explosion_stars" },
        { trigger: "q", location: "Hercules/", name: "hercules_green_beams" },
        { trigger: "q", location: "Hercules/", name: "hercules_movie_intro_1" },
        { trigger: "q", location: "Hercules/", name: "hercules_movie_intro_eye2_o" },
        { trigger: "q", location: "Hercules/", name: "hercules_movie_intro_eye3_o" },
        { trigger: "q", location: "Hercules/", name: "hercules_space_tunnel_explosion_o" },
        { trigger: "q", location: "Hercules/", name: "hercules_star_explosions" },
        { trigger: "q", location: "BotP/", name: "battleOfThePlanets_spaceStarLight_o" },
        { 'trigger' : '', 'location' : 'Blackstar/', 'name' : 'blackstar_ship_flying_space'},
        { 'trigger' : '', 'location' : 'Blackstar/', 'name' : 'blackstar_space_explosion'},
        { 'trigger' : '', 'location' : 'Blackstar/', 'name' : 'blackstar_planet_sagar'},
        { trigger: "q", location: "Aerobics/", name: "abc-start_o" },
        { trigger: "q", location: "Misc/", name: "kaleidoscope_pointed_muted" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0317.04.28" },
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2818.30.20'},
        { trigger: "q", location: "Misc/", name: "tvshow_man_floating_triangle_o" },
        { 'trigger' : '', 'location' : 'Unarius/', 'name' : 'unarious_3'},
        { 'trigger' : '', 'location' : 'Unarius/', 'name' : 'unarious_5'},
        { 'trigger' : '', 'location' : 'Unarius/', 'name' : 'unarious_6'},
        { 'trigger' : '', 'location' : 'Unarius/', 'name' : 'unarious_1'},
        { 'trigger' : '', 'location' : 'Unarius/', 'name' : 'unarious_16'},      ]
    },
    {
      id: 25,
      trigger: "m",
      name: "Buttons & Knobs",
      enabled: true,
      gifs: [
        { 'trigger' : '', 'location' : 'WaldoKitty/', 'name' : 'waldoKitty_dogLeader_pushing_buttons'},
        { trigger: "q", location: "BotP/", name: "botp_spectograph2_o" },
        { 'trigger' : '', 'location' : 'WaldoKitty/', 'name' : 'waldoKitty_dog_leader_pulls_lever'},
        { 'trigger' : '', 'location' : 'WaldoKitty/', 'name' : 'waldoKitty_female_cat_flashing_screen'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'pushing_roundButtons'},
        { trigger: "q", location: "Misc/", name: "fantasticVoyage_computer_flashing_o" },
        { trigger: "q", location: "Misc/", name: "fantasticVoyage_tvScreen_o" },
        { trigger: "q", location: "BotP/", name: "botp_computerScreens_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycatsSpace_catAlien_pullHandle_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_alexandra_turning_knobs_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_backOfTV_sparking" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_brainWaves_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_cat_throws_tv" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_hand_spinning_orb_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_handOnLever_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_handOnLever_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_handOnLever2_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_machine_short_circuit_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_melody_pulling_lever_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_turningKnob_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_tv_no_signal" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_valerie_fixes_robot" },
        { trigger: "q", location: "BotP/", name: "botp_anderson_tapeRecorder_play_o" },
        { trigger: "q", location: "BotP/", name: "botp_gforce_handsOnEars_o" },
        { trigger: "q", location: "BotP/", name: "botp_reelToReel_buttonPush_o" },
        { trigger: "q", location: "BotP/", name: "botp_voltarHenchman_leverPulling_o" },
        { trigger: "q", location: "BotP/", name: "botp_zoltarSlamsArmsDown_o" },
        { trigger: "q", location: "BotP/", name: "botp_reelToReel_o" },
        { trigger: "q", location: "BotP/", name: "botp_reelToReel2_o" },
        { trigger: "q", location: "BotP/", name: "botp_reelToReel3_o" },
        { trigger: "q", location: "BotP/", name: "botp_spinningDial_o" },
        { trigger: "q", location: "BotP/", name: "botp_studio_leverUpDown_o" },
        { trigger: "q", location: "BotP/", name: "botp_studio_TwoHandsLevers_o" },
        { trigger: "q", location: "BotP/", name: "botp_zoltarHeadphones_handMovements_o" },
        { trigger: "q", location: "BotP/", name: "botp_zoltarHenchman_lever_o" },
        { trigger: "q", location: "BotP/", name: "botp_studio_levers_o" },
        { trigger: "q", location: "BotP/", name: "botp_reelToReelCracking_o" },
        { trigger: "q", location: "SportBilly/", name: "sportBilly_pushingButtons" },
        { 'trigger' : '', 'location' : 'HeroHigh/', 'name' : 'heroHigh_twirling_wand'},
        { 'trigger' : '', 'location' : 'Blackstar/', 'name' : 'blackstar_at_controls'},
        { 'trigger' : '', 'location' : 'CableTV/', 'name' : 'cableTV_40'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'computerAnimation_manInChair'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'computerAnimation_outlets2'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'computerAnimation_outlets3'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'computerAnimation_outlets4'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'computerAnimation_outlets5'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : 'computerAnimation_telephone'},
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_flashing_control_room_o" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0322.13.57" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0400.39.49" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0317.59.10" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0318.01.20" },
        { trigger: "q", location: "Robots/", name: "thx1138-screen-graphics-2_o" },
        { trigger: "q", location: "Robots/", name: "thx1138-screen-head_o" },
        { trigger: "q", location: "Robots/", name: "thx1138_screen-graphics-2_o" },
        { trigger: "q", location: "Robots/", name: "thx1138_screen-graphics_o" },
        { trigger: "q", location: "SpiralZone/", name: "spiralZone_2019-01-2600.50.48" },
        { trigger: "q", location: "SpiralZone/", name: "spiralZone_2019-01-2600.51.52" },
        { trigger: "q", location: "SpiralZone/", name: "spiralZone_2019-01-2601.02.36" },
        { trigger: "q", location: "Robots/", name: "fantastic-voyage-2" },
        { trigger: "q", location: "Robots/", name: "fantastic-voyage-8" },
        { trigger: "q", location: "Misc/", name: "fantasticVoyage_flashing_colorBars_o" },
        { trigger: "q", location: "Misc/", name: "fantasticVoyage_spinningStripes_disabledLasers_o" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0317.57.51" },
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_collar_making_machine2_REDO_o'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_de-om-beams_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_father_collar_making_REDO_o'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_draag_counsel_tvs_REDO'},
        { 'trigger' : '', 'location' : 'FantasticPlanet/', 'name' : 'fp_collar_making_machine_REDO_o'},
        { 'trigger' : '', 'location' : 'NewGifs/', 'name' : '2019-05-2921.15.41'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_12'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_13'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_14'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_25'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_41'},
        { 'trigger' : '', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_21'},
        { 'trigger' : '', 'location' : 'Bibleman/', 'name' : 'bibleman_1'},
        { 'trigger' : '', 'location' : 'Bibleman/', 'name' : 'bibleman_2'},
        { 'trigger' : '', 'location' : 'Bibleman/', 'name' : 'bibleman_3'},
        { 'trigger' : '', 'location' : 'Bibleman/', 'name' : 'bibleman_4'},
        { 'trigger' : '', 'location' : 'Bibleman/', 'name' : 'bibleman_5'},
        { 'trigger' : '', 'location' : 'Bibleman/', 'name' : 'bibleman_6'},
        { 'trigger' : '', 'location' : 'Bibleman/', 'name' : 'bibleman_7'},
        { 'trigger' : '', 'location' : 'Bibleman/', 'name' : 'bibleman_8'},
        { 'trigger' : '', 'location' : 'Bibleman/', 'name' : 'bibleman_9'},
        { 'trigger' : '', 'location' : 'Bibleman/', 'name' : 'bibleman_10'},
        { 'trigger' : '', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_1'},
        { 'trigger' : '', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_3'},
        { 'trigger' : '', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_4'},
        { 'trigger' : '', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_16'},
        { 'trigger' : '', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_18'},
        { 'trigger' : '', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_19'},
        { 'trigger' : '', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_20'},
        { 'trigger' : '', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_21'},
        { 'trigger' : '', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_22'},
        { 'trigger' : '', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_23'},
        { 'trigger' : '', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_24'},
        { 'trigger' : '', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_25'},
        { 'trigger' : '', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_26'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_01'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_50'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_67'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_03'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_04'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_20'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_22'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_24'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_25'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_26'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_27'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_29'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_30'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_33'},
        { 'trigger' : '', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_34'},      ]
    }
  ]
};