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
1917
1918
1919
1920
1921
1922
1923
1924
1925
1926
1927
1928
1929
1930
1931
1932
1933
1934
1935
1936
1937
1938
1939
1940
1941
1942
1943
1944
1945
1946
1947
1948
1949
1950
1951
1952
1953
1954
1955
1956
1957
1958
1959
1960
1961
1962
1963
1964
1965
1966
1967
1968
1969
1970
1971
1972
1973
1974
1975
1976
1977
1978
1979
1980
1981
1982
1983
1984
1985
1986
1987
1988
1989
1990
1991
1992
1993
1994
1995
1996
1997
1998
1999
2000
2001
2002
2003
2004
2005
2006
2007
2008
2009
2010
2011
2012
2013
2014
2015
2016
2017
2018
2019
2020
2021
2022
2023
2024
2025
2026
2027
2028
2029
2030
2031
2032
2033
2034
2035
2036
2037
2038
2039
2040
2041
2042
2043
2044
2045
2046
2047
2048
2049
2050
2051
2052
2053
2054
2055
2056
2057
2058
2059
2060
2061
2062
2063
2064
2065
2066
2067
2068
2069
2070
2071
2072
2073
2074
2075
2076
2077
2078
2079
2080
2081
2082
2083
2084
2085
2086
2087
2088
2089
2090
2091
2092
2093
2094
2095
2096
2097
2098
2099
2100
2101
2102
2103
2104
2105
2106
2107
2108
2109
2110
2111
2112
2113
2114
2115
2116
2117
2118
2119
2120
2121
2122
2123
2124
2125
2126
2127
2128
2129
2130
2131
2132
2133
2134
2135
2136
2137
2138
2139
2140
2141
2142
2143
2144
2145
2146
2147
2148
2149
2150
2151
2152
2153
2154
2155
2156
2157
2158
2159
2160
2161
2162
2163
2164
2165
2166
2167
2168
2169
2170
2171
2172
2173
2174
2175
2176
2177
2178
2179
2180
2181
2182
2183
2184
2185
2186
2187
2188
2189
2190
2191
2192
2193
2194
const playlist = {
 
  bank: [
    {
      id: 0,
      trigger: "q",
      name: "Foreground - Information Super Highway",
      enabled: true,
      gifs: [
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1823.09.45'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1823.10.48'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1823.23.51'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1823.24.43'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1823.26.40'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1823.27.55'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1823.28.53'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1823.29.35'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1823.31.25'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1823.34.07'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1823.35.43'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1823.38.07'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1823.41.16'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1823.42.54'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1823.43.49'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1823.46.57'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1823.49.41'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1823.51.27'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1823.52.31'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1900.00.07'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1900.01.02'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1900.04.29'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1900.06.10'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1900.07.34'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1900.09.44'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1900.11.41'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1900.25.43'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1900.28.43'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1900.38.39'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1900.42.27'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1900.54.45'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1900.56.12'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1900.57.56'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1900.59.16'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1901.00.52'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-1901.02.10'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2123.19.58'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2123.21.55'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2123.23.27'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2123.26.48'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2123.30.28'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2123.32.30'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2123.33.25'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2123.34.18'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2123.36.16'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2123.37.28'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2123.38.42'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2123.39.56'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2123.40.49'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2200.00.16'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2200.02.11'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2200.04.56'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2200.07.01'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2200.09.05'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2200.10.20'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2200.17.17'},
        { 'trigger' : 'q', 'location' : 'InformationSuperHighway/', 'name' : '2019-09-2200.18.47'},
      ]
    },
    {
      id: 1,
      trigger: "w",
      name: "Foreground - MSD",
      enabled: true,
      gifs: [
        // { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_explosing_balls_o" },
        // { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_explosing_balls_o_t" },
        // { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_orb_drags_rainbowRings_o" },
        // { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_orb_glowing_o_t" },
 
        // { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0316.43.01" },
        // { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0316.48.12" },
 
 
        // { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0317.05.28" },
        // { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0317.23.44" },
        // { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0317.53.28" },
 
        // { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0318.16.34" },
        // { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0319.18.23" },
        // { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0319.20.22" },
        // { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0319.58.56" },
        // { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0321.47.22" },
        // { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0322.37.31" },
        // { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0323.51.51" },
        // { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0400.04.49" },
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_1'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_10'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_11'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_12'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_13'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_14'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_15'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_16'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_17'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_18'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_19'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_2'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_20'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_21'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_22'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_23'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_24'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_25'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_26'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_27'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_28'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_29'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_3'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_30'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_31'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_32'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_33'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_34'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_35'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_36'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_37'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_38'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_39'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_4'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_40'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_41'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_42'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_43'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_44'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_45'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_46'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_47'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_48'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_5'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_6'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_7'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_8'},
        // { 'trigger' : 'q', 'location' : 'KidNPlay/', 'name' : 'kidNPlay_9'},
 
        { 'trigger' : 'q', 'location' : 'LandOfTheLost/', 'name' : 'landOfTheLost_1'},
        { 'trigger' : 'q', 'location' : 'LandOfTheLost/', 'name' : 'landOfTheLost_2'},
        { 'trigger' : 'q', 'location' : 'LandOfTheLost/', 'name' : 'landOfTheLost_3'},
        { 'trigger' : 'q', 'location' : 'LandOfTheLost/', 'name' : 'landOfTheLost_4'},
        { 'trigger' : 'q', 'location' : 'LandOfTheLost/', 'name' : 'landOfTheLost_5'},
        { 'trigger' : 'q', 'location' : 'LandOfTheLost/', 'name' : 'landOfTheLost_6'},
 
        { 'trigger' : 'q', 'location' : 'MyLittlePony/', 'name' : 'myLittlePony_rainbow'},
        { 'trigger' : 'q', 'location' : 'MyLittlePony/', 'name' : 'myLittlePony_waterfall'},
 
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_1'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_10'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_11'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_12'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_13'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_14'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_15'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_16'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_17'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_18'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_19'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_2'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_20'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_21'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_22'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_23'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_24'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_25'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_26'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_3'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_4'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_5'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_6'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_7'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_8'},
        { 'trigger' : 'q', 'location' : 'ComputerWarriors/', 'name' : 'computerWarriors_9'},
 
        { 'trigger' : 'q', 'location' : 'Bibleman/', 'name' : 'bibleman_1'},
        { 'trigger' : 'q', 'location' : 'Bibleman/', 'name' : 'bibleman_10'},
        { 'trigger' : 'q', 'location' : 'Bibleman/', 'name' : 'bibleman_2'},
        { 'trigger' : 'q', 'location' : 'Bibleman/', 'name' : 'bibleman_3'},
        { 'trigger' : 'q', 'location' : 'Bibleman/', 'name' : 'bibleman_4'},
        { 'trigger' : 'q', 'location' : 'Bibleman/', 'name' : 'bibleman_5'},
        { 'trigger' : 'q', 'location' : 'Bibleman/', 'name' : 'bibleman_6'},
        { 'trigger' : 'q', 'location' : 'Bibleman/', 'name' : 'bibleman_7'},
        { 'trigger' : 'q', 'location' : 'Bibleman/', 'name' : 'bibleman_8'},
        { 'trigger' : 'q', 'location' : 'Bibleman/', 'name' : 'bibleman_9'},
 
      ]
    },
    {
      id: 2,
      trigger: "e",
      name: "Foreground - Aerobics",
      enabled: true,
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
 
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.31.44'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.34.32'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.36.16'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.38.26'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.39.48'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.41.37'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.42.33'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.45.03'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.47.45'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.51.57'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.54.08'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2701.59.43'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.02.08'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.03.18'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.04.28'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.06.27'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.07.44'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.10.20'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.11.34'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.13.01'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.14.13'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.17.44'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.18.42'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.22.10'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.24.59'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.27.05'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.29.22'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.30.34'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.31.28'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.34.56'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.36.14'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.37.59'},
        { 'trigger' : 'q', 'location' : 'Men/Exercise/', 'name' : 'menExercise_2019-04-2702.39.08'},
      ]
    },
    {
      id: 3,
      trigger: "r",
      name: "Foreground - Dancing",
      enabled: true,
      gifs: [
        { 'trigger' : 'q', 'location' : 'Heman/', 'name' : 'heman_dodgingLasers_o'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_39'},
        { 'trigger' : 'q', 'location' : 'Gabber/', 'name' : 'gabber_2019-04-2200.00.37'},
        { 'trigger' : 'q', 'location' : 'Gabber/', 'name' : 'gabber_2019-04-2200.02.11'},
        { 'trigger' : 'q', 'location' : 'Gabber/', 'name' : 'gabber_2019-04-2200.03.29'},
        { 'trigger' : 'q', 'location' : 'Gabber/', 'name' : 'gabber_2019-04-2200.04.30'},
        { 'trigger' : 'q', 'location' : 'Gabber/', 'name' : 'gabber_2019-04-2200.05.49'},
        { 'trigger' : 'q', 'location' : 'Gabber/', 'name' : 'gabber_2019-04-2200.06.43'},
        { 'trigger' : 'q', 'location' : 'Gabber/', 'name' : 'gabber_2019-04-2200.07.57'},
        { 'trigger' : 'q', 'location' : 'Gabber/', 'name' : 'gabber_2019-04-2200.09.00'},
        { 'trigger' : 'q', 'location' : 'Gabber/', 'name' : 'gabber_2019-04-2200.09.55'},
        { 'trigger' : 'q', 'location' : 'Gabber/', 'name' : 'gabber_2019-04-2200.11.03'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_29'},
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
        { 'trigger' : 'q', 'location' : 'RomperRoom/', 'name' : 'romperRoom_13'},
        { 'trigger' : 'q', 'location' : 'RomperRoom/', 'name' : 'romperRoom_14'},
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
 
        { 'trigger' : 'q', 'location' : 'KidVideos/', 'name' : 'hulk-step-walk_o'},
        { 'trigger' : 'q', 'location' : 'KidVideos/', 'name' : 'dancing-hulk_o'},
        { 'trigger' : 'q', 'location' : 'KidVideos/', 'name' : 'superhero-toilet-dance_o'},
        { trigger: "q", location: "BotP/", name: "battleOfThePlanets_markOnGlass_o" },
 
        { 'trigger' : 'q', 'location' : 'VideoKids/', 'name' : 'videokids_4'},
        { 'trigger' : 'q', 'location' : 'VideoKids/', 'name' : 'videokids_5'},
        { 'trigger' : 'q', 'location' : 'VideoKids/', 'name' : 'videokids_7'},
        { 'trigger' : 'q', 'location' : 'VideoKids/', 'name' : 'videokids_9'},
        { 'trigger' : 'q', 'location' : 'VideoKids/', 'name' : 'videokids_10'},
        { 'trigger' : 'q', 'location' : 'VideoKids/', 'name' : 'videokids_13'},
        { 'trigger' : 'q', 'location' : 'VideoKids/', 'name' : 'videokids_14'},
        { 'trigger' : 'q', 'location' : 'VideoKids/', 'name' : 'videokids_15'},
        { 'trigger' : 'q', 'location' : 'VideoKids/', 'name' : 'videokids_16'},
        { 'trigger' : 'q', 'location' : 'VideoKids/', 'name' : 'videokids_17'},
 
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
 
        { 'trigger' : 'q', 'location' : 'SillySymphoniesPiedPiper/', 'name' : 'piedPiper_childrenSkipping'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesPiedPiper/', 'name' : 'piedPiper_crowdChant'},
 
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_19'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_20'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_3'},
 
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
 
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_6'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_7'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_14'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_15'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_16'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_17'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_18'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_19'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_24'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_25'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_26'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_27'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_28'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_29'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_31'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_32'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_33'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_35'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_36'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_38'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_39'},
 
        { trigger: "q", location: "AnimatedBands/", name: "jerryLewis_flamenco_dance1_o" },
        { trigger: "q", location: "AnimatedBands/", name: "jerryLewis_flamenco_dance2_o" },
        { trigger: "q", location: "AnimatedBands/", name: "jerryLewis_runningAroungScreen_o" },
 
        { trigger: "q", location: "Misc/", name: "orbots_girls_dance_o" },
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'Righeira_musicVideo'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'Righeira_musicVideo2'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'Righeira_musicVideo3'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'Righeira_musicVideo4'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'Righeira_musicVideo10'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'Righeira_musicVideo9'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'Righeira_musicVideo12'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_dinerDancers'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_ducksMarch'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_ducksMarch2'},
 
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_dancing1'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_dancing2'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_dancing3'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_dancing4'},
 
        { 'trigger' : 'q', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_1'},
        { 'trigger' : 'q', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_10'},
        { 'trigger' : 'q', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_11'},
        { 'trigger' : 'q', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_12'},
        { 'trigger' : 'q', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_13'},
        { 'trigger' : 'q', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_14'},
        { 'trigger' : 'q', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_15'},
        { 'trigger' : 'q', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_16'},
        { 'trigger' : 'q', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_18'},
        { 'trigger' : 'q', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_19'},
        { 'trigger' : 'q', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_2'},
        { 'trigger' : 'q', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_3'},
        { 'trigger' : 'q', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_4'},
        { 'trigger' : 'q', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_5'},
        { 'trigger' : 'q', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_6'},
        { 'trigger' : 'q', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_7'},
        { 'trigger' : 'q', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_8'},
        { 'trigger' : 'q', 'location' : 'YoyoMan/', 'name' : 'yoyoMan_9'},
 
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_traag_dance-beam-shoot2_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_traag_dance2_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_traag_dance3_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_traag_dance4_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_traag_dance_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_traag_dance_shoot2_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_draag_dance_shoot_REDO'},
 
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_hulaDance1_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_hulaDance2_o" },
        { trigger: "q", location: "JacksonFive/", name: "jackson5_flashing_circle_dancing_silhouettes_o" },
      ]
    },    {
      id: 4,
      trigger: "t",
      name: "Foreground - Animated Bands - Guitar",
      enabled: true,
      gifs: [
        { 'trigger' : 'q', 'location' : 'Flintstones/', 'name' : 'flintstones_fred_eyesClosed_holdingGuitar_o'},
        { 'trigger' : 'q', 'location' : 'Flintstones/', 'name' : 'flintstones_fred_guitar_dance_o'},
        { 'trigger' : 'q', 'location' : 'Flintstones/', 'name' : 'flintstones_fred_guitar_dance_shuffle2_o'},
        { 'trigger' : 'q', 'location' : 'Flintstones/', 'name' : 'flintstones_fred_guitar_dance_sideShuffle_o'},
        { 'trigger' : 'q', 'location' : 'Flintstones/', 'name' : 'flintstones_fred_guitar_dance_spin_o'},
        { 'trigger' : 'q', 'location' : 'Flintstones/', 'name' : 'flintstones_fred_jumpsOnStage_spin_o'},
        { 'trigger' : 'q', 'location' : 'Flintstones/', 'name' : 'flintstones_fred_on_ground_guitarFace_o'},
        { 'trigger' : 'q', 'location' : 'Flintstones/', 'name' : 'flintstones_fred_spins_falls_o'},
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
        { 'trigger' : 'q', 'location' : 'HeroHigh/', 'name' : 'heroHigh_punker_play_guitar_o'},
        { 'trigger' : 'q', 'location' : 'HeroHigh/', 'name' : 'heroHigh_punker_smashedByHeadphones_o'},
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
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_22'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_4'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_5'},
        { 'trigger' : 'q', 'location' : 'SpongeBob/', 'name' : 'spongeBob_liftingGuitar_o'},
        { 'trigger' : 'q', 'location' : 'SpongeBob/', 'name' : 'spongeBob_sandy_guitar_o'},
 
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_guitar1'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_guitar3'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_guitar4'},
        { 'trigger' : 'q', 'location' : 'Bravestarr/', 'name' : 'bravestarr_bass_strum'},
        { 'trigger' : 'q', 'location' : 'Bravestarr/', 'name' : 'bravestarr_guitar_strum_electricity'},
        { 'trigger' : 'q', 'location' : 'Bravestarr/', 'name' : 'bravestarr_oldMan_guitarElectricty'},
        { 'trigger' : 'q', 'location' : 'MissionMagic/', 'name' : 'missionMagic_rickGuitar_morphToHat'},
      ]
    },
    {
      id: 5,
      trigger: "y",
      name: "Foreground - Animated Bands - Drums",
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
        { 'trigger' : 'q', 'location' : 'PercussionInstruments/', 'name' : 'percussion_bassDrumKick'},
        { 'trigger' : 'q', 'location' : 'PercussionInstruments/', 'name' : 'percussion_bongos'},
        { 'trigger' : 'q', 'location' : 'PercussionInstruments/', 'name' : 'percussion_cowbell'},
        { 'trigger' : 'q', 'location' : 'PercussionInstruments/', 'name' : 'percussion_hittingDrum'},
        { 'trigger' : 'q', 'location' : 'PercussionInstruments/', 'name' : 'percussion_maracas'},
        { 'trigger' : 'q', 'location' : 'PercussionInstruments/', 'name' : 'rotoscopedDrummer'},
        { 'trigger' : 'q', 'location' : 'SpongeBob/', 'name' : 'spongeBob_patrick_drums_o'},
        { 'trigger' : 'q', 'location' : 'SpongeBob/', 'name' : 'spongeBob_patrick_drums2_o'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_jazzKingDrumming'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_jazzKingDrumming2'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_jazzKingDrumming3'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_drummers'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_drummer1'},
        { 'trigger' : 'q', 'location' : 'Bravestarr/', 'name' : 'bravestarr_man_drumming_o'},
      ]
    },
 
    {
      id: 6,
      trigger: "u",
      name: "Foreground - Animated Bands - Keyboards",
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
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_1'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_3'},
        { 'trigger' : 'q', 'location' : 'SpongeBob/', 'name' : 'spongeBob_keytar_o'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_keytar'},
        { 'trigger' : 'q', 'location' : 'Bravestarr/', 'name' : 'bravestarr_woman_keytar_o'},
        { 'trigger' : 'q', 'location' : 'Bravestarr/', 'name' : 'bravestarr_woman_playing_keytar_o'},
      ]
    },    {
      id: 7,
      trigger: "i",
      name: "Foreground - Animated Bands - MISC",
      enabled: true,
      gifs: [
        { 'trigger' : 'q', 'location' : 'Flintstones/', 'name' : 'flintstones_barney_birdNeedle_onRecord_o'},
        { 'trigger' : 'q', 'location' : 'Flintstones/', 'name' : 'flintstones_birdNeedle_onRecord_o'},
        { 'trigger' : 'q', 'location' : 'Flintstones/', 'name' : 'flintstones_wakeUp_birdNeedle_onRecord_o'},
        { 'trigger' : 'q', 'location' : 'Flintstones/', 'name' : 'flintstones_betty_wilma_clapping_whistle_o'},
        { 'trigger' : 'q', 'location' : 'Flintstones/', 'name' : 'flintstones_betty_wilma_groovin_o'},
        { 'trigger' : 'q', 'location' : 'Bravestarr/', 'name' : 'bravestarr_robot_band_playing_o'},
        { 'trigger' : 'q', 'location' : 'Bravestarr/', 'name' : 'bravestarr_band_hoedown_singer'},
        { 'trigger' : 'q', 'location' : 'Bravestarr/', 'name' : 'bravestarr_synth_band_playing_o'},
        { 'trigger' : 'q', 'location' : 'PercussionInstruments/', 'name' : 'percussion_tambourine'},
        { 'trigger' : 'q', 'location' : 'PercussionInstruments/', 'name' : 'playingFlute'},
        { 'trigger' : 'q', 'location' : 'PercussionInstruments/', 'name' : 'playingFlute_stage'},
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
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_10'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_11'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_12'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_13'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_2'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_20'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_21'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_30'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_34'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_37'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_8'},
        { 'trigger' : 'q', 'location' : 'AmericanPop/', 'name' : 'americanPop_9'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesPiedPiper/', 'name' : 'piedPiper_flutePlaying'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesPiedPiper/', 'name' : 'piedPiper_flutingRatsAtGate'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesPiedPiper/', 'name' : 'piedPiper_flutingRatsPrance'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesPiedPiper/', 'name' : 'piedPiper_flutingWithRatDance'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesPiedPiper/', 'name' : 'piedPiper_flutingWithRats'},
        { trigger: "q", location: "PartridgeFamilySpace/", name: "partridgeFamilySpace_crowd_cheer_o" },
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_1'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_2'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_4'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_5'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_6'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_7'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_8'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_9'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_10'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_11'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_12'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_13'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_14'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_15'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_16'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_17'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_18'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_21'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_22'},
 
        { trigger: "q", location: "AnimatedBands/", name: "sabrinaTeenageWitch_floating_record_turntable_o" },
        { trigger: "q", location: "Jem/", name: "jem_flashing_stage_lights_o" },
        { 'trigger' : 'q', 'location' : 'SpongeBob/', 'name' : 'spongeBob_crowdWithLighters_o'},
        { 'trigger' : 'q', 'location' : 'SpongeBob/', 'name' : 'spongeBob_onStage_pyrotechnics_o'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_band1'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_band2'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_band3'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_crowd1'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_crowd2'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_crowd3'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_crowd4'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_crowd5'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_crowd6'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_crowd7'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_singer1'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_singer2'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_singer3'},
        { 'trigger' : 'q', 'location' : 'TheApple/', 'name' : 'TheApple_bim_stage'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_speaker'},
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_audience_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_audience2_o" },
        { 'trigger' : 'q', 'location' : 'HeroHigh/', 'name' : 'heroHigh_superHeroes_cheer'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'musicNote_hopping'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'musicNote_road'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'musicNote_road2'},
 
      ]
    },
 
    {
      id: 8,
      trigger: "o",
      name: "Foreground - Movement",
      enabled: true,
      gifs: [
        { trigger: "q", location: "Misc/", name: "orbots_running_light_o" },
        { trigger: "q", location: "Misc/", name: "pbs-4_o" },
        { trigger: "q", location: "Misc/", name: "pbs-5_o" },
        { trigger: "q", location: "Misc/", name: "spinning-rainbow-person_o" },
        { trigger: "q", location: "AnimatedShorts/", name: "man_speedos_walking_o" },
        { trigger: "q", location: "AnimatedShorts/", name: "man_speedos_walking_o_t" },
        { trigger: "q", location: "Misc/", name: "walking-block-man" },
        { trigger: "q", location: "Misc/", name: "walking_o" },
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2818.24.32'},
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
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_de-om-running-oms_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_deomizer-2_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_deomizer-choking_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_deomizer-running2_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_deomizer-running3_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_deomizer-running_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_deomizing-choking2_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_draag_blind_walk_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_draag_blind_walk_o_boom'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_om_fight1_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_terr_face_balls_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_terr_pest_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_terr_raining_cloud_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_terr_running2_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_terr_running_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_terr_sneak_walk_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_terr_stairs_REDO2'},
        { 'trigger' : 'q', 'location' : 'KidVideos/', 'name' : 'swimming-hulk-fruit-2_o'},
        { 'trigger' : 'q', 'location' : 'KidVideos/', 'name' : 'swimming-hulk-fruit_o'},
        { 'trigger' : 'q', 'location' : 'WaldoKitty/', 'name' : 'waldoKitty_waldo_walking_onShip'},
        { 'trigger' : 'q', 'location' : 'SuperSeven/', 'name' : 'superSeven_superStretch'},
        { 'trigger' : 'q', 'location' : 'SuperSeven/', 'name' : 'superSeven_superStretch_arrow_transform'},
        { 'trigger' : 'q', 'location' : 'SuperSeven/', 'name' : 'superSeven_superStretch_face'},
        { 'trigger' : 'q', 'location' : 'SuperSeven/', 'name' : 'superSeven_superStretch_jump'},
 
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_hopping_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_badGuys_running_upStairs" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_going_through_the_ringer" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_running_electricity_o" },   
        { trigger: "q", location: "BotP/", name: "botp_2019-02-2721.37.46" },    
        { trigger: "q", location: "BotP/", name: "botp_2019-02-2721.38.17" },        
        { trigger: "q", location: "BotP/", name: "botp_2019-02-2723.20.01" },    
        { trigger: "q", location: "BotP/", name: "botp_2019-02-2721.35.53" },    
        { 'trigger' : 'q', 'location' : 'HeroHigh/', 'name' : 'heroHigh_surfingOnARocket'},
        { 'trigger' : 'q', 'location' : 'SpaceSentinels/', 'name' : 'spaceSentinals_astrea_morphs'},
        { 'trigger' : 'q', 'location' : 'SpaceSentinels/', 'name' : 'spaceSentinals_astrea_running'},
        { 'trigger' : 'q', 'location' : 'Bravestarr/', 'name' : 'bravestarr_jumping_off_cliff_o'},
        { 'trigger' : 'q', 'location' : 'Bravestarr/', 'name' : 'bravestarr_running_animals_o'},
        { trigger: "q", location: "BotP/", name: "battleOfThePlanets_markFlipping_o" },
        { trigger: "q", location: "BotP/", name: "battleOfThePlanets_princessFlipping_o" },
        { trigger: "q", location: "SpiralZone/", name: "spiralZone_2019-01-2601.05.12" },
        { trigger: "q", location: "SpiralZone/", name: "spiralZone_2019-01-2603.15.40" },
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2921.33.08'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2921.35.08'},
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
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_om_fight_cheer2_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_collar_making_machine3_REDO'},
        { 'trigger' : 'q', 'location' : 'VideoKids/', 'name' : 'videokids_11'},
        { 'trigger' : 'q', 'location' : 'VideoKids/', 'name' : 'videokids_12'},
      ]
    },
    {
      id: 9,
      trigger: "p",
      name: "Foreground - Robots",
      enabled: true,
      gifs: [
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycatsSpace_robotsRunningSmashed_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycatsSpace_robotsRunning_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycats_robot_cooking_o" },
        { trigger: "q", location: "Robots/", name: "mannMachine_robotHead_laserEyes_o" },
        { trigger: "q", location: "Robots/", name: "mannMachine_robotHead_spin_o" },
        { trigger: "q", location: "Robots/", name: "mannMachine_robotSpin_o" },
        { trigger: "q", location: "Robots/", name: "nintendo_gameboy_kid_zap_robot_o" },
        { trigger: "q", location: "Robots/", name: "nintendo_gameboy_robot_dance_o" },
        { trigger: "q", location: "Robots/", name: "nintendo_gameboy_robot_walk_o" },
        { trigger: "q", location: "Robots/", name: "nintendo_gameboy_robot_zap_o" },
        { trigger: "q", location: "Robots/", name: "ronniesRobot_flashingRobot_o" },
        { trigger: "q", location: "Robots/", name: "ronniesRobots _robot_boomerang_o" },
        { trigger: "q", location: "Robots/", name: "ronniesRobots_transformMan_explosion_o" },
        { trigger: "q", location: "Robots/", name: "ronniesRobots_transformMan_o" },
        { trigger: "q", location: "Robots/", name: "tvbreak_robot_corridor" },
        { trigger: "q", location: "AnimatedShorts/", name: "robot_woman_head_back_o" },
        { trigger: "q", location: "AnimatedShorts/", name: "robot_woman_head_back_o_t" },
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_face1'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_face10'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_face11'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_face12'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_face2'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_face3'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_face4'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_face5'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_face6'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_face7'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_face8'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_face9'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2923.44.34'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2923.46.11'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2923.47.50'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2923.49.02'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2923.50.46'},
        { 'trigger' : 'q', 'location' : 'SportBilly/', 'name' : 'sportBilly_robot_laser_eyes'},
        { 'trigger' : 'q', 'location' : 'SportBilly/', 'name' : 'sportBilly_transforming_timeRobot'},
        { 'trigger' : 'q', 'location' : 'SpaceSentinels/', 'name' : 'spaceSentinals_mo'},
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0400.26.49" },
      ]
    },
 
    {
      id: 10,
      trigger: "a",
      name: "Tribal - MISC",
      enabled: true,
      gifs: [
        { 'trigger' : 'q', 'location' : 'Mushrooms/', 'name' : 'mushroom_1_fx2_o'},
        { 'trigger' : 'q', 'location' : 'Mushrooms/', 'name' : 'mushroom_1_o'},
        { 'trigger' : 'q', 'location' : 'Mushrooms/', 'name' : 'mushroom_2_fx2_o'},
        { 'trigger' : 'q', 'location' : 'Mushrooms/', 'name' : 'mushroom_2_fx_o'},
        { 'trigger' : 'q', 'location' : 'Mushrooms/', 'name' : 'mushroom_3_o'},
        { 'trigger' : 'q', 'location' : 'Mushrooms/', 'name' : 'mushroom_4_o'},
        { 'trigger' : 'q', 'location' : 'Mushrooms/', 'name' : 'mushroom_5_o'},
        { 'trigger' : 'q', 'location' : 'Mushrooms/', 'name' : 'mushroom_6_o'},
        { 'trigger' : 'q', 'location' : 'Mushrooms/', 'name' : 'mushroom_7_fx_o'},
        { 'trigger' : 'q', 'location' : 'Jungle/', 'name' : 'dancing_shield_o'},
        { 'trigger' : 'q', 'location' : 'Jungle/', 'name' : 'dancing_shield_o_t'},
        { 'trigger' : 'q', 'location' : 'Jungle/', 'name' : 'jungle_drone_bolivia_3_o'},
        { 'trigger' : 'q', 'location' : 'Jungle/', 'name' : 'jungle_drone_bolivia_3_o_t'},
        { 'trigger' : 'q', 'location' : 'Jungle/', 'name' : 'jungle_game_1_o'},
        { 'trigger' : 'q', 'location' : 'Jungle/', 'name' : 'jungle_game_1_o_t'},
        { 'trigger' : 'q', 'location' : 'Jungle/', 'name' : 'jungle_game_2_o'},
        { 'trigger' : 'q', 'location' : 'Jungle/', 'name' : 'jungle_game_2_o_t'},
        { 'trigger' : 'q', 'location' : 'Jungle/', 'name' : 'jungle_minecraft_1_o'},
        { 'trigger' : 'q', 'location' : 'Jungle/', 'name' : 'jungle_minecraft_1_o_t'},
        { 'trigger' : 'q', 'location' : 'Jungle/', 'name' : 'jungle_minecraft_2_o'},
        { 'trigger' : 'q', 'location' : 'Jungle/', 'name' : 'jungle_minecraft_2_o_t'},
        { 'trigger' : 'q', 'location' : 'Jungle/', 'name' : 'jungle_minecraft_3_o'},
        { 'trigger' : 'q', 'location' : 'Jungle/', 'name' : 'jungle_minecraft_3_o_t'},
        { 'trigger' : 'q', 'location' : 'Jungle/', 'name' : 'jungle_minecraft_4_o'},
        { 'trigger' : 'q', 'location' : 'Jungle/', 'name' : 'jungle_minecraft_4_o_t'},
        { 'trigger' : 'q', 'location' : 'Jungle/', 'name' : 'man_walking_mushroom_o'},
        { 'trigger' : 'q', 'location' : 'Jungle/', 'name' : 'man_walking_mushroom_o_t'},
        { 'trigger' : 'q', 'location' : 'Jungle/', 'name' : 'men_fighting_snake_around_o'},
        { 'trigger' : 'q', 'location' : 'Jungle/', 'name' : 'spinning_around_moon_o'},
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2523.25.17" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2523.30.25" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2523.32.50" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2523.38.57" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2523.40.29" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2523.49.53" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2523.52.17" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2523.53.51" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2523.56.38" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2523.57.35" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2600.00.21" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2600.02.50" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2600.05.04" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2600.06.34" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2600.21.53" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2600.25.37" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2600.29.41" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2600.31.39" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2600.39.50" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2600.43.55" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2600.45.44" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2600.47.48" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2600.49.12" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2600.54.07" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2600.56.16" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2600.59.18" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2601.03.30" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2601.06.53" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2601.08.00" },
        { trigger: "q", location: "MarchOfTheDinosaurs/", name: "MarchOfTheDinosaurs_2019-04-2601.15.54" },        
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2921.39.31'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2921.41.38'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2921.42.29'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2921.43.49'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2921.45.26'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2921.48.07'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2922.07.44'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2922.09.15'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2922.10.37'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2922.29.06'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2922.30.46'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2922.31.47'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2922.34.15'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2922.37.32'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2922.39.22'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2922.40.39'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2922.42.08'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2922.43.19'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2923.24.07'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2923.26.26'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2923.27.45'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2923.30.26'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2923.32.54'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2923.34.45'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2923.36.24'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2923.38.13'},
 
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'spinning_eggPeople1'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'spinning_eggPeople2'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'spinning_eggPeople3'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'spinning_eggPeople4'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'spinning_eggPeople5'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'spinning_eggPeople6'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'spinning_eggPeople7'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'spinning_eggPeople8'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'spinning_eggPeople9'},
        { trigger: "q", location: "AnimatedShorts/", name: "skinny_colored_line_trees_o" },
        { trigger: "q", location: "JacksonFive/", name: "jackson5_cactusDancingMonsterMean_o" } ,
        { trigger: "q", location: "JacksonFive/", name: "jackson5_cactusDancingMonster_o" },
        { trigger: "q", location: "JacksonFive/", name: "jackson5_cactus_o" },
        { trigger: "q", location: "JacksonFive/", name: "jackson5_cactus_o_t" },
        { trigger: "q", location: "JacksonFive/", name: "jackson5_riding_horse_background_colorful_o" },
        { trigger: "q", location: "JacksonFive/", name: "jackson5_walkingSunSilhouettes_o" },
        { trigger: "q", location: "JacksonFive/", name: "jackson5_walkingSunSilhouettes_shadow_o" },
        { trigger: "q", location: "JacksonFive/", name: "jackson5_walkingSunSilhouettes_shadow_o_t" },
        { trigger: "q", location: "JacksonFive/", name: "jackson5_walking_silhouettes_blob_background_o" },
        { trigger: "q", location: "JacksonFive/", name: "jackson5_walking_silhouettes_mirage_o" },
        { trigger: "q", location: "JacksonFive/", name: "jackson5_monster_tornado_o" },
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_mermaid1'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_mermaid2'},
 
        { 'trigger' : 'q', 'location' : 'KidVideos/', 'name' : 'cat-pooping_o'},
        { 'trigger' : 'q', 'location' : 'KidVideos/', 'name' : 'dinosaur-spinning-heads_o'},
        { 'trigger' : 'q', 'location' : 'KidVideos/', 'name' : 'garage-gorilla_o'},
        { 'trigger' : 'q', 'location' : 'KidVideos/', 'name' : 'garage-tiger-running_o'},
        { 'trigger' : 'q', 'location' : 'KidVideos/', 'name' : 'gorilla-punching-egg_o'},
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0316.40.20" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0323.27.03" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0323.30.23" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0323.36.04" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0400.30.38" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0400.32.57" },
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_ground_rain_popup_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_terr_crytals_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_om_throw_shrooms_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_raining_cloud_REDO'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'butterfly_stage'},
      ]
    },
    {
      id: 11,
      trigger: "s",
      name: "Background - Bathbombs, Ferro, Trumpet & Matter",
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
 
      ]
    },
    {
      id: 12,
      trigger: "d",
      name: "Background - Rainbow",
      colorPalette: ['#6899ba', '#ddccba', '#cc7667', '#432233', '#b89b97'],
      enabled: true,
      gifs: [
        // { trigger: "q", location: "Rainbow/", name: "a" },
        // { trigger: "q", location: "Rainbow/", name: "b" },
        // { trigger: "q", location: "Rainbow/", name: "cruz-lights-1" },
        // { trigger: "q", location: "Rainbow/", name: "cruz-lights-2" },
        // { trigger: "q", location: "Rainbow/", name: "cruz-lights-3" },
        // { trigger: "q", location: "Rainbow/", name: "cruz-lights-4" },
        // { trigger: "q", location: "Rainbow/", name: "cruz-lights-5" },
        // { trigger: "q", location: "Rainbow/", name: "d" },
        // { trigger: "q", location: "Rainbow/", name: "e" },
        // { trigger: "q", location: "Rainbow/", name: "f" },
        // { trigger: "q", location: "Rainbow/", name: "g" },
        // { trigger: "q", location: "Rainbow/", name: "h" },
        // { trigger: "q", location: "Rainbow/", name: "i" },
        // { trigger: "q", location: "Rainbow/", name: "j" },
        // { trigger: "q", location: "Rainbow/", name: "l" },
        // { trigger: "q", location: "Rainbow/", name: "o" },
        // { trigger: "q", location: "Rainbow/", name: "p" },
        // { trigger: "q", location: "Rainbow/", name: "patriotic-orb" },
        // { trigger: "q", location: "Rainbow/", name: "rainbow-checker-tunnel" },
        // { trigger: "q", location: "Rainbow/", name: "rainbow-gradients" },
        // { trigger: "q", location: "Rainbow/", name: "spinning-checkered-pyramid" },
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_01'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_02'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_03'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_04'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_05'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_06'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_07'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_08'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_09'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_10'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_11'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_12'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_14'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_15'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_16'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_17'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_18'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_19'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_20'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_21'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_22'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_23'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_24'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_25'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_26'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_27'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_28'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_29'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_30'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_31'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_32'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_33'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_34'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_35'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_36'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_37'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_38'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_40'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_41'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_44'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_45'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_46'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_47'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_48'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_50'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_51'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_52'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_53'},
        { 'trigger' : 'q', 'location' : 'WildWest/', 'name' : 'wildWest_54'},
      ]
    },
    {
      id: 13,
      trigger: "f",
      name: "Background - ZOOM",
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
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'castle_flythrough'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'castle_flythrough2'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'desert_trainRide'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'planet_flyThrough1'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'planet_flyThrough2'},
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
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_bulletTrain'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_carrierLanding'},
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
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2918.46.05'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2918.54.28'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'fork_hallway1'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'fork_hallway2'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'fork_hallway3'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'fork_hallway4'},
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
        { trigger: "q", location: "JapaneseAnims/", name: "japan_explosion_eray_tunnel_zoom_o" },
      ]
    },
    {
      id: 14,
      trigger: "g",
      name: "New Gifs",
      enabled: true,
      gifs: [
        { 'trigger' : 'q', 'location' : 'Motorcycles/', 'name' : '2019-09-2323.50.39'},
        { 'trigger' : 'q', 'location' : 'Motorcycles/', 'name' : '2019-09-2323.52.05'},
        { 'trigger' : 'q', 'location' : 'Motorcycles/', 'name' : '2019-09-2323.53.35'},
        { 'trigger' : 'q', 'location' : 'Motorcycles/', 'name' : '2019-09-2323.55.18'},
        { 'trigger' : 'q', 'location' : 'Motorcycles/', 'name' : '2019-09-2323.56.50'},
        { 'trigger' : 'q', 'location' : 'Motorcycles/', 'name' : '2019-09-2323.58.42'},
        { 'trigger' : 'q', 'location' : 'Motorcycles/', 'name' : '2019-09-2323.59.57'},
        { 'trigger' : 'q', 'location' : 'Motorcycles/', 'name' : '2019-09-2400.01.28'},
        { 'trigger' : 'q', 'location' : 'Motorcycles/', 'name' : '2019-09-2400.03.16'},
        { 'trigger' : 'q', 'location' : 'Motorcycles/', 'name' : '2019-09-2400.05.17'},
        { 'trigger' : 'q', 'location' : 'Motorcycles/', 'name' : '2019-09-2400.07.22'},
 
        { 'trigger' : 'q', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.27.31'},
        { 'trigger' : 'q', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.28.12'},
        { 'trigger' : 'q', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.30.43'},
        { 'trigger' : 'q', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.32.53'},
        { 'trigger' : 'q', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.34.32'},
        { 'trigger' : 'q', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.36.02'},
        { 'trigger' : 'q', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.37.17'},
        { 'trigger' : 'q', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.38.22'},
        { 'trigger' : 'q', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.40.51'},
        { 'trigger' : 'q', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.41.45'},
        { 'trigger' : 'q', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.43.00'},
        { 'trigger' : 'q', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.44.05'},
        { 'trigger' : 'q', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.45.27'},
        { 'trigger' : 'q', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.47.24'},
        { 'trigger' : 'q', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.50.01'},
        { 'trigger' : 'q', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.51.47'},
        { 'trigger' : 'q', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.52.49'},
        { 'trigger' : 'q', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.53.58'},
        { 'trigger' : 'q', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.55.52'},
        { 'trigger' : 'q', 'location' : 'CrashTestDummies/', 'name' : '2019-09-2322.58.10'},
      ]
    },
    {
      id: 15,
      trigger: "h",
      name: "CFD",
      colorPalette: ['#e27d60','#85dcb','#e8a87c','#c38d9e','#41b3a3'],
      enabled: true,
      gifs: [
 
        { trigger: "q", location: "CFD/", name: "cfd_1" },
        { trigger: "q", location: "CFD/", name: "cfd_2" },
        { trigger: "q", location: "CFD/", name: "cfd_3" },
        { trigger: "q", location: "CFD/", name: "cfd_4" },
        { trigger: "q", location: "CFD/", name: "cfd_5" },
        { trigger: "q", location: "CFD/", name: "cfd_6" },
        { trigger: "q", location: "CFD/", name: "cfd_7" },
        { trigger: "q", location: "CFD/", name: "cfd_8" },
        { trigger: "q", location: "CFD/", name: "cfd_9" },
        { trigger: "q", location: "CFD/", name: "cfd_10" },
        { trigger: "q", location: "CFD/", name: "cfd_11" },
        { trigger: "q", location: "CFD/", name: "cfd_12" },
        { trigger: "q", location: "CFD/", name: "cfd_13" },
        { trigger: "q", location: "CFD/", name: "cfd_14" },
        { trigger: "q", location: "CFD/", name: "cfd_15" },
        { trigger: "q", location: "CFD/", name: "cfd_16" },
        { trigger: "q", location: "CFD/", name: "cfd_17" },
        { trigger: "q", location: "CFD/", name: "cfd_18" },
        { trigger: "q", location: "CFD/", name: "cfd_19" },
        { trigger: "q", location: "CFD/", name: "cfd_20" },
        { trigger: "q", location: "CFD/", name: "cfd_21" },
        { trigger: "q", location: "CFD/", name: "cfd_22" },
        { trigger: "q", location: "CFD/", name: "cfd_23" },
        { trigger: "q", location: "CFD/", name: "cfd_24" },
        { trigger: "q", location: "CFD/", name: "cfd_25" },
        { trigger: "q", location: "CFD/", name: "cfd_26" },
        { trigger: "q", location: "CFD/", name: "cfd_27" },
        { trigger: "q", location: "CFD/", name: "cfd_28" },
        { trigger: "q", location: "CFD/", name: "cfd_29" },
        { trigger: "q", location: "CFD/", name: "cfd_30" },
        { trigger: "q", location: "CFD/", name: "cfd_31" },
        { trigger: "q", location: "CFD/", name: "cfd_32" },
        { trigger: "q", location: "CFD/", name: "cfd_33" },
        { trigger: "q", location: "CFD/", name: "cfd_34" },
        { trigger: "q", location: "CFD/", name: "cfd_35" },
        { trigger: "q", location: "CFD/", name: "cfd_36" },
        { trigger: "q", location: "CFD/", name: "cfd_37" },
        { trigger: "q", location: "CFD/", name: "cfd_38" },
        { trigger: "q", location: "CFD/", name: "cfd_39" },
        { trigger: "q", location: "CFD/", name: "cfd_40" },
        { trigger: "q", location: "CFD/", name: "cfd_41" },
        { trigger: "q", location: "CFD/", name: "aerodynamic_cat" },
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2918.58.07'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2919.09.15'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_teapotSmash'},
      ]
    },
    {
      id: 16,
      trigger: "j",
      name: "Vintage Cartoons",
      enabled: true,
      gifs: [
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1922.28.08" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1922.32.11" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1922.33.32" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1922.35.29" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1922.39.57" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1922.42.21" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1922.46.56" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1922.49.54" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1922.51.19" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1922.52.17" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1922.53.07" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1922.54.32" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1922.55.43" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1922.57.16" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1922.58.25" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1923.01.27" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1923.02.21" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1923.03.51" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1923.04.42" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1923.05.33" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1923.06.46" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1923.08.58" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1923.12.25" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1923.13.20" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1923.14.15" },
        { trigger: "q", location: "BumbleBoogie/", name: "bumbleBoogie_2019-04-1923.15.11" },
 
        { trigger: "q", location: "PlasticsInventor/", name: "plasticsInventor_2019-04-2200.21.35" },
        { trigger: "q", location: "PlasticsInventor/", name: "plasticsInventor_2019-04-2200.22.54" },
        { trigger: "q", location: "PlasticsInventor/", name: "plasticsInventor_2019-04-2200.28.29" },
        { trigger: "q", location: "PlasticsInventor/", name: "plasticsInventor_2019-04-2200.30.07" },
        { trigger: "q", location: "PlasticsInventor/", name: "plasticsInventor_2019-04-2200.36.00" },
        { trigger: "q", location: "PlasticsInventor/", name: "plasticsInventor_2019-04-2200.42.10" },
        { trigger: "q", location: "PlasticsInventor/", name: "plasticsInventor_2019-04-2200.44.22" },
        { trigger: "q", location: "PlasticsInventor/", name: "plasticsInventor_2019-04-2200.45.48" },
        { trigger: "q", location: "PlasticsInventor/", name: "plasticsInventor_2019-04-2200.51.16" },
 
        { 'trigger' : 'q', 'location' : 'SillySymphoniesPiedPiper/', 'name' : 'piedPiper_ratsEatingBananas'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesPiedPiper/', 'name' : 'piedPiper_ratsInCheese'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_insideIsleOfJazz'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_insideIsleOfJazz2'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_isleOfJazzAlarm'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_isleOfJazzAlarm2'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_isleOfJazzShooting'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_isleOfJazzShooting2'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_landOfSymphony'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_metronomeCell'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_princeChasingPrincess'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_princeFlipsOutside'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_princeHatsOff'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_princeRowingRaftBombed'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_princeRunning'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_princeSailsOnRaft'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_princeSailsOnRaft2'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_princessBlushes2'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_princessHitInBoat'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_queenFiresWeapons'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_queenFiresWeapons2'},
        { 'trigger' : 'q', 'location' : 'SillySymphoniesMusicLand/', 'name' : 'musicLand_weddingBellsRing'},
      ]
    },
    {
      id: 17,
      trigger: "k",
      name: "Foreground - Skateboarding",
      colorPalette: ['#f5c600', '#d8460b', '#c21703', '#9b4923', '#007291'],
      enabled: true,
      gifs: [
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_01'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_02'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_03'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_04'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_05'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_06'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_07'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_08'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_09'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_10'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_11'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_12'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_13'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_14'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_15'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_16'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_17'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_18'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_19'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_20'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_21'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_22'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_23'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_24'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_25'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_26'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_27'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_28'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_29'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_30'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_31'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_32'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_33'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_34'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_35'},
        { 'trigger' : 'q', 'location' : 'Skateboarding/', 'name' : 'skateboarding_36'},
      ]
    },
    {
      id: 18,
      trigger: "l",
      name: "Background - Circles and Eyes",
      enabled: true,
      colorPalette: ['#a13939', '#e75151', '#fcc88a', '#c2c57f'],
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
      id: 19,
      trigger: "z",
      name: "Cable TV",
      colorPalette: 'pink',
      enabled: true,
      gifs: [
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_1'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_10'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_12'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_15'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_16'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_2'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_23'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_24'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_25'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_26'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_29'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_3'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_33'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_35'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_36'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_37'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_41'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_42'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_43'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_44'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_45'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_46'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_47'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_48'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_49'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_58'},
        { trigger: "q", location: "JacksonFive/", name: "jackson5_heart_spiral_o" },
        { trigger: "q", location: "JacksonFive/", name: "jackson5_heart_tornado_o" },
        { 'trigger' : 'q', 'location' : 'MissionMagic/', 'name' : 'missionMagic_earth_ribbonWrapped'},
        { 'trigger' : 'q', 'location' : 'MissionMagic/', 'name' : 'missionMagic_floatingStars_flashingFace'},
        { 'trigger' : 'q', 'location' : 'MissionMagic/', 'name' : 'missionMagic_rickFace_glasses'},
        { 'trigger' : 'q', 'location' : 'MissionMagic/', 'name' : 'missionMagic_rickFace_zoom'},
        { 'trigger' : 'q', 'location' : 'MissionMagic/', 'name' : 'missionMagic_rick_silhouette_tophat'},
        { 'trigger' : 'q', 'location' : 'MissionMagic/', 'name' : 'missionMagic_woman_glasses'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2818.25.59'},
        { 'trigger' : 'q', 'location' : 'TodaysSpecial/', 'name' : 'todaysSpecial_2'},
        { 'trigger' : 'q', 'location' : 'TodaysSpecial/', 'name' : 'todaysSpecial_3'},
        { 'trigger' : 'q', 'location' : 'TodaysSpecial/', 'name' : 'todaysSpecial_4'},
        { 'trigger' : 'q', 'location' : 'RomperRoom/', 'name' : 'romperRoom_1'},
        { 'trigger' : 'q', 'location' : 'RomperRoom/', 'name' : 'romperRoom_2'},
        { 'trigger' : 'q', 'location' : 'RomperRoom/', 'name' : 'romperRoom_3'},
        { 'trigger' : 'q', 'location' : 'RomperRoom/', 'name' : 'romperRoom_4'},
        { 'trigger' : 'q', 'location' : 'RomperRoom/', 'name' : 'romperRoom_6'},
        { 'trigger' : 'q', 'location' : 'RomperRoom/', 'name' : 'romperRoom_7'},
        { 'trigger' : 'q', 'location' : 'RomperRoom/', 'name' : 'romperRoom_8'},
        { 'trigger' : 'q', 'location' : 'RomperRoom/', 'name' : 'romperRoom_9'},
        { 'trigger' : 'q', 'location' : 'RomperRoom/', 'name' : 'romperRoom_10'},
        { 'trigger' : 'q', 'location' : 'RomperRoom/', 'name' : 'romperRoom_11'},
        { 'trigger' : 'q', 'location' : 'RomperRoom/', 'name' : 'romperRoom_12'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'text_future'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'text_nearFar'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'text_specialEdition'},
      ]
    },
    {
      id: 20,
      trigger: "x",
      name: "Fantastic Planet",
      enabled: true,
      gifs: [
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_01'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_02'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_03'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_04'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_05'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_06'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_07'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_08'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_09'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_10'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_11'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_12'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_13'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_14'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_15'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_16'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_17'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_18'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_19'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_20'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_21'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_22'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_23'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_24'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_25'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_26'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_27'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_28'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_29'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_30'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_31'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_32'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_33'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_34'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_35'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_36'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_37'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_38'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_39'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_40'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_41'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_42'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_43'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_44'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_45'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_46'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_47'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_48'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_49'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_50'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_51'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_52'},
        { 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_53'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_54'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_55'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_56'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_57'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_58'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_59'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_60'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_61'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_62'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_63'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_64'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_65'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_66'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_67'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_68'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_69'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_70'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_71'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_72'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_73'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_74'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_75'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_bandBattle_76'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_01'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_02'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_03'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_04'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_05'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_06'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_07'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_08'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_09'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_10'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_11'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_12'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_13'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_14'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_15'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_16'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_17'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_18'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_19'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_20'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_21'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_22'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_23'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_24'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_25'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_26'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_27'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_28'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_29'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_30'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_31'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_32'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_33'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_34'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_35'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_36'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_37'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_38'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_39'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_40'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_41'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_42'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_43'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_44'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_45'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_46'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_47'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_48'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_49'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_50'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_51'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_52'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_53'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_54'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_55'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_56'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_57'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_58'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_59'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_60'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_61'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_62'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_63'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_64'},
{ 'trigger' : 'q', 'location' : 'GalaxyRangers/', 'name' : 'galaxyRangers_tortunaRock_65'},
 
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_collar_making_machine4_REDO'},
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_collar_making_machine5_REDO'},
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_creature_blood_bath_REDO'},
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_creature_tongue2_o_boom1'},
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_creature_tongue_REDO'},
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_de-om-balls_REDO'},
 
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_de-om-rockets2_REDO'},
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_de-om-rockets_REDO'},
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_deomizer-1_REDO'},
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_draag_mediation_freakout_REDO'},
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_learning_head_2_REDO'},
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_learning_head_3_REDO'},
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_terr_spilling_balls_REDO'},
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_traag_eat1_REDO'},
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_traag_eat2_REDO'},
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_traag_hands_eyes_REDO'},
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_traags_learning_oms_REDO'},
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_tracker_frustrated_REDO'},
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_transformation2_REDO'},
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_transformation_REDO'},
        // { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_om_hit_box2_REDO'},
 
        // { trigger: "q", location: "Hercules/", name: "hercules_fire_people_cu_o" },
        // { trigger: "q", location: "Hercules/", name: "hercules_head_swirlies" },
        // { trigger: "q", location: "Hercules/", name: "hercules_hercules_transport" },
 
        // { trigger: "q", location: "Hercules/", name: "hercules_mermaid_eye_beams_o" },
        // { trigger: "q", location: "Hercules/", name: "hercules_shooting_star_crater_o" },
        // { trigger: "q", location: "Hercules/", name: "hercules_space_two_women_o" },
 
        // { trigger: "q", location: "Hercules/", name: "hercules_woman_space_trails" },
        // { trigger: "q", location: "Hercules/", name: "hercules_woman_space_trails_arms2" },
        // { trigger: "q", location: "Hercules/", name: "hercules_woman_space_trails_arms_o" },
        // { trigger: "q", location: "Hercules/", name: "hercules_woman_space_trails_dance_o" },
        // { trigger: "q", location: "Hercules/", name: "hercules_woman_stars_spinning" },
      ]
    },
    {
      id: 21,
      trigger: "c",
      name: "Background - Spacey",
      enabled: true,
      gifs: [
        { trigger: "q", location: "WonderTwins/", name: "wondertwins_spiralSpin_o" },
        { trigger: "q", location: "BotP/", name: "botp_flashingLights_o" },
        { trigger: "q", location: "BotP/", name: "botp_lightBeams_o" },
        { trigger: "q", location: "BotP/", name: "botp_lightsFlashing_o" },
        { trigger: "q", location: "BotP/", name: "botp_trippyGalaxy_o" },
        { trigger: "q", location: "BotP/", name: "botp_trippyRainbowTunnel_o" },
        { trigger: "q", location: "SpiralZone/", name: "spiralZone_2019-01-2603.18.48" },
        { 'trigger' : 'q', 'location' : 'VideoKids/', 'name' : 'videokids_18'},
        { 'trigger' : 'q', 'location' : 'VideoKids/', 'name' : 'videokids_19'},
        { 'trigger' : 'q', 'location' : 'VideoKids/', 'name' : 'videokids_20'},
        { 'trigger' : 'q', 'location' : 'SuperSeven/', 'name' : 'superSeven_explosion'},
        { 'trigger' : 'q', 'location' : 'SuperSeven/', 'name' : 'superSeven_explosion2'},
        { 'trigger' : 'q', 'location' : 'SuperSeven/', 'name' : 'superSeven_webWoman_transform'},
        { 'trigger' : 'q', 'location' : 'SuperSeven/', 'name' : 'superSeven_star_background'},
        { 'trigger' : 'q', 'location' : 'WaldoKitty/', 'name' : 'waldoKitty_shootingStars_inSpace'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_2'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_4'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_10'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_11'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_12'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_14'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_15'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_17'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_18'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_21'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_22'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_25'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2702.19.45'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2702.33.53'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2702.42.35'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2702.56.55'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2702.59.06'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2703.03.57'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2703.08.51'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2703.16.56'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2703.19.16'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2703.20.48'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2703.24.22'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2708.16.34'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2708.17.55'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2708.19.04'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2708.51.32'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2708.59.27'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2709.01.21'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2709.03.05'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2709.14.49'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2709.28.31'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2709.33.45'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2710.32.17'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2711.00.55'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2711.02.50'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2711.10.03'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2711.11.45'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2711.14.19'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2711.15.53'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2711.19.25'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2718.34.57'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2718.46.04'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2810.11.18'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2810.14.07'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2810.15.09'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2810.19.04'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2922.44.55'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2923.03.49'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_1'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_10'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_11'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_12'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_13'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_14'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_15'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_16'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_17'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_18'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_19'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_2'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_20'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_21'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_22'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_23'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_24'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_25'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_26'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_3'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_4'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_5'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_6'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_7'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_8'},
        { 'trigger' : 'q', 'location' : 'ColoredGridShapes/', 'name' : 'coloredGridShapes_9'},
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
        { 'trigger' : 'q', 'location' : 'Blackstar/', 'name' : 'blackstar_ship_flying_space'},
        { 'trigger' : 'q', 'location' : 'Blackstar/', 'name' : 'blackstar_space_explosion'},
        { 'trigger' : 'q', 'location' : 'Blackstar/', 'name' : 'blackstar_planet_sagar'},
        { trigger: "q", location: "Aerobics/", name: "abc-start_o" },
        { trigger: "q", location: "Misc/", name: "kaleidoscope_pointed_muted" },
        { trigger: "q", location: "MissionSpatialeDelta2/", name: "msd_2018-03-0317.04.28" },
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2818.30.20'},
        { trigger: "q", location: "Misc/", name: "tvshow_man_floating_triangle_o" },
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_3'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_5'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_6'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_1'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_16'},
      ]
    },
    {
      id: 22,
      trigger: "v",
      name: "Hang Gliding & Stunts",
      enabled: true,
      gifs: [
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_1'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_10'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_11'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_12'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_13'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_14'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_15'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_16'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_17'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_18'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_19'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_2'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_20'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_21'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_22'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_23'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_24'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_25'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_3'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_4'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_5'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_6'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_7'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_8'},
        { 'trigger' : 'q', 'location' : 'HangGliding/', 'name' : 'hangGliding_9'},
 
        { 'trigger' : 'q', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_1'},
        { 'trigger' : 'q', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_10'},
        { 'trigger' : 'q', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_11'},
        { 'trigger' : 'q', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_12'},
        { 'trigger' : 'q', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_13'},
        { 'trigger' : 'q', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_2'},
        { 'trigger' : 'q', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_3'},
        { 'trigger' : 'q', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_4'},
        { 'trigger' : 'q', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_5'},
        { 'trigger' : 'q', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_6'},
        { 'trigger' : 'q', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_7'},
        { 'trigger' : 'q', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_8'},
        { 'trigger' : 'q', 'location' : 'RollerBlade/', 'name' : 'rollerBlade_9'},
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
        { 'trigger' : 'q', 'location' : 'KidVideos/', 'name' : 'flying-trucks2_o'},
        { 'trigger' : 'q', 'location' : 'KidVideos/', 'name' : 'bus-jump-ramp_o'},
        { 'trigger' : 'q', 'location' : 'KidVideos/', 'name' : 'multiple-buses-jumping_o'},
        { 'trigger' : 'q', 'location' : 'KidVideos/', 'name' : 'ramp-jumping-trucks_o'},
        { 'trigger' : 'q', 'location' : 'KidVideos/', 'name' : 'spinning-trucks_o'},
        { 'trigger' : 'q', 'location' : 'KidVideos/', 'name' : 'superhero-banana-car-fx_o'},
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_carChange'},
 
        { 'trigger' : 'q', 'location' : 'Men/', 'name' : 'Men_2019-04-0200.24.30'},
        { 'trigger' : 'q', 'location' : 'Men/', 'name' : 'Men_2019-04-0200.25.29'},
        { 'trigger' : 'q', 'location' : 'Men/', 'name' : 'Men_2019-04-0200.26.51'},
        { 'trigger' : 'q', 'location' : 'Men/', 'name' : 'Men_2019-04-0200.30.04'},
        { 'trigger' : 'q', 'location' : 'Men/', 'name' : 'Men_2019-04-0200.48.01'},
        { 'trigger' : 'q', 'location' : 'Men/', 'name' : 'Men_2019-04-0200.55.05'},
      ]
    },
    {
      id: 23,
      trigger: "b",
      name: "Battle",
      enabled: true,
      gifs: [
        { trigger: "q", location: "WonderTwins/", name: "wondertwins_downhillWagon" },
        { trigger: "q", location: "WonderTwins/", name: "wondertwins_fistBump1_o" },
        { trigger: "q", location: "WonderTwins/", name: "wondertwins_fistBump2_o" },
        { trigger: "q", location: "WonderTwins/", name: "wondertwins_fistBump3" },
        { trigger: "q", location: "WonderTwins/", name: "wondertwins_fists_beach" },
        { trigger: "q", location: "WonderTwins/", name: "wondertwins_formOfWater_o" },
        { trigger: "q", location: "WonderTwins/", name: "wondertwins_jayna_transforms_o" },
        { trigger: "q", location: "WonderTwins/", name: "wondertwins_transforming_o" },
 
        { trigger: "q", location: "SpiralZone/", name: "spiralZone_2019-01-2600.53.36" },
        { trigger: "q", location: "SpiralZone/", name: "spiralZone_2019-01-2600.55.41" },
        { trigger: "q", location: "SpiralZone/", name: "spiralZone_2019-01-2600.56.46" },
        { trigger: "q", location: "SpiralZone/", name: "spiralZone_2019-01-2600.59.49" },
        { trigger: "q", location: "SpiralZone/", name: "spiralZone_2019-01-2601.00.51" },
        { trigger: "q", location: "SpiralZone/", name: "spiralZone_2019-01-2601.07.35" },
        { trigger: "q", location: "SpiralZone/", name: "spiralZone_2019-01-2601.08.46" },
        { trigger: "q", location: "SpiralZone/", name: "spiralZone_2019-01-2601.09.51" },
        { trigger: "q", location: "SpiralZone/", name: "spiralZone_2019-01-2603.17.53" },
 
        { trigger: "q", location: "Hercules/", name: "hercules_dinosaur_hercules_sword_twirl" },
        { trigger: "q", location: "Hercules/", name: "hercules_dinosaur_transform" },
        { trigger: "q", location: "Hercules/", name: "hercules_gorilla_dinosaur_fight" },
        { trigger: "q", location: "Hercules/", name: "hercules_king" },
        { trigger: "q", location: "Hercules/", name: "hercules_king_hercules_fight" },
        { trigger: "q", location: "Hercules/", name: "hercules_king_hercules_fight2" },
        { trigger: "q", location: "Hercules/", name: "hercules_knight" },
        { trigger: "q", location: "Hercules/", name: "hercules_knightHerculesFight" },
        { trigger: "q", location: "Hercules/", name: "hercules_knightHerculesFight2" },
        { trigger: "q", location: "Hercules/", name: "hercules_knightHerculesFight3_o" },
        { trigger: "q", location: "Hercules/", name: "hercules_knightLyte" },
        { trigger: "q", location: "Hercules/", name: "hercules_sword_o" },
        { trigger: "q", location: "Hercules/", name: "hercules_transforms_gorilla_o" },
        { trigger: "q", location: "Hercules/", name: "hercules_king_explosion" },
        { trigger: "q", location: "Hercules/", name: "hercules_king_swing_beam" },
        { trigger: "q", location: "Hercules/", name: "hercules_king_swing_beam2" },
        { trigger: "q", location: "Hercules/", name: "hercules_lightning_skull_o" },
        { trigger: "q", location: "Hercules/", name: "hercules_fling_monsters_o" },
        { trigger: "q", location: "Hercules/", name: "hercules_grabs_bolt" },
        { trigger: "q", location: "Hercules/", name: "hercules_punch_beam" },
        { trigger: "q", location: "Hercules/", name: "hercules_punch_green_monster" },
        { trigger: "q", location: "Hercules/", name: "hercules_shield_block_beam" },
        { trigger: "q", location: "Hercules/", name: "hercules_shield_block_beam2_o" },
        { trigger: "q", location: "Hercules/", name: "hercules_woman_arms_beam_o" },
 
        { 'trigger' : 'q', 'location' : 'Blackstar/', 'name' : 'blackstar_mara_hand_energy'},
        { 'trigger' : 'q', 'location' : 'Blackstar/', 'name' : 'blackstar_overlord_glowing_eyes'},
        { 'trigger' : 'q', 'location' : 'Blackstar/', 'name' : 'blackstar_swords'},
        { 'trigger' : 'q', 'location' : 'Blackstar/', 'name' : 'blackstar_mara_hand_energy'},
        { 'trigger' : 'q', 'location' : 'Blackstar/', 'name' : 'blackstar_overlord'},
        { 'trigger' : 'q', 'location' : 'Blackstar/', 'name' : 'blackstar_overlord_glowing_eyes'},
        { 'trigger' : 'q', 'location' : 'Blackstar/', 'name' : 'blackstar_swords'},
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_bat_punch_chop_robots_o" },
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_kicking_robots_o" },
        { trigger: "q", location: "MissionSpatialeDelta/", name: "msd_man_fighting_robots_o" },
      ]
    },
    {
      id: 24,
      trigger: "n",
      name: "Weird & Strange - Space",
      enabled: true,
      gifs: [
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycatsSpace_intro_rocketFlying2_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycatsSpace_intro_rocketFlying_o" },
        { trigger: "q", location: "JosiePussycatsSpace/", name: "josiePussycatsSpace_space_comets_o" },
 
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_13'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_19'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_20'},
 
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_8'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_9'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_23'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_24'},        
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_26'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_27'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_28'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_30'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_31'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_32'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_33'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_34'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_35'},
        { 'trigger' : 'q', 'location' : 'Unarius/', 'name' : 'unarious_36'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'trippy_psycheDude'},
 
        { 'trigger' : 'q', 'location' : 'MultiplicationRap/', 'name' : 'multiplicationRap_disappearingKid'},
 
        { 'trigger' : 'q', 'location' : 'Peeps/', 'name' : 'misc_01'},
        { 'trigger' : 'q', 'location' : 'Peeps/', 'name' : 'misc_03'},
        { 'trigger' : 'q', 'location' : 'Peeps/', 'name' : 'misc_04'},
        { 'trigger' : 'q', 'location' : 'Peeps/', 'name' : 'misc_05'},
        { 'trigger' : 'q', 'location' : 'Peeps/', 'name' : 'misc_06'},
        { 'trigger' : 'q', 'location' : 'Peeps/', 'name' : 'misc_07'},
        { 'trigger' : 'q', 'location' : 'Peeps/', 'name' : 'misc_08'},
        { 'trigger' : 'q', 'location' : 'Peeps/', 'name' : 'misc_09'},
 
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2818.21.35'}, // weird 3d
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2818.32.51'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2818.33.56'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2818.34.56'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2818.35.58'},
 
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'Righeira_musicVideo1'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'Righeira_musicVideo6'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'Righeira_musicVideo7'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'Righeira_musicVideo8'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'Righeira_musicVideo11'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'parachuting_man'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'shockingTransformSuperhero'},
 
        { trigger: "q", location: "Misc/", name: "bw_striped_cube_spin_o" },
        { trigger: "q", location: "Misc/", name: "bw_stripes_spin_o" },
        { trigger: "q", location: "Misc/", name: "candyBar_happyFace_o" },
        { trigger: "q", location: "Misc/", name: "glowing-cube_o" },
        { trigger: "q", location: "Misc/", name: "stationLogo_spinning_globe_o" },
      ]
    },
    {
      id: 25,
      trigger: "m",
      name: "Buttons & Knobs",
      enabled: true,
      gifs: [
        { 'trigger' : 'q', 'location' : 'WaldoKitty/', 'name' : 'waldoKitty_dogLeader_pushing_buttons'},
        { trigger: "q", location: "BotP/", name: "botp_spectograph2_o" },
        { 'trigger' : 'q', 'location' : 'WaldoKitty/', 'name' : 'waldoKitty_dog_leader_pulls_lever'},
        { 'trigger' : 'q', 'location' : 'WaldoKitty/', 'name' : 'waldoKitty_female_cat_flashing_screen'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'pushing_roundButtons'},
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
        { 'trigger' : 'q', 'location' : 'HeroHigh/', 'name' : 'heroHigh_twirling_wand'},
        { 'trigger' : 'q', 'location' : 'Blackstar/', 'name' : 'blackstar_at_controls'},
        { 'trigger' : 'q', 'location' : 'CableTV/', 'name' : 'cableTV_40'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_manInChair'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_outlets2'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_outlets3'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_outlets4'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_outlets5'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : 'computerAnimation_telephone'},
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
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_collar_making_machine2_REDO_o'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_de-om-beams_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_father_collar_making_REDO_o'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_draag_counsel_tvs_REDO'},
        { 'trigger' : 'q', 'location' : 'FantasticPlanet/', 'name' : 'fp_collar_making_machine_REDO_o'},
        { 'trigger' : 'q', 'location' : 'NewGifs/', 'name' : '2019-05-2921.15.41'},
      ]
    }
  ]
};