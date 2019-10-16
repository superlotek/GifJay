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
const playlist = {
   
  bank: [
    {
      id: 0,
      trigger: "q",
      name: "Skeletons",
      enabled: true,
      colorPalette: ['#C01B05','#200706','#FC9016','#5C0405','#070602'],
      overlays: [
        { trigger: "8", location: "overlays", type: "artist", name: "clubSurge_logo_gold.gif" },
        { trigger: "9", location: "overlays", type: "artist", name: "clubSurge_logo_white.gif" },
      ],
      bankColorOpacity: .7,
      gifs: [
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-1'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-10'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-11'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-12'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-13'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-14'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-15'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-16'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-17'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-18'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-19'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-2'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-20'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-21'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-22'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-23'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-24'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-25'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-26'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-3'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-4'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-5'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-6'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-7'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-8'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'animated-dancing-skeletons-9'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'cartoon-eyes'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'cartoon-fighting-cats'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'cartoon-graveyard-scene'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'cartoon-jumping-skeleton'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'cartoon-owl'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'cartoon-throwing-head-skeleton'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'cartoon-vampire-keyboard'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'floating-skeleton-heads'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'prancing-skeleton'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'skeleton-in-rearview'},
        { 'trigger' : 'q', 'location' : 'Halloween/Skeletons/', 'name' : 'skeleton-spinning-faces'},
      ],
    },
    {
      id: 1,
      trigger: "w",
      name: "",
      enabled: true,
      colorPalette: ['#C01B05','#200706','#FC9016','#5C0405','#070602'],
      gifs: [
        { 'trigger' : 'q', 'location' : 'Halloween/Zombies/', 'name' : 'thriller-zombie-heads'},
        { 'trigger' : 'q', 'location' : 'Halloween/Zombies/', 'name' : 'zombie-1'},
        { 'trigger' : 'q', 'location' : 'Halloween/Zombies/', 'name' : 'zombie-2'},
        { 'trigger' : 'q', 'location' : 'Halloween/Zombies/', 'name' : 'zombie-crowd'},
        { 'trigger' : 'q', 'location' : 'Halloween/Witches/', 'name' : 'witches-scaring-kids'},
        { 'trigger' : 'q', 'location' : 'Halloween/Screaming/', 'name' : 'screaming-woman-2'},
        { 'trigger' : 'q', 'location' : 'Halloween/Screaming/', 'name' : 'woman-screaming'},
        { 'trigger' : 'q', 'location' : 'Halloween/ScoobyDoo/', 'name' : 'scooby-doo-bats-flying'},
        { 'trigger' : 'q', 'location' : 'Halloween/ScoobyDoo/', 'name' : 'scooby-doo-ghost'},
        { 'trigger' : 'q', 'location' : 'Halloween/ScoobyDoo/', 'name' : 'scooby-doo-knight'},
        { 'trigger' : 'q', 'location' : 'Halloween/ScoobyDoo/', 'name' : 'scooby-doo-seaman'},
        { 'trigger' : 'q', 'location' : 'Halloween/ScoobyDoo/', 'name' : 'scooby-doo-secret-door-ghost'},
        { 'trigger' : 'q', 'location' : 'Halloween/ScoobyDoo/', 'name' : 'scooby-doo-skulls'},
      ]
    },
    {
      id: 2,
      trigger: "e",
      name: "",
      enabled: true,
      gifs: [
        { 'trigger' : 'q', 'location' : 'Halloween/Spiderman/', 'name' : 'spiderman-explosion-bolts'},
        { 'trigger' : 'q', 'location' : 'Halloween/Spiderman/', 'name' : 'spiderman-explosion'},
        { 'trigger' : 'q', 'location' : 'Halloween/Spiderman/', 'name' : 'spiderman-kotep-1'},
        { 'trigger' : 'q', 'location' : 'Halloween/Spiderman/', 'name' : 'spiderman-kotep-10'},
        { 'trigger' : 'q', 'location' : 'Halloween/Spiderman/', 'name' : 'spiderman-kotep-11'},
        { 'trigger' : 'q', 'location' : 'Halloween/Spiderman/', 'name' : 'spiderman-kotep-12'},
        { 'trigger' : 'q', 'location' : 'Halloween/Spiderman/', 'name' : 'spiderman-kotep-13'},
        { 'trigger' : 'q', 'location' : 'Halloween/Spiderman/', 'name' : 'spiderman-kotep-14'},
        { 'trigger' : 'q', 'location' : 'Halloween/Spiderman/', 'name' : 'spiderman-kotep-15'},
        { 'trigger' : 'q', 'location' : 'Halloween/Spiderman/', 'name' : 'spiderman-kotep-2'},
        { 'trigger' : 'q', 'location' : 'Halloween/Spiderman/', 'name' : 'spiderman-kotep-3'},
        { 'trigger' : 'q', 'location' : 'Halloween/Spiderman/', 'name' : 'spiderman-kotep-4'},
        { 'trigger' : 'q', 'location' : 'Halloween/Spiderman/', 'name' : 'spiderman-kotep-5'},
        { 'trigger' : 'q', 'location' : 'Halloween/Spiderman/', 'name' : 'spiderman-kotep-6'},
        { 'trigger' : 'q', 'location' : 'Halloween/Spiderman/', 'name' : 'spiderman-kotep-7'},
        { 'trigger' : 'q', 'location' : 'Halloween/Spiderman/', 'name' : 'spiderman-kotep-8'},
        { 'trigger' : 'q', 'location' : 'Halloween/Spiderman/', 'name' : 'spiderman-kotep-9'},
      ]
    },
    {
      id: 3,
      trigger: "r",
      name: "",
      enabled: true,
      gifs: [
        { 'trigger' : 'q', 'location' : 'Halloween/Phantasm/', 'name' : 'phantasm_ball_drilling_head'},
        { 'trigger' : 'q', 'location' : 'Halloween/Phantasm/', 'name' : 'phantasm_ball_drilling_head2'},
        { 'trigger' : 'q', 'location' : 'Halloween/Phantasm/', 'name' : 'phantasm_bed_grab_boy'},
        { 'trigger' : 'q', 'location' : 'Halloween/Phantasm/', 'name' : 'phantasm_cutting_fingers'},
        { 'trigger' : 'q', 'location' : 'Halloween/Phantasm/', 'name' : 'phantasm_hey_boy_grabbing'},
        { 'trigger' : 'q', 'location' : 'Halloween/Phantasm/', 'name' : 'phantasm_house_vanishes'},
        { 'trigger' : 'q', 'location' : 'Halloween/Phantasm/', 'name' : 'phantasm_multi_clips'},
        { 'trigger' : 'q', 'location' : 'Halloween/Phantasm/', 'name' : 'phantasm_mustard_mouth'},
        { 'trigger' : 'q', 'location' : 'Halloween/Phantasm/', 'name' : 'phantasm_tall_man_chase_boy'},
        { 'trigger' : 'q', 'location' : 'Halloween/Phantasm/', 'name' : 'phantasm_tall_man_eye_multiplies'},
        { 'trigger' : 'q', 'location' : 'Halloween/Phantasm/', 'name' : 'phantasm_tall_man_multiplies'},
        { 'trigger' : 'q', 'location' : 'Halloween/Phantasm/', 'name' : 'phantasm_tall_man_portal'},
        { 'trigger' : 'q', 'location' : 'Halloween/Phantasm/', 'name' : 'phantasm_tall_man_stare'},
        { 'trigger' : 'q', 'location' : 'Halloween/Phantasm/', 'name' : 'phantasm_tall_man_walk'},
      ]
    },
    {
      id: 4,
      trigger: "t",
      name: "",
      enabled: true,
      gifs: [
        { 'trigger' : 'q', 'location' : 'Halloween/Masks/', 'name' : 'creepy-mask-kids'},
        { 'trigger' : 'q', 'location' : 'Halloween/Masks/', 'name' : 'woman-mask-face'},
        { 'trigger' : 'q', 'location' : 'Halloween/Lightning/', 'name' : 'lightning copy'},
        { 'trigger' : 'q', 'location' : 'Halloween/Lightning/', 'name' : 'lightning'},
        { 'trigger' : 'q', 'location' : 'Halloween/Dracula/', 'name' : 'dracula-blood-eyes'},
        { 'trigger' : 'q', 'location' : 'Halloween/Dracula/', 'name' : 'dracula-eyes'},
        { 'trigger' : 'q', 'location' : 'Halloween/Blood/', 'name' : 'bloody-body'},
        { 'trigger' : 'q', 'location' : 'Halloween/Blood/', 'name' : 'head-chop'},
        { 'trigger' : 'q', 'location' : 'Halloween/Blood/', 'name' : 'headless-squirting'},
        { 'trigger' : 'q', 'location' : 'Halloween/Blood/', 'name' : 'woman-sliced-throat'},
        { 'trigger' : 'q', 'location' : 'Halloween/Aliens/', 'name' : 'alien-creature-eyes'},
        { 'trigger' : 'q', 'location' : 'Halloween/Aliens/', 'name' : 'alien-monster-hands'},
      ]
    },
    {
      id: 5,
      trigger: "y",
      name: "",
      enabled: true,
      gifs: [
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs/Pumpkins/', 'name' : '8-bit-spinning-pumpkin'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs/Pumpkins/', 'name' : 'animated-pumpkin'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs/Pumpkins/', 'name' : 'flashing-pumpkin-face'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs/Pumpkins/', 'name' : 'flashing-pumpkin'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs/Pumpkins/', 'name' : 'ghost-in-pumpkin'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs/Pumpkins/', 'name' : 'pumpkin-face-2'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs/Pumpkins/', 'name' : 'scary-pumpkin'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs/Pumpkins/', 'name' : 'spinning-pumpkins'},
      ]
    },
    {
      id: 6,
      trigger: "u",
      name: "",
      enabled: true,
      gifs: [
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs//', 'name' : '3d-creeping-skeleton'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs//', 'name' : '3d-friendly-ghost'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs//', 'name' : '3d-walking-zombie'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs//', 'name' : 'blood-dripping'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs//', 'name' : 'bowl-of-fire'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs//', 'name' : 'cauldron-with-fire'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs//', 'name' : 'crow-and-skull'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs//', 'name' : 'dripping-blood-line'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs//', 'name' : 'flying-bat'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs//', 'name' : 'green-ghost'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs//', 'name' : 'lightning-2'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs//', 'name' : 'line-of-flames'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs//', 'name' : 'pacing-cat'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs//', 'name' : 'spectre-eyes-flashing'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs//', 'name' : 'vampire-color-changing'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs//', 'name' : 'witch-crystal-ball'},
        { 'trigger' : 'q', 'location' : 'Halloween/VintageGifs//', 'name' : 'witch-on-broom'},
      ]
    },    {
      id: 7,
      trigger: "i",
      name: "",
      enabled: true,
      gifs: [
        { 'trigger' : 'q', 'location' : 'Halloween/NewTemp/', 'name' : 'outOfTheUnknown_01'},
        { 'trigger' : 'q', 'location' : 'Halloween/NewTemp/', 'name' : 'outOfTheUnknown_02'},
        { 'trigger' : 'q', 'location' : 'Halloween/NewTemp/', 'name' : 'outOfTheUnknown_03'},
        { 'trigger' : 'q', 'location' : 'Halloween/NewTemp/', 'name' : 'outOfTheUnknown_04'},
        { 'trigger' : 'q', 'location' : 'Halloween/NewTemp/', 'name' : 'outOfTheUnknown_05'},
        { 'trigger' : 'q', 'location' : 'Halloween/NewTemp/', 'name' : 'outOfTheUnknown_06'},
        { 'trigger' : 'q', 'location' : 'Halloween/NewTemp/', 'name' : 'outOfTheUnknown_07'},
        { 'trigger' : 'q', 'location' : 'Halloween/NewTemp/', 'name' : 'outOfTheUnknown_08'},
        { 'trigger' : 'q', 'location' : 'Halloween/NewTemp/', 'name' : 'outOfTheUnknown_09'},
        { 'trigger' : 'q', 'location' : 'Halloween/NewTemp/', 'name' : 'outOfTheUnknown_10'},
        { 'trigger' : 'q', 'location' : 'Halloween/NewTemp/', 'name' : 'outOfTheUnknown_11'},
        { 'trigger' : 'q', 'location' : 'Halloween/NewTemp/', 'name' : 'outOfTheUnknown_12'},
        { 'trigger' : 'q', 'location' : 'Halloween/NewTemp/', 'name' : 'outOfTheUnknown_13'},
        { 'trigger' : 'q', 'location' : 'Halloween/NewTemp/', 'name' : 'outOfTheUnknown_14'},
        { 'trigger' : 'q', 'location' : 'Halloween/NewTemp/', 'name' : 'outOfTheUnknown_15'},
        { 'trigger' : 'q', 'location' : 'Halloween/NewTemp/', 'name' : 'outOfTheUnknown_16'},
        { 'trigger' : 'q', 'location' : 'Halloween/NewTemp/', 'name' : 'outOfTheUnknown_17'},
        { 'trigger' : 'q', 'location' : 'Halloween/NewTemp/', 'name' : 'outOfTheUnknown_18'},
        { 'trigger' : 'q', 'location' : 'Halloween/NewTemp/', 'name' : 'outOfTheUnknown_19'},
        { 'trigger' : 'q', 'location' : 'Halloween/NewTemp/', 'name' : 'outOfTheUnknown_20'},
      ]
    },
   
    {
      id: 8,
      trigger: "o",
      name: "",
      colorPalette: ['#C01B05','#200706','#FC9016','#5C0405','#070602'],
      enabled: true,
      gifs: [
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'anime-split-fingers'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'bleeding-candle'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'bride-of-frankenstein'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'candles-blown-out'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'ceiling-crawl'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'creatures-from-ground'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'creepy-clown-hands'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'creepy-eyes'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'four-eyes-zoom-in'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'lightning-scary-house'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'mutilated-monster-face'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'one-eyed-monster'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'red-eyes'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'scared-woman'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'scary-doll'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'scary-woman-blowing-out-candle'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'skeleton-with-smoke'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'speeding-scary-forest'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'the-fly-eyes'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'three-people-creepy-masks'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'upside-eye'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'ventriliquist-dummy'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'weird-old-man'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'wolf-man'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'woman-arched-back'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'woman-vampire'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'zoom-in-scary-woman'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'someBody_2019-04-3009.31.31'},
        { 'trigger' : 'q', 'location' : 'Halloween/Misc/', 'name' : 'someBody_2019-04-3009.25.34'},
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
      name: "",
      enabled: false,
      gifs: [
      ]
    },
    {
      id: 11,
      trigger: "s",
      name: "",
      enabled: false,
      gifs: [ 
      ]
    },
    {
      id: 12,
      trigger: "d",
      name: "",
      enabled: false,
      gifs: [
      ]
    },
    {
      id: 13,
      trigger: "f",
      name: "",
      enabled: false,
      gifs: [
      ]
    },
    {
      id: 14,
      trigger: "g",
      name: "",
      enabled: false,
      gifs: [
      ]
    },
    {
      id: 15,
      trigger: "h",
      name: "",
      enabled: false,
      gifs: [
      ]
    },
    {
      id: 16,
      trigger: "j",
      name: "",
      enabled: false,
      gifs: [
      ]
    },
    {
      id: 17,
      trigger: "k",
      name: "",
      enabled: false,
      gifs: [
      ]
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
      name: "",
      enabled: false,
      gifs: [
 
      ]
    },
    {
      id: 20,
      trigger: "x",
      name: "",
      enabled: false,
      gifs: [
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
      name: "",
      enabled: false,
      gifs: [
      ]
    }
  ]
};