//=============================================================================
// fyis_MessageController.js
// ----------------------------------------------------------------------------
// Copyright (c) 2026 fyis
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.2.0 2026/02/08 ボタン表示順・多段レイアウト・サブメニュートグル追加
// 1.1.0 2026/02/08 名前ウィンドウ拡張・背景画像位置調整
// 1.0.0 2026/02/07 初版
//=============================================================================


/*~struct~ButtonOrderConfig:
 * @param autoButtonOrder
 * @text オート表示順
 * @desc 0で非表示。0以外は小さい順に配置
 * @default 1
 * @type number
 * @min 0
 * @max 9999
 *
 * @param skipButtonOrder
 * @text スキップ表示順
 * @desc 0で非表示。0以外は小さい順に配置
 * @default 2
 * @type number
 * @min 0
 * @max 9999
 *
 * @param saveButtonOrder
 * @text セーブ表示順
 * @desc 0で非表示。0以外は小さい順に配置
 * @default 3
 * @type number
 * @min 0
 * @max 9999
 *
 * @param loadButtonOrder
 * @text ロード表示順
 * @desc 0で非表示。0以外は小さい順に配置
 * @default 4
 * @type number
 * @min 0
 * @max 9999
 *
 * @param logButtonOrder
 * @text バックログ表示順
 * @desc 0で非表示。0以外は小さい順に配置
 * @default 5
 * @type number
 * @min 0
 * @max 9999
 */

/*:
 * @plugindesc 汎用メッセージ制御プラグイン
 * @target MZ
 * @number
 * @url https://github.com/fyis-RPG/RPGMaker-MZ-Plug-in
 * @author fyis
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @orderAfter MPP_MessageEX
 *
 *
 * @param --- キー設定 ---
 * @default
 *
 * @param autoKey
 * @text オートキー
 * @desc オートモード切替に使用するキー
 * @default A
 * @type select
 * @option A
 * @option S
 * @option D
 * @option Q
 * @option W
 * @option shift
 * @option control
 * @option tab
 * @parent --- キー設定 ---
 *
 * @param skipKey
 * @text スキップキー
 * @desc スキップモード切替に使用するキー
 * @default control
 * @type select
 * @option A
 * @option S
 * @option D
 * @option Q
 * @option W
 * @option shift
 * @option control
 * @option tab
 * @parent --- キー設定 ---
 *
 * @param saveKey
 * @text クイックセーブキー
 * @desc クイックセーブに使用するキー(なし で無効化)
 * @default F6
 * @type select
 * @option なし
 * @value
 * @option D
 * @option G
 * @option H
 * @option F6
 * @option F7
 * @option 1
 * @option 2
 * @parent --- キー設定 ---
 *
 * @param loadKey
 * @text クイックロードキー
 * @desc クイックロードに使用するキー(なし で無効化)
 * @default F7
 * @type select
 * @option なし
 * @value
 * @option G
 * @option H
 * @option F6
 * @option F7
 * @option 1
 * @option 2
 * @parent --- キー設定 ---
 *
 * @param logKey
 * @text バックログキー
 * @desc バックログ表示に使用するキー
 * @default L
 * @type select
 * @option L
 * @option Q
 * @option W
 * @option shift
 * @option control
 * @option tab
 * @option pageup
 * @option pagedown
 * @parent --- キー設定 ---
 *
 * @param --- オート設定 ---
 * @default
 *
 * @param autoWaitFrame
 * @text オート待機フレーム
 * @desc オートモード時の待機フレーム数。textSizeで文字数を使えます。
 * @default 120 + textSize * 8
 * @parent --- オート設定 ---
 *
 * @param pressingSkip
 * @text 押し続けスキップ
 * @desc ONにするとスキップキーを押している間だけスキップします。
 * @default true
 * @type boolean
 * @parent --- オート設定 ---
 *
 * @param skipWait
 * @text ウェイトスキップ
 * @desc ONにするとスキップモード中にウェイトもスキップします。
 * @default false
 * @type boolean
 * @parent --- オート設定 ---
 *
 * @param --- ボタン画像 ---
 * @default
 *
 * @param closeButtonImage
 * @text ×ボタン画像
 * @desc ウィンドウを閉じるボタンの画像ファイル
 * @default
 * @type file
 * @dir img/pictures
 * @parent --- ボタン画像 ---
 *
 * @param closeButtonHoverImage
 * @text ×ボタンホバー画像
 * @desc マウスオーバー時の×ボタン画像
 * @default
 * @type file
 * @dir img/pictures
 * @parent --- ボタン画像 ---
 *
 * @param autoButtonImage
 * @text オートボタン画像
 * @desc 通常状態のオートボタン画像(img/pictures)
 * @default
 * @type file
 * @dir img/pictures/
 * @parent --- ボタン画像 ---
 *
 * @param autoButtonActiveImage
 * @text オートボタン(有効時)画像
 * @desc オート有効時のボタン画像(img/pictures)
 * @default
 * @type file
 * @dir img/pictures/
 * @parent --- ボタン画像 ---
 *
 * @param autoButtonHoverImage
 * @text オートボタンホバー画像
 * @desc マウスオーバー時のオートボタン画像
 * @default
 * @type file
 * @dir img/pictures
 * @parent --- ボタン画像 ---
 *
 * @param skipButtonImage
 * @text スキップボタン画像
 * @desc 通常状態のスキップボタン画像(img/pictures)
 * @default
 * @type file
 * @dir img/pictures/
 * @parent --- ボタン画像 ---
 *
 * @param skipButtonActiveImage
 * @text スキップボタン(有効時)画像
 * @desc スキップ有効時のボタン画像(img/pictures)
 * @default
 * @type file
 * @dir img/pictures/
 * @parent --- ボタン画像 ---
 *
 * @param skipButtonHoverImage
 * @text スキップボタンホバー画像
 * @desc マウスオーバー時のスキップボタン画像
 * @default
 * @type file
 * @dir img/pictures
 * @parent --- ボタン画像 ---
 *
 * @param saveButtonImage
 * @text セーブボタン画像
 * @desc セーブボタン画像(img/pictures)
 * @default
 * @type file
 * @dir img/pictures/
 * @parent --- ボタン画像 ---
 *
 * @param saveButtonHoverImage
 * @text セーブボタンホバー画像
 * @desc マウスオーバー時のセーブボタン画像
 * @default
 * @type file
 * @dir img/pictures
 * @parent --- ボタン画像 ---
 *
 * @param loadButtonImage
 * @text ロードボタン画像
 * @desc ロードボタン画像(img/pictures)
 * @default
 * @type file
 * @dir img/pictures/
 * @parent --- ボタン画像 ---
 *
 * @param loadButtonHoverImage
 * @text ロードボタンホバー画像
 * @desc マウスオーバー時のロードボタン画像
 * @default
 * @type file
 * @dir img/pictures
 * @parent --- ボタン画像 ---
 *
 * @param logButtonImage
 * @text バックログボタン画像
 * @desc バックログボタン画像(img/pictures)
 * @default
 * @type file
 * @dir img/pictures/
 * @parent --- ボタン画像 ---
 *
 * @param logButtonHoverImage
 * @text ログボタンホバー画像
 * @desc マウスオーバー時のログボタン画像
 * @default
 * @type file
 * @dir img/pictures
 * @parent --- ボタン画像 ---
 *
 * @param menuButtonImage
 * @text メニューボタン画像
 * @desc サブメニュートグル用ボタン画像(img/pictures)
 * @default
 * @type file
 * @dir img/pictures/
 * @parent --- ボタン画像 ---
 *
 * @param menuButtonHoverImage
 * @text メニューボタンホバー画像
 * @desc マウスオーバー時のメニューボタン画像
 * @default
 * @type file
 * @dir img/pictures
 * @parent --- ボタン画像 ---
 *
 * @param --- ボタンレイアウト ---
 * @default
 *
 * @param enableSubMenu
 * @text サブメニュー機能
 * @desc ONにするとメニューボタンで一部のボタンを展開/収納できます
 * @default false
 * @type boolean
 * @parent --- ボタンレイアウト ---
 *
 * @param autoAlignButtons
 * @text ボタン自動整列
 * @desc ON:画像幅に合わせて自動配置(→自動整列設定を使用) OFF:個別座標で配置(→手動配置設定を使用)
 * @default true
 * @type boolean
 * @parent --- ボタンレイアウト ---
 *
 * @param --- 自動整列設定 ---
 * @text --- 自動整列設定(自動整列ON時のみ有効) ---
 * @default
 * @parent --- ボタンレイアウト ---
 *
 * @param buttonAlignPos
 * @text 整列基準位置
 * @desc ボタンをどの角から並べるかを指定します。(自動整列ON時のみ有効)
 * @default right_bottom
 * @type select
 * @option 右下から左へ
 * @value right_bottom
 * @option 左下から右へ
 * @value left_bottom
 * @option 右上から左へ
 * @value right_top
 * @option 左上から右へ
 * @value left_top
 * @parent --- 自動整列設定 ---
 *
 * @param buttonSpacing
 * @text ボタン間隔
 * @desc ボタン同士の間の隙間をピクセルで指定します。(自動整列ON時のみ有効)
 * @default 4
 * @type number
 * @min 0
 * @parent --- 自動整列設定 ---
 *
 * @param buttonAlignOffsetX
 * @text 整列基準X補正
 * @desc 整列の開始位置をX方向にずらします。マイナスで端から離れます。(自動整列ON時のみ有効)
 * @default 0
 * @type number
 * @min -2000
 * @max 2000
 * @parent --- 自動整列設定 ---
 *
 * @param buttonAlignOffsetY
 * @text 整列基準Y補正
 * @desc 整列の開始位置をY方向にずらします。マイナスで上方向。(自動整列ON時のみ有効)
 * @default 0
 * @type number
 * @min -2000
 * @max 2000
 * @parent --- 自動整列設定 ---
 *
 * @param buttonOrder
 * @text ボタン表示順
 * @desc 各ボタンの表示順番号。小さい順に配置。0で非表示。(自動整列ON時のみ有効)
 * @default {"autoButtonOrder":"1","skipButtonOrder":"2","saveButtonOrder":"3","loadButtonOrder":"4","logButtonOrder":"5"}
 * @type struct<ButtonOrderConfig>
 * @parent --- 自動整列設定 ---
 *
 * @param buttonColumns
 * @text 1段あたりのボタン数
 * @desc 指定数ごとに次の段に折り返します。0=折り返しなし。(自動整列ON時のみ有効)
 * @default 0
 * @type number
 * @min 0
 * @max 10
 * @parent --- 自動整列設定 ---
 *
 * @param buttonRowSpacing
 * @text 段間の間隔
 * @desc 多段配置時の段と段の間隔(ピクセル)。(自動整列ON時のみ有効)
 * @default 2
 * @type number
 * @min 0
 * @parent --- 自動整列設定 ---
 *
 * @param --- 手動配置設定 ---
 * @text --- 手動配置設定(自動整列OFF時のみ有効) ---
 * @default
 * @parent --- ボタンレイアウト ---
 *
 * @param buttonAnchor
 * @text ボタン原点
 * @desc 各ボタンXY座標の基準点となるウィンドウの角。(自動整列OFF時のみ有効)
 * @default 3
 * @type select
 * @option 左上
 * @value 0
 * @option 右上
 * @value 1
 * @option 左下
 * @value 2
 * @option 右下
 * @value 3
 * @parent --- 手動配置設定 ---
 *
 * @param buttonPosType
 * @text ボタン座標タイプ
 * @desc 座標の指定方法。相対座標はウィンドウ原点基準、絶対座標は画面左上基準。(自動整列OFF時のみ有効)
 * @default relative
 * @type select
 * @option 相対座標(ウィンドウ基準)
 * @value relative
 * @option 絶対座標(画面基準)
 * @value absolute
 * @parent --- 手動配置設定 ---
 *
 * @param autoButtonX
 * @text オートボタンX
 * @desc オートボタンのX座標(自動整列OFF時のみ有効)
 * @default -456
 * @type number
 * @min -2000
 * @max 2000
 * @parent --- 手動配置設定 ---
 *
 * @param autoButtonY
 * @text オートボタンY
 * @desc オートボタンのY座標(自動整列OFF時のみ有効)
 * @default -32
 * @type number
 * @min -2000
 * @max 2000
 * @parent --- 手動配置設定 ---
 *
 * @param skipButtonX
 * @text スキップボタンX
 * @desc スキップボタンのX座標(自動整列OFF時のみ有効)
 * @default -380
 * @type number
 * @min -2000
 * @max 2000
 * @parent --- 手動配置設定 ---
 *
 * @param skipButtonY
 * @text スキップボタンY
 * @desc スキップボタンのY座標(自動整列OFF時のみ有効)
 * @default -32
 * @type number
 * @min -2000
 * @max 2000
 * @parent --- 手動配置設定 ---
 *
 * @param saveButtonX
 * @text セーブボタンX
 * @desc セーブボタンのX座標(自動整列OFF時のみ有効)
 * @default -304
 * @type number
 * @min -2000
 * @max 2000
 * @parent --- 手動配置設定 ---
 *
 * @param saveButtonY
 * @text セーブボタンY
 * @desc セーブボタンのY座標(自動整列OFF時のみ有効)
 * @default -32
 * @type number
 * @min -2000
 * @max 2000
 * @parent --- 手動配置設定 ---
 *
 * @param loadButtonX
 * @text ロードボタンX
 * @desc ロードボタンのX座標(自動整列OFF時のみ有効)
 * @default -228
 * @type number
 * @min -2000
 * @max 2000
 * @parent --- 手動配置設定 ---
 *
 * @param loadButtonY
 * @text ロードボタンY
 * @desc ロードボタンのY座標(自動整列OFF時のみ有効)
 * @default -32
 * @type number
 * @min -2000
 * @max 2000
 * @parent --- 手動配置設定 ---
 *
 * @param logButtonX
 * @text バックログボタンX
 * @desc バックログボタンのX座標(自動整列OFF時のみ有効)
 * @default -152
 * @type number
 * @min -2000
 * @max 2000
 * @parent --- 手動配置設定 ---
 *
 * @param logButtonY
 * @text バックログボタンY
 * @desc バックログボタンのY座標(自動整列OFF時のみ有効)
 * @default -32
 * @type number
 * @min -2000
 * @max 2000
 * @parent --- 手動配置設定 ---
 *
 * @param menuButtonX
 * @text メニューボタンX
 * @desc メニューボタンのX座標(自動整列OFF時のみ有効)
 * @default -76
 * @type number
 * @min -2000
 * @max 2000
 * @parent --- 手動配置設定 ---
 *
 * @param menuButtonY
 * @text メニューボタンY
 * @desc メニューボタンのY座標(自動整列OFF時のみ有効)
 * @default -32
 * @type number
 * @min -2000
 * @max 2000
 * @parent --- 手動配置設定 ---
 *
 * @param --- メッセージウィンドウ ---
 * @default
 *
 * @param messageWindowImage
 * @text メッセージウィンドウ背景画像
 * @desc メッセージウィンドウの背景に使用する画像(img/pictures)
 * @default
 * @type file
 * @dir img/pictures/
 * @parent --- メッセージウィンドウ ---
 *
 * @param messageWindowImageX
 * @text メッセージウィンドウ背景X
 * @desc メッセージウィンドウ背景画像のX座標補正
 * @default 0
 * @type number
 * @min -2000
 * @max 2000
 * @parent --- メッセージウィンドウ ---
 *
 * @param messageWindowImageY
 * @text メッセージウィンドウ背景Y
 * @desc メッセージウィンドウ背景画像のY座標補正
 * @default 0
 * @type number
 * @min -2000
 * @max 2000
 * @parent --- メッセージウィンドウ ---
 *
 * @param hideWindowFrame
 * @text ウィンドウ枠非表示
 * @desc ONにすると設定に関わらずウィンドウ枠を非表示にします。
 * @default false
 * @type boolean
 * @parent --- メッセージウィンドウ ---
 *
 * @param nameWindowImage
 * @text 名前ウィンドウ背景画像
 * @desc 名前ウィンドウの背景に使用する画像(img/pictures)
 * @default
 * @type file
 * @dir img/pictures/
 * @parent --- メッセージウィンドウ ---
 *
 * @param nameWindowImageX
 * @text 名前ウィンドウ背景X
 * @desc 名前ウィンドウ背景画像のX座標補正
 * @default 0
 * @type number
 * @min -2000
 * @max 2000
 * @parent --- メッセージウィンドウ ---
 *
 * @param nameWindowImageY
 * @text 名前ウィンドウ背景Y
 * @desc 名前ウィンドウ背景画像のY座標補正
 * @default 0
 * @type number
 * @min -2000
 * @max 2000
 * @parent --- メッセージウィンドウ ---
 *
 * @param nameWindowOffsetX
 * @text 名前ウィンドウ位置X
 * @desc 名前ウィンドウの表示位置X補正
 * @default 0
 * @type number
 * @min -2000
 * @max 2000
 * @parent --- メッセージウィンドウ ---
 *
 * @param nameWindowOffsetY
 * @text 名前ウィンドウ位置Y
 * @desc 名前ウィンドウの表示位置Y補正
 * @default 0
 * @type number
 * @min -2000
 * @max 2000
 * @parent --- メッセージウィンドウ ---
 *
 * @param nameWindowHideFrame
 * @text 名前ウィンドウ枠非表示
 * @desc ONにすると名前ウィンドウの枠を非表示にします。
 * @default false
 * @type boolean
 * @parent --- メッセージウィンドウ ---
 *
 * @param nameWindowDisableMask
 * @text 名前ウィンドウマスク無効
 * @desc ONにすると名前ウィンドウとメッセージウィンドウの重なり部分を削らなくなります。
 * @default false
 * @type boolean
 * @parent --- メッセージウィンドウ ---
 *
 * @param --- バックログ ---
 * @default
 *
 * @param maxLogMessages
 * @text ログ保持件数
 * @desc バックログに保持するメッセージの最大件数
 * @default 200
 * @type number
 * @min 10
 * @max 1000
 * @parent --- バックログ ---
 *
 * @param logBackgroundImage
 * @text ログ画面背景画像
 * @desc バックログ画面の背景画像(img/)
 * @default
 * @type file
 * @dir img/
 * @parent --- バックログ ---
 *
 * @param logSplitter
 * @text ログ区切り線
 * @desc イベント切れ目に挿入する区切り線テキスト
 * @default ───────────────────────────
 * @parent --- バックログ ---
 *
 * @param autoSplit
 * @text 自動区切り線
 * @desc ONにするとイベント終了時に区切り線を自動挿入します。
 * @default true
 * @type boolean
 * @parent --- バックログ ---
 *
 * @param logLineSpacing
 * @text ログ行間
 * @desc バックログの行間(ピクセル)
 * @default 2
 * @type number
 * @parent --- バックログ ---
 *
 * @param logMessageSpacing
 * @text メッセージ間隔
 * @desc バックログのメッセージ間の間隔(ピクセル)
 * @default 8
 * @type number
 * @parent --- バックログ ---
 *
 * @param logScrollSpeed
 * @text スクロール速さ
 * @desc 上下キーによるスクロール速さ
 * @default 1
 * @type number
 * @min 1
 * @parent --- バックログ ---
 *
 * @param logScrollSpeedHigh
 * @text 高速スクロール速さ
 * @desc PageUp/PageDownキーによるスクロール速さ
 * @default 10
 * @type number
 * @min 1
 * @parent --- バックログ ---
 *
 * @param --- セーブ/ロード ---
 * @default
 *
 * @param quickSaveSlot
 * @text クイックセーブ専用スロット
 * @desc ON:セーブ/ロード画面に「クイックセーブ」欄を追加(手動上書き不可) OFF:指定スロットに保存
 * @default true
 * @type boolean
 * @parent --- セーブ/ロード ---
 *
 * @param quickSaveSlotNumber
 * @text クイックセーブスロット番号
 * @desc 専用スロットOFF時にクイックセーブするスロット番号(1~)
 * @default 1
 * @type number
 * @min 1
 * @max 99
 * @parent --- セーブ/ロード ---
 *
 * @param --- 表示制御 ---
 * @default
 *
 * @param buttonSwitch
 * @text ボタン表示スイッチ
 * @desc 指定スイッチON時のみボタン表示(0=常時表示)
 * @default 0
 * @type switch
 * @parent --- 表示制御 ---
 *
 * @param disableSwitch
 * @text 全機能無効化スイッチ
 * @desc 指定スイッチON時に全機能を無効化(0=常に有効)
 * @default 0
 * @type switch
 * @parent --- 表示制御 ---
 *
 * @param resetOnEnd
 * @text イベント終了時リセット
 * @desc ONにするとイベント終了時にオート/スキップを解除します。
 * @default true
 * @type boolean
 * @parent --- 表示制御 ---
 *
 * @param --- テキスト速度 ---
 * @default
 *
 * @param defaultTextSpeed
 * @text デフォルトテキスト速度
 * @desc テキスト表示速度のデフォルト値
 * @default 2
 * @type select
 * @option 瞬間表示
 * @value 0
 * @option 高速
 * @value 1
 * @option 普通
 * @value 2
 * @option 低速
 * @value 3
 * @parent --- テキスト速度 ---
 *
 * @param --- テキストボタン設定 ---
 * @default
 *
 * @param fallbackButtonWidth
 * @text テキストボタン幅
 * @desc 画像未設定時のテキストボタンの幅(ピクセル)
 * @default 72
 * @type number
 * @min 30
 * @max 300
 * @parent --- テキストボタン設定 ---
 *
 * @param fallbackButtonHeight
 * @text テキストボタン高さ
 * @desc 画像未設定時のテキストボタンの高さ(ピクセル)
 * @default 28
 * @type number
 * @min 20
 * @max 100
 * @parent --- テキストボタン設定 ---
 *
 * @param fallbackButtonFontSize
 * @text テキストボタンフォントサイズ
 * @desc 画像未設定時のテキストボタンのフォントサイズ
 * @default 14
 * @type number
 * @min 8
 * @max 36
 * @parent --- テキストボタン設定 ---
 *
 * @command showBacklog
 * @text バックログを表示
 * @desc バックログ画面を開きます。
 *
 * @command insertSplitter
 * @text 区切り線を挿入
 * @desc バックログに区切り線を挿入します。
 *
 * @command clearSkipAuto
 * @text スキップ/オート解除
 * @desc スキップ及びオートモードを解除します。
 *
 * @help
 * ============================================================================
 * 汎用メッセージ制御プラグイン (fyis_MessageController)
 * ============================================================================
 *
 * メッセージウィンドウにオート、スキップ、セーブ、ロード、バックログの
 * 5つの機能を追加するプラグインです。
 *
 * ■ 機能一覧
 * ・オートモード: メッセージを自動送りします。
 * ・スキップモード: メッセージを高速スキップします。
 * ・クイックセーブ: 確認後、指定スロットにセーブします。
 * ・クイックロード: 確認後、指定スロットからロードします。
 * ・バックログ: 過去のメッセージ履歴を表示します。
 *
 * ■ バックログの話者名優先順位
 * 以下の順で記録されます:
 * 1. 「文章の表示」の名前欄
 * 2. イベントメモ欄の <name:表記名>
 * 3. イベント名 (エディタ上の名前)
 *
 * ■ 操作方法
 * 各機能にはショートカットキーとボタンクリックの両方でアクセスできます。
 * ショートカットキーはパラメータで自由に変更できます。
 * ボタンは画像を指定すると画像ボタンに、未指定の場合はテキストボタンに
 * なります。
 *
 * ■ 画像の指定
 * ボタン画像は img/pictures/ フォルダに配置してください。
 * メッセージウィンドウの背景画像も img/pictures/ から指定できます。
 * バックログ画面の背景画像は img/ フォルダから指定できます。
 *
 * ■ ボタンの座標
 * 各ボタンの座標は「ボタン原点」で指定した基準点からの相対位置です。
 * デフォルトではウィンドウ右下が原点で、ウィンドウ内の右下に配置。
 *
 * ■ ボタン表示順（自動整列ON時）
 * 「ボタン表示順」構造体で各ボタンに番号を設定します。
 * 小さい番号のボタンから順に配置されます。
 * 番号を0にするとそのボタンは非表示になります。
 * 99、100、999 のような飛び番号でも問題ありません。
 *
 * ■ 多段レイアウト（自動整列ON時）
 * 「1段あたりのボタン数」を指定すると、その数ごとに改行して
 * 複数段にボタンを配置できます。0の場合は折り返しなしの1段配置。
 * 「段間の間隔」で段と段の隙間を調整できます。
 *
 * ■ サブメニュー
 * 「サブメニュー機能」をONにすると、メニューボタン(▲)のみが
 * 常時表示され、クリックで全ボタンを展開/収納できます。
 * 画面をスッキリさせたい場合に便利です。
 *
 * ■ プラグインコマンド
 * ・バックログを表示: バックログ画面を開きます。
 * ・区切り線を挿入: バックログに区切り線を挿入します。
 * ・スキップ/オート解除: スキップ・オートを解除します。
 *
 * ■ スクリプト
 * $gameTemp.requestCallBacklogOnMap(); // マップからバックログを開く
 *
 * ■ 注意事項
 * ・PluginCommonBase.js が必要です。
 *
 * ■ 利用規約
 * MIT License
 * 作者に無断で改変、再配布が可能で、利用形態についても制限はありません。
 */

(() => {
    'use strict';

    // =========================================================================
    // プラグイン名取得（他の初期化より先に必要）
    // =========================================================================
    const script = document.currentScript;
    const pluginName = script.src.replace(/^.*\/(.*).js$/, function () {
        return arguments[1];
    });

    // -------------------------------------------------------------------------
    // 前提プラグインチェック
    // -------------------------------------------------------------------------
    if (typeof PluginManagerEx === 'undefined') {
        const errorMsg = 'PluginCommonBase.js が導入されていません。\n' +
            pluginName + ' の動作には PluginCommonBase.js が必要です。\n' +
            'PluginCommonBase.js を導入し、このプラグインより上に配置してください。';
        if (Utils.isOptionValid('test')) {
            window.alert(errorMsg);
        }
        console.error(errorMsg);
        return; // 処理中断
    }

    // =========================================================================
    // パラメータ取得
    // =========================================================================
    const param = PluginManagerEx.createParameter(script);

    // ボタン並び順のヘルパー（各ボタンの表示順番号から算出、0=非表示）
    const _defaultOrder = ['auto', 'skip', 'save', 'load', 'log'];
    const _buttonOrderMap = {
        auto: 'autoButtonOrder',
        skip: 'skipButtonOrder',
        save: 'saveButtonOrder',
        load: 'loadButtonOrder',
        log: 'logButtonOrder'
    };
    const _getButtonOrder = function () {
        const cfg = param.buttonOrder;
        if (!cfg || typeof cfg !== 'object') return _defaultOrder;
        const entries = [];
        for (const [key, paramName] of Object.entries(_buttonOrderMap)) {
            const order = cfg[paramName];
            if (order != null && order !== 0) {
                entries.push({ key, order });
            }
        }
        if (entries.length === 0) return _defaultOrder;
        entries.sort((a, b) => a.order - b.order);
        return entries.map(e => e.key);
    };

    // autoWaitFrame は計算式文字列なので、createParameter の数値変換を避けて直接取得
    const rawPluginParams = PluginManager.parameters(pluginName);
    const autoWaitFrameFormula = rawPluginParams['autoWaitFrame'] || '120 + textSize * 8';

    // キーコードマッピング
    const KEY_CODE_MAP = {
        a: 65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71,
        h: 72, i: 73, j: 74, k: 75, l: 76, m: 77, n: 78,
        o: 79, p: 80, q: 81, r: 82, s: 83, t: 84, u: 85,
        v: 86, w: 87, x: 88, y: 89, z: 90,
        '0': 48, '1': 49, '2': 50, '3': 51, '4': 52,
        '5': 53, '6': 54, '7': 55, '8': 56, '9': 57,
        shift: 16, control: 17, tab: 9,
        pageup: 33, pagedown: 34,
        f1: 112, f2: 113, f3: 114, f4: 115, f5: 116,
        f6: 117, f7: 118, f8: 119, f9: 120, f10: 121,
        f11: 122, f12: 123,
        home: 36, end: 35
    };

    // =========================================================================
    // キー入力の登録（Input._onKeyDown/Up を直接フックして
    // Mano_InputConfig 等による keyMapper 上書きの影響を回避）
    // =========================================================================
    const customKeyMap = {}; // keyCode -> inputName
    const registerCustomKey = (paramName, inputName) => {
        const keyName = paramName ? paramName.toLowerCase() : '';
        if (!keyName) return '';
        const keyCode = KEY_CODE_MAP[keyName];
        if (keyCode) {
            customKeyMap[keyCode] = inputName;
        }
        return inputName;
    };

    const autoInputName = registerCustomKey(param.autoKey, 'msgCtrl_auto');
    const skipInputName = registerCustomKey(param.skipKey, 'msgCtrl_skip');
    const saveInputName = registerCustomKey(param.saveKey, 'msgCtrl_save');
    const loadInputName = registerCustomKey(param.loadKey, 'msgCtrl_load');
    const logInputName = registerCustomKey(param.logKey, 'msgCtrl_log');

    // Home/Endキーは常に登録（バックログジャンプ用）
    customKeyMap[36] = 'msgCtrl_home'; // Home
    customKeyMap[35] = 'msgCtrl_end';  // End

    // Input._onKeyDown/Up をフックして、カスタムキーの状態を
    // Input._currentState に直接書き込む（keyMapper を経由しない）
    const _Input__onKeyDown = Input._onKeyDown;
    Input._onKeyDown = function (event) {
        _Input__onKeyDown.call(this, event);
        const name = customKeyMap[event.keyCode];
        if (name) {
            this._currentState[name] = true;
        }
    };

    const _Input__onKeyUp = Input._onKeyUp;
    Input._onKeyUp = function (event) {
        _Input__onKeyUp.call(this, event);
        const name = customKeyMap[event.keyCode];
        if (name) {
            this._currentState[name] = false;
        }
    };

    // =========================================================================
    // プラグインコマンド
    // =========================================================================

    PluginManager.registerCommand(pluginName, 'showBacklog', function () {
        SceneManager.push(Scene_Backlog);
    });

    PluginManager.registerCommand(pluginName, 'insertSplitter', function () {
        $gameTemp.messageBacklog().pushSplitter();
    });

    PluginManager.registerCommand(pluginName, 'clearSkipAuto', function () {
        $gameMessage.clearMsgCtrlModes();
    });

    // =========================================================================
    // クイックセーブ専用スロット
    // =========================================================================
    // maxSavefilesを+1して専用スロットを確保(スロットID 1 = クイックセーブ)
    // 他プラグインが変更した後の値に+1する
    const _DataManager_maxSavefiles = DataManager.maxSavefiles;
    if (param.quickSaveSlot) {
        DataManager.maxSavefiles = function () {
            return _DataManager_maxSavefiles.call(this) + 1;
        };
    }

    // クイックセーブスロットIDを取得
    const _getQuickSaveSlotId = function () {
        if (param.quickSaveSlot) {
            return 1; // オートセーブ(0)の直後
        } else {
            return (param.quickSaveSlotNumber || 1);
        }
    };

    if (param.quickSaveSlot) {
        // セーブ画面でクイックセーブスロットを手動上書き不可にする
        const _Window_SavefileList_isEnabled = Window_SavefileList.prototype.isEnabled;
        Window_SavefileList.prototype.isEnabled = function (savefileId) {
            if (this._mode === 'save' && savefileId === 1) {
                return false;
            }
            return _Window_SavefileList_isEnabled.call(this, savefileId);
        };

        // セーブ/ロード画面のタイトル表示
        // ID 0: オートセーブ(標準), ID 1: クイックセーブ, ID 2+: ファイル (ID-1)
        const _Window_SavefileList_drawTitle = Window_SavefileList.prototype.drawTitle;
        Window_SavefileList.prototype.drawTitle = function (savefileId, x, y) {
            if (savefileId === 1) {
                this.drawText('クイックセーブ', x, y, 180);
            } else if (savefileId >= 2) {
                this.drawText(TextManager.file + ' ' + (savefileId - 1), x, y, 180);
            } else {
                _Window_SavefileList_drawTitle.call(this, savefileId, x, y);
            }
        };

        // セーブファイル数にクイックセーブ分を含める
        const _Window_SavefileList_maxItems = Window_SavefileList.prototype.maxItems;
        Window_SavefileList.prototype.maxItems = function () {
            return _Window_SavefileList_maxItems.call(this) + 1;
        };

        // セーブ画面でクイックセーブスロットをスキップして選択
        const _Scene_Save_firstSavefileId = Scene_Save.prototype.firstSavefileId;
        Scene_Save.prototype.firstSavefileId = function () {
            const id = _Scene_Save_firstSavefileId.call(this);
            return id <= 1 ? 2 : id;
        };
    }

    // =========================================================================
    // 無効化チェック
    // =========================================================================
    const isPluginDisabled = () => {
        return param.disableSwitch > 0 && $gameSwitches.value(param.disableSwitch);
    };

    // =========================================================================
    // ConfigManager — テキスト速度の永続化
    // =========================================================================
    const defaultTextSpeed = param.defaultTextSpeed !== undefined ? Number(param.defaultTextSpeed) : 2;
    ConfigManager.msgCtrlTextSpeed = defaultTextSpeed;

    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function () {
        const config = _ConfigManager_makeData.call(this);
        config.msgCtrlTextSpeed = this.msgCtrlTextSpeed;
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function (config) {
        _ConfigManager_applyData.call(this, config);
        this.msgCtrlTextSpeed = config.msgCtrlTextSpeed !== undefined
            ? Number(config.msgCtrlTextSpeed) : defaultTextSpeed;
    };

    const isButtonVisible = () => {
        if (param.buttonSwitch > 0) {
            return $gameSwitches.value(param.buttonSwitch);
        }
        return true;
    };

    // =========================================================================
    // Game_Temp — バックログ管理
    // =========================================================================
    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function () {
        _Game_Temp_initialize.call(this);
        this._messageBacklog = new Game_MessageBacklog();
        this._callBacklogOnMap = false;
    };

    Game_Temp.prototype.messageBacklog = function () {
        if (!this._messageBacklog) {
            this._messageBacklog = new Game_MessageBacklog();
        }
        return this._messageBacklog;
    };

    Game_Temp.prototype.requestCallBacklogOnMap = function () {
        this._callBacklogOnMap = true;
    };

    Game_Temp.prototype.clearCallBacklogOnMapRequest = function () {
        this._callBacklogOnMap = false;
    };

    Game_Temp.prototype.isCallBacklogOnMapRequested = function () {
        return this._callBacklogOnMap;
    };

    // =========================================================================
    // Game_MessageBacklog — バックログデータ
    // =========================================================================
    class Game_MessageBacklog {
        constructor() {
            this._messages = [];
        }

        get messages() {
            return this._messages;
        }

        pushLog(speakerName, text, eventName) {
            this._messages.push(new Game_BacklogMessage(speakerName, text, eventName || '', false));
            this._trimMessages();
        }

        pushChoice(choiceText) {
            this._messages.push(new Game_BacklogMessage('', choiceText, '', true));
            this._trimMessages();
        }

        pushSplitter() {
            const splitter = param.logSplitter || '───────────────────────────';
            this.pushLog('', splitter);
        }

        _trimMessages() {
            const max = param.maxLogMessages || 200;
            if (this._messages.length > max) {
                this._messages.splice(0, this._messages.length - max);
            }
        }

        latestIsSplitter() {
            if (this._messages.length <= 0) return false;
            return this._messages[this._messages.length - 1].isSplitter();
        }

        // セーブデータ用シリアライズ
        serialize() {
            return this._messages.map(m => ({
                s: m._speakerName,
                t: m._message,
                e: m._eventName || '',
                c: m._isChoice || false
            }));
        }

        // セーブデータから復元
        deserialize(data) {
            this._messages = data.map(d => new Game_BacklogMessage(d.s, d.t, d.e || '', d.c || false));
        }
    }

    class Game_BacklogMessage {
        constructor(speakerName, message, eventName, isChoice) {
            this._speakerName = speakerName;
            this._message = message;
            this._eventName = eventName || '';
            this._isChoice = isChoice || false;
        }

        get speakerName() { return this._speakerName; }
        get message() { return this._message; }
        get eventName() { return this._eventName; }
        get isChoice() { return this._isChoice; }

        text() {
            if (this._isChoice) {
                return '\\C[4]▶ ' + this._message + '\\C[0]';
            }
            const header = this._speakerName || (this._eventName ? '\\C[6][' + this._eventName + ']\\C[0]' : '');
            return [header, this._message].filter(t => t).join('\n');
        }

        isSplitter() {
            const splitter = param.logSplitter || '───────────────────────────';
            return this._message === splitter;
        }
    }

    // =========================================================================
    // DataManager — バックログのセーブデータ永続化
    // =========================================================================
    const _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        const contents = _DataManager_makeSaveContents.call(this);
        contents.messageBacklog = $gameTemp.messageBacklog().serialize();
        return contents;
    };

    const _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        _DataManager_extractSaveContents.call(this, contents);
        if (contents.messageBacklog) {
            $gameTemp.messageBacklog().deserialize(contents.messageBacklog);
        }
    };

    // =========================================================================
    // Game_Message — オート/スキップ管理
    // =========================================================================
    const _Game_Message_initialize = Game_Message.prototype.initialize;
    Game_Message.prototype.initialize = function () {
        _Game_Message_initialize.call(this);
        this._msgCtrlSkip = false;
        this._msgCtrlAuto = false;
    };

    Game_Message.prototype.isMsgCtrlSkip = function () {
        return this._msgCtrlSkip;
    };

    Game_Message.prototype.isMsgCtrlAuto = function () {
        return this._msgCtrlAuto;
    };

    Game_Message.prototype.toggleMsgCtrlSkip = function () {
        this._msgCtrlSkip = !this._msgCtrlSkip;
        if (this._msgCtrlSkip) this._msgCtrlAuto = false;
    };

    Game_Message.prototype.toggleMsgCtrlAuto = function () {
        if (!this._msgCtrlSkip) {
            this._msgCtrlAuto = !this._msgCtrlAuto;
        }
    };

    Game_Message.prototype.setMsgCtrlSkip = function (value) {
        this._msgCtrlSkip = value;
        if (value) this._msgCtrlAuto = false;
    };

    Game_Message.prototype.setMsgCtrlAuto = function (value) {
        if (!this._msgCtrlSkip) {
            this._msgCtrlAuto = value;
        }
    };

    Game_Message.prototype.clearMsgCtrlModes = function () {
        this._msgCtrlSkip = false;
        this._msgCtrlAuto = false;
    };

    // =========================================================================
    // Game_Interpreter — イベント終了時の処理
    // =========================================================================
    const _Game_Interpreter_terminate = Game_Interpreter.prototype.terminate;
    Game_Interpreter.prototype.terminate = function () {
        // 自動区切り線の挿入
        if (this._shouldInsertLogSplitter()) {
            $gameTemp.messageBacklog().pushSplitter();
        }
        _Game_Interpreter_terminate.call(this);
        // オート/スキップ解除
        if (param.resetOnEnd && this._isNeedClearModes()) {
            $gameMessage.clearMsgCtrlModes();
        }
    };

    Game_Interpreter.prototype._shouldInsertLogSplitter = function () {
        return (
            param.autoSplit &&
            this._depth === 0 &&
            this._eventId > 0 &&
            !this._isOnParallelEvent() &&
            $gameTemp.messageBacklog().messages.length > 0 &&
            !$gameTemp.messageBacklog().latestIsSplitter()
        );
    };

    Game_Interpreter.prototype._isOnParallelEvent = function () {
        return $gameMap.event(this._eventId)?.isTriggerIn([4]) && this.isOnCurrentMap();
    };

    Game_Interpreter.prototype._isNeedClearModes = function () {
        return ($gameMap._interpreter === this || !$gameMap.isEventRunning()) && this._depth === 0;
    };

    // ウェイトスキップ
    const _Game_Interpreter_updateWaitCount = Game_Interpreter.prototype.updateWaitCount;
    Game_Interpreter.prototype.updateWaitCount = function () {
        if (param.skipWait && $gameMessage.isMsgCtrlSkip()) {
            this._waitCount = 0;
        }
        return _Game_Interpreter_updateWaitCount.call(this);
    };

    // =========================================================================
    // Window_Message — メイン拡張
    // =========================================================================
    const _Window_Message_initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function (rect) {
        _Window_Message_initialize.call(this, rect);
        this._msgCtrlAutoCount = 0;
        this._createControlButtons();
        this._createWindowBackImage();
    };

    // ----- 背景画像 -----
    Window_Message.prototype._createWindowBackImage = function () {
        if (!param.messageWindowImage) return;
        const bitmap = ImageManager.loadPicture(param.messageWindowImage);
        this._msgCtrlBackSprite = new Sprite(bitmap);
        this._msgCtrlBackSprite.anchor.x = 0.5;
        this._msgCtrlBackSprite.anchor.y = 0.5;
        // ウィンドウの背後に挿入
        this._container.addChildAt(this._msgCtrlBackSprite, 0);
    };


    const _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function () {
        _Window_Message_updatePlacement.call(this);
        if (this._msgCtrlBackSprite) {
            const offsetX = (param.messageWindowImageX || 0);
            const offsetY = (param.messageWindowImageY || 0);
            this._msgCtrlBackSprite.x = this.width / 2 + offsetX;
            this._msgCtrlBackSprite.y = this.height / 2 + offsetY;
        }
        this._updateControlButtonPlacement();

        // 背景画像の有無に関わらず枠を非表示
        if (param.hideWindowFrame) {
            if (this._backSprite) this._backSprite.visible = false;
            if (this._frameSprite) this._frameSprite.visible = false;
            // MZ標準プロパティがあれば設定
            if (this.frameVisible !== undefined) this.frameVisible = false;
        }
    };

    // ----- ボタン作成 -----
    Window_Message.prototype._createControlButtons = function () {
        this._ctrlButtons = {};
        const buttonDefs = [
            { key: 'auto', label: 'AUTO', img: param.autoButtonImage, activeImg: param.autoButtonActiveImage, hoverImg: param.autoButtonHoverImage },
            { key: 'skip', label: 'SKIP', img: param.skipButtonImage, activeImg: param.skipButtonActiveImage, hoverImg: param.skipButtonHoverImage },
            { key: 'save', label: 'Q.SAVE', img: param.saveButtonImage, activeImg: null, hoverImg: param.saveButtonHoverImage },
            { key: 'load', label: 'Q.LOAD', img: param.loadButtonImage, activeImg: null, hoverImg: param.loadButtonHoverImage },
            { key: 'log', label: 'LOG', img: param.logButtonImage, activeImg: null, hoverImg: param.logButtonHoverImage }
        ];

        for (const def of buttonDefs) {
            const btn = new Sprite_MsgCtrlButton(def.label, def.img, def.activeImg, def.hoverImg);
            this._ctrlButtons[def.key] = btn;
            this.addChild(btn);

            // 画像ロード完了後にレイアウト再計算
            if (btn.bitmap && !btn.bitmap.isReady()) {
                btn.bitmap.addLoadListener(() => {
                    this._updateControlButtonPlacement();
                });
            }
        }

        // ×ボタン（ウィンドウ非表示用）
        const closeBtn = new Sprite_MsgCtrlButton('×', param.closeButtonImage, null, param.closeButtonHoverImage);
        this._ctrlButtons.close = closeBtn;
        this.addChild(closeBtn);
        if (closeBtn.bitmap && !closeBtn.bitmap.isReady()) {
            closeBtn.bitmap.addLoadListener(() => {
                this._updateControlButtonPlacement();
            });
        }

        // メニューボタン（サブメニュートグル用）
        if (param.enableSubMenu) {
            const menuBtn = new Sprite_MsgCtrlButton('▲', param.menuButtonImage, null, param.menuButtonHoverImage);
            this._ctrlButtons.menu = menuBtn;
            this.addChild(menuBtn);
            if (menuBtn.bitmap && !menuBtn.bitmap.isReady()) {
                menuBtn.bitmap.addLoadListener(() => {
                    this._updateControlButtonPlacement();
                });
            }
            this._subMenuOpen = false;
        }
    };

    Window_Message.prototype._getRelativeButtonPos = function (origX, origY) {
        let x = origX;
        let y = origY;
        const anchor = param.buttonAnchor || 0;
        if (anchor === 1 || anchor === 3) x += this.width;
        if (anchor === 2 || anchor === 3) y += this.height;
        if (param.buttonPosType === 'absolute') {
            x -= this.x;
            y -= this.y;
        }
        return { x, y };
    };

    Window_Message.prototype._updateControlButtonPlacement = function () {
        if (param.autoAlignButtons) {
            this._alignControlButtons();
        } else {
            this._placeControlButtons();
        }

        // ×ボタンの配置（右上基準、重なり時は左にずらす）
        if (this._ctrlButtons.close) {
            const btn = this._ctrlButtons.close;
            const closeBtnW = (btn.bitmap && btn.bitmap.width) || 24;
            const closeBtnH = (btn.bitmap && btn.bitmap.height) || 24;
            let closeX = this.width - closeBtnW - 4;
            let closeY = 4;

            // 自動整列時：他ボタンと重なるなら左にずらす
            if (param.autoAlignButtons) {
                const shouldCheck = !param.enableSubMenu || this._subMenuOpen;
                if (shouldCheck) {
                    for (const key of Object.keys(this._ctrlButtons)) {
                        if (key === 'close') continue;
                        const other = this._ctrlButtons[key];
                        if (!other.visible) continue;
                        const otherW = (other.bitmap && other.bitmap.isReady()) ? other.bitmap.width : (param.fallbackButtonWidth || 72);
                        const otherH = (other.bitmap && other.bitmap.isReady()) ? other.bitmap.height : (param.fallbackButtonHeight || 28);
                        // 矩形の重なり判定
                        if (closeX < other.x + otherW && closeX + closeBtnW > other.x &&
                            closeY < other.y + otherH && closeY + closeBtnH > other.y) {
                            closeX = other.x - closeBtnW - 4;
                            break;
                        }
                    }
                }
            }

            btn.x = closeX;
            btn.y = closeY;
        }
    };

    Window_Message.prototype._placeControlButtons = function () {
        // 0はデフォルト値として有効なのでnullチェックを使用
        const getVal = (v, def) => (v !== undefined && v !== null) ? v : def;
        const positions = {
            auto: { x: getVal(param.autoButtonX, -456), y: getVal(param.autoButtonY, -32) },
            skip: { x: getVal(param.skipButtonX, -380), y: getVal(param.skipButtonY, -32) },
            save: { x: getVal(param.saveButtonX, -304), y: getVal(param.saveButtonY, -32) },
            load: { x: getVal(param.loadButtonX, -228), y: getVal(param.loadButtonY, -32) },
            log: { x: getVal(param.logButtonX, -152), y: getVal(param.logButtonY, -32) },
            menu: { x: getVal(param.menuButtonX, -76), y: getVal(param.menuButtonY, -32) }
        };

        for (const key of Object.keys(positions)) {
            if (this._ctrlButtons[key]) {
                const pos = this._getRelativeButtonPos(positions[key].x, positions[key].y);
                this._ctrlButtons[key].x = pos.x;
                this._ctrlButtons[key].y = pos.y;
            }
        }
    };

    Window_Message.prototype._alignControlButtons = function () {
        const spacing = param.buttonSpacing || 4;
        const alignPos = param.buttonAlignPos || 'right_bottom'; // 'right_bottom' etc

        // 基準位置の決定 (ウィンドウ内相対座標)
        // right_bottom: 右下 (width, height) から左へ並べる
        let baseX = 0;
        let baseY = 0;
        let isRight = false; // 右から左へ並べるか
        const alignOffsetX = (param.buttonAlignOffsetX || 0);
        const alignOffsetY = (param.buttonAlignOffsetY || 0);

        if (alignPos.includes('right')) {
            baseX = this.width + alignOffsetX;
            isRight = true;
        } else {
            baseX = 0 + alignOffsetX;
            isRight = false;
        }

        if (alignPos.includes('bottom')) {
            baseY = this.height + alignOffsetY;
        } else if (alignPos.includes('top')) {
            baseY = 0 + alignOffsetY;
        } else { // outside_top など
            baseY = -40 + alignOffsetY;
        }

        // 並べるボタンの順序（パラメータから取得、未指定ならデフォルト）
        const order = _getButtonOrder();

        // サブメニュー対象キー（ON時は全ボタンが対象）
        const subMenuKeys = param.enableSubMenu ? ['auto', 'skip', 'save', 'load', 'log'] : [];

        // リストに含まれないボタンを非表示
        const allKeys = ['auto', 'skip', 'save', 'load', 'log'];
        for (const key of allKeys) {
            if (this._ctrlButtons[key]) {
                this._ctrlButtons[key].visible = order.includes(key);
            }
        }

        // レイアウト用のキー配列を構築（メニューボタン＋表示順のボタン）
        let layoutKeys = [...order];
        // サブメニューON時：閉じているときはサブメニュー対象を除外
        if (param.enableSubMenu && !this._subMenuOpen) {
            layoutKeys = layoutKeys.filter(k => !subMenuKeys.includes(k));
        }
        // メニューボタンをレイアウト末尾に追加
        if (param.enableSubMenu && this._ctrlButtons.menu) {
            layoutKeys.push('menu');
        }

        // 右寄せの場合は右端から順に配置するため逆順に
        const layoutOrder = isRight ? [...layoutKeys].reverse() : layoutKeys;

        // 多段レイアウト設定
        const columns = param.buttonColumns || 0; // 0=折り返しなし
        const rowSpacing = param.buttonRowSpacing != null ? param.buttonRowSpacing : 2;
        const isBottom = alignPos.includes('bottom');

        let offsetX = 0;
        let colIndex = 0;  // 現在の段内でのボタン数
        let rowIndex = 0;  // 現在の段番号

        layoutOrder.forEach(key => {
            const btn = this._ctrlButtons[key];
            if (!btn) return;
            const btnW = (btn.bitmap && btn.bitmap.isReady()) ? btn.bitmap.width : (param.fallbackButtonWidth || 72);
            const btnH = (btn.bitmap && btn.bitmap.isReady()) ? btn.bitmap.height : (param.fallbackButtonHeight || 28);

            // 折り返し判定
            if (columns > 0 && colIndex >= columns) {
                colIndex = 0;
                offsetX = 0;
                rowIndex++;
            }

            // Y座標（段のオフセットを加算）
            const rowOffset = rowIndex * (btnH + rowSpacing);
            let y = 0;
            if (isBottom) {
                y = baseY - btnH - 4 - rowOffset; // 下から上へ積む
            } else {
                y = baseY + 4 + rowOffset; // 上から下へ積む
            }

            // X座標
            let x = 0;
            if (isRight) {
                x = baseX - offsetX - btnW - 4;
                offsetX += btnW + spacing;
            } else {
                x = baseX + offsetX + 4;
                offsetX += btnW + spacing;
            }

            btn.x = x;
            btn.y = y;
            colIndex++;
        });
    };

    // ----- ボタン表示/非表示 -----
    const _Window_Message_update = Window_Message.prototype.update;
    Window_Message.prototype.update = function () {
        // ウィンドウ非表示状態の管理
        if (this._msgCtrlHidden) {
            // 非表示中: ok/cancel/click で復帰（メッセージ送りせず）
            if (Input.isTriggered('ok') || Input.isTriggered('cancel') || TouchInput.isTriggered()) {
                this._msgCtrlHidden = false;
                this.openness = 255;
                // 入力を消費してメッセージ送りを防止
                Input.clear();
                TouchInput.clear();
            }
            this._updateControlButtons();
            return;
        }
        _Window_Message_update.call(this);
        this._updateControlButtons();
    };

    Window_Message.prototype._updateControlButtons = function () {
        if (!this._ctrlButtons) return;
        const visible = this.isOpen() && !isPluginDisabled() && isButtonVisible() && !this._msgCtrlHidden;

        // 自動整列ON時は除外ボタンを常に非表示
        let excludedKeys = [];
        if (param.autoAlignButtons) {
            const order = _getButtonOrder();
            excludedKeys = ['auto', 'skip', 'save', 'load', 'log'].filter(k => !order.includes(k));
        }

        // サブメニュー対象（ON時は全ボタンが対象）
        const subMenuKeys = param.enableSubMenu ? ['auto', 'skip', 'save', 'load', 'log'] : [];

        for (const key of Object.keys(this._ctrlButtons)) {
            if (key === 'menu') {
                // メニューボタン自体は常に表示
                this._ctrlButtons[key].visible = visible;
            } else if (param.enableSubMenu && subMenuKeys.includes(key)) {
                // サブメニュー対象はトグル状態に応じて表示
                this._ctrlButtons[key].visible = visible && this._subMenuOpen && !excludedKeys.includes(key);
            } else {
                this._ctrlButtons[key].visible = visible && !excludedKeys.includes(key);
            }
        }
        if (!visible) return;

        // アクティブ状態の更新
        if (this._ctrlButtons.auto) {
            this._ctrlButtons.auto.setActive($gameMessage.isMsgCtrlAuto());
        }
        if (this._ctrlButtons.skip) {
            this._ctrlButtons.skip.setActive($gameMessage.isMsgCtrlSkip());
        }
    };

    // ----- ボタン領域タッチガード -----
    Window_Message.prototype._isTouchOnAnyButton = function () {
        if (!this._ctrlButtons) return false;
        const tx = TouchInput.x;
        const ty = TouchInput.y;
        for (const key of Object.keys(this._ctrlButtons)) {
            const btn = this._ctrlButtons[key];
            if (!btn.visible || !btn.bitmap) continue;
            // ワールド座標でのボタン位置を計算
            const bx = this.x + this.padding + btn.x;
            const by = this.y + this.padding + btn.y;
            const bw = btn.bitmap.width;
            const bh = btn.bitmap.height;
            if (tx >= bx && tx < bx + bw && ty >= by && ty < by + bh) {
                return true;
            }
        }
        return false;
    };

    // ----- 確認ウィンドウのサブウィンドウ判定 -----
    const _Window_Message_isAnySubWindowActive = Window_Message.prototype.isAnySubWindowActive;
    Window_Message.prototype.isAnySubWindowActive = function () {
        if (this._msgCtrlConfirmWindow && this._msgCtrlConfirmWindow.active) return true;
        return _Window_Message_isAnySubWindowActive.call(this);
    };





    // ----- キー操作 -----
    const _Window_Message_updateInput = Window_Message.prototype.updateInput;
    Window_Message.prototype.updateInput = function () {
        if (isPluginDisabled()) return _Window_Message_updateInput.call(this);

        // 確認ウィンドウ表示中はカスタム処理をブロック
        if (this._msgCtrlConfirmWindow && this._msgCtrlConfirmWindow.active) {
            return _Window_Message_updateInput.call(this);
        }

        // Escキーでウィンドウ非表示トグル
        if (this.isOpen() && Input.isTriggered('cancel')) {
            this._msgCtrlHidden = true;
            this.openness = 0;
            Input.clear();
            return true;
        }

        // キー入力チェック
        if (this.isOpen() && this.isClosing() === false) {
            if (this._updateMsgCtrlKeyInput()) {
                // ボタンクリックを処理したので入力を消費してメッセージ送りを防止
                TouchInput.clear();
                Input.clear();
                return true;
            }
        }

        // オートモード中の自動送り（手動送り Z/クリック は妨げない）
        if ($gameMessage.isMsgCtrlAuto() && this.pause) {
            this._msgCtrlAutoCount--;
            if (this._msgCtrlAutoCount <= 0) {
                Input.update();
                this.pause = false;
                if (!this._textState) {
                    this.terminateMessage();
                }
                return true;
            }
            // カウントダウン中は手動入力を通すため、ここで return しない
        }

        // スキップモード中の高速送り
        if ($gameMessage.isMsgCtrlSkip() && this.pause) {
            this.pause = false;
            if (!this._textState) {
                this.terminateMessage();
                Input.clear();
            }
            return true;
        }

        // ボタン領域上のタッチはメッセージ送りを抑制
        if ((TouchInput.isTriggered() || TouchInput.isRepeated()) && this._isTouchOnAnyButton()) {
            return true;
        }

        // スキップ中にクリック・決定・キャンセル・スキップキー操作で解除
        if ($gameMessage.isMsgCtrlSkip()) {
            const skipInputName = param.skipKey || 'control';
            // 押し続けスキップ有効かつキー押下中なら解除しない
            const isPressingSkip = param.pressingSkip && Input.isPressed(skipInputName);
            if (!isPressingSkip) {
                if (Input.isTriggered('ok') || Input.isTriggered('cancel') ||
                    TouchInput.isTriggered() || Input.isTriggered(skipInputName)) {
                    $gameMessage.setMsgCtrlSkip(false);
                    this._msgCtrlSkipByPress = false;
                    // 入力を消費してメッセージ送りを防ぐ
                    Input.clear();
                    TouchInput.clear();
                    return true;
                }
            }
        }

        // オート待機フレーム取得（簡易実装）
        const textSize = ($gameMessage.allText() ? $gameMessage.allText().length : 0);
        const autoWait = eval(param.autoWaitFrame) || 100;
        return _Window_Message_updateInput.call(this);
    };

    Window_Message.prototype._updateMsgCtrlKeyInput = function () {
        // ボタンクリックチェック
        if (this._ctrlButtons) {
            if (this._ctrlButtons.auto && this._ctrlButtons.auto.isClicked()) {
                this._onAutoToggle();
                return true;
            }
            if (this._ctrlButtons.skip && this._ctrlButtons.skip.isClicked()) {
                this._onSkipToggle();
                return true;
            }
            if (this._ctrlButtons.save && this._ctrlButtons.save.isClicked()) {
                this._onQuickSave();
                return true;
            }
            if (this._ctrlButtons.load && this._ctrlButtons.load.isClicked()) {
                this._onQuickLoad();
                return true;
            }
            if (this._ctrlButtons.log && this._ctrlButtons.log.isClicked()) {
                this._onShowBacklog();
                return true;
            }
            if (this._ctrlButtons.menu && this._ctrlButtons.menu.isClicked()) {
                this._subMenuOpen = !this._subMenuOpen;
                this._updateControlButtonPlacement();
                return true;
            }
            // ×ボタンは他のボタンより後に判定（重なり時に他ボタン優先）
            if (this._ctrlButtons.close && this._ctrlButtons.close.isClicked()) {
                this._msgCtrlHidden = true;
                this.openness = 0;
                return true;
            }
        }

        // ショートカットキー
        if (autoInputName && Input.isTriggered(autoInputName)) {
            this._onAutoToggle();
        }
        if (skipInputName && Input.isTriggered(skipInputName)) {
            if (param.pressingSkip) {
                // 押し続けスキップは別処理
            } else {
                this._onSkipToggle();
            }
        }
        if (param.pressingSkip && skipInputName) {
            const isPressed = Input.isPressed(skipInputName);
            if (isPressed) {
                if (!$gameMessage.isMsgCtrlSkip()) {
                    $gameMessage.setMsgCtrlSkip(true);
                    this._msgCtrlSkipByPress = true;
                }
            } else {
                if (this._msgCtrlSkipByPress) {
                    $gameMessage.setMsgCtrlSkip(false);
                    this._msgCtrlSkipByPress = false;
                }
            }
        }
        if (saveInputName && Input.isTriggered(saveInputName)) {
            this._onQuickSave();
        }
        if (loadInputName && Input.isTriggered(loadInputName)) {
            this._onQuickLoad();
        }
        // バックログはフラグを立ててScene_Mapから安全にシーン遷移する
        if (logInputName && Input.isTriggered(logInputName)) {
            this._onShowBacklog();
        }
        return false;
    };

    Window_Message.prototype._onAutoToggle = function () {
        $gameMessage.toggleMsgCtrlAuto();
        SoundManager.playCursor();
    };

    Window_Message.prototype._onSkipToggle = function () {
        $gameMessage.toggleMsgCtrlSkip();
        SoundManager.playCursor();
    };

    Window_Message.prototype._onQuickSave = function () {
        if (this._msgCtrlConfirmWindow) {
            this._msgCtrlConfirmWindow.showConfirm('save', 'クイックセーブしますか？');
        } else {
            this._executeQuickSave();
        }
    };

    Window_Message.prototype._onQuickLoad = function () {
        if (this._msgCtrlConfirmWindow) {
            this._msgCtrlConfirmWindow.showConfirm('load', 'クイックロードしますか？');
        } else {
            this._executeQuickLoad();
        }
    };

    Window_Message.prototype._executeQuickSave = function () {
        const slotId = _getQuickSaveSlotId();
        $gameSystem.onBeforeSave();
        DataManager.saveGame(slotId)
            .then(() => {
                SoundManager.playSave();
                StorageManager.cleanBackup(slotId);
            })
            .catch(() => {
                SoundManager.playBuzzer();
            });
    };

    Window_Message.prototype._executeQuickLoad = function () {
        const slotId = _getQuickSaveSlotId();
        DataManager.loadGame(slotId)
            .then(() => {
                SoundManager.playLoad();
                SceneManager.goto(Scene_Map);
                $gameSystem.onAfterLoad();
            })
            .catch(() => {
                SoundManager.playBuzzer();
            });
    };

    Window_Message.prototype._onShowBacklog = function () {
        // Scene_Mapのupdateから安全にシーン遷移するためフラグを立てる
        $gameTemp.requestCallBacklogOnMap();
    };

    // ----- メッセージ表示開始時のカウント初期化 -----
    const _Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function () {
        _Window_Message_startMessage.call(this);
        this._initAutoCount();
        this._allButtonsLayoutDone = false; // 毎回レイアウト確認を行う
        this._lastButtonWidthHash = "";     // ハッシュもリセットして強制再計算
    };

    Window_Message.prototype._initAutoCount = function () {
        let textSize = 0;
        if (this._textState) {
            let idx = this._textState.index;
            const text = this._textState.text;
            while (text[idx] && !(text[idx] === '\x1b' && text[idx + 1] === '!')) {
                idx++;
            }
            textSize = idx - this._textState.index;
        }
        // autoWaitFrameFormulaは計算式文字列として直接取得済み(createParameterの数値変換を回避)
        const formula = autoWaitFrameFormula;
        try {
            const converted = PluginManagerEx.convertEscapeCharacters(String(formula));
            this._msgCtrlAutoCount = Math.max(1, eval(converted));
        } catch (e) {
            this._msgCtrlAutoCount = 120;
        }
    };

    // ----- スキップモード中の瞬間表示 -----
    const _Window_Message_updateMessage = Window_Message.prototype.updateMessage;
    Window_Message.prototype.updateMessage = function () {
        // スキップモード中の瞬間表示
        if ($gameMessage.isMsgCtrlSkip() && this._textState) {
            // 全文を一気に表示
            while (this._textState && this._textState.index < this._textState.text.length) {
                if (this._textState.text[this._textState.index] === '\x1b') {
                    const nextChar = this._textState.text[this._textState.index + 1];
                    if (nextChar === '!') {
                        this._textState.index += 2;
                        continue;
                    }
                }
                this.updateShowFast();
                if (!_Window_Message_updateMessage.call(this)) break;
            }
            return true;
        }

        // テキスト速度制御
        const speed = ConfigManager.msgCtrlTextSpeed;
        if (speed === 0 && this._textState) {
            // 瞬間表示
            this.updateShowFast();
            while (this._textState && this._textState.index < this._textState.text.length) {
                if (!_Window_Message_updateMessage.call(this)) break;
            }
            return true;
        } else if (speed === 1 && this._textState) {
            // 高速: 1フレームで3文字
            for (let i = 0; i < 3; i++) {
                if (!_Window_Message_updateMessage.call(this)) return i > 0;
            }
            return true;
        } else if (speed === 3) {
            // 低速: 2フレームに1文字
            if (!this._msgCtrlSlowCounter) this._msgCtrlSlowCounter = 0;
            this._msgCtrlSlowCounter++;
            if (this._msgCtrlSlowCounter >= 2) {
                this._msgCtrlSlowCounter = 0;
                return _Window_Message_updateMessage.call(this);
            }
            return true;
        }

        // 普通速度（speed === 2）: デフォルト動作
        return _Window_Message_updateMessage.call(this);
    };

    // ----- バックログ蓄積 -----
    const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function () {
        // テキストログに追加
        if ($gameMessage.allText()) {
            const speakerName = $gameMessage.speakerName ?
                this.convertEscapeCharacters($gameMessage.speakerName()) : '';
            const text = this.convertEscapeCharacters($gameMessage.allText());
            // イベント名・メモ名を取得（話者名が無い場合に使用）
            let eventName = '';
            try {
                const interpreter = $gameMap._interpreter;
                if (interpreter && interpreter._eventId > 0) {
                    const event = $gameMap.event(interpreter._eventId);
                    if (event && event.event()) {
                        // メモ欄の <name:xxx> を優先
                        const note = event.event().note || '';
                        const nameMatch = note.match(/<name:\s*(.+?)>/i);
                        if (nameMatch) {
                            eventName = nameMatch[1];
                        } else {
                            eventName = event.event().name || '';
                        }
                    }
                }
            } catch (e) {
                // イベント名取得失敗は無視
            }
            $gameTemp.messageBacklog().pushLog(speakerName, text, eventName);
        }
        _Window_Message_terminateMessage.call(this);
    };

    // ----- 選択肢のバックログ蓄積 -----
    const _Window_ChoiceList_callOkHandler = Window_ChoiceList.prototype.callOkHandler;
    Window_ChoiceList.prototype.callOkHandler = function () {
        // 選択結果をバックログに記録（terminateMessage の前に実行される）
        const choices = $gameMessage.choices();
        const selectedText = choices[this.index()] || '';
        if (selectedText) {
            $gameTemp.messageBacklog().pushChoice(selectedText);
        }
        _Window_ChoiceList_callOkHandler.call(this);
    };

    const _Window_ChoiceList_callCancelHandler = Window_ChoiceList.prototype.callCancelHandler;
    Window_ChoiceList.prototype.callCancelHandler = function () {
        // キャンセル結果をバックログに記録
        $gameTemp.messageBacklog().pushChoice('（キャンセル）');
        _Window_ChoiceList_callCancelHandler.call(this);
    };

    // =========================================================================
    // Sprite_MsgCtrlButton — コントロールボタン
    // =========================================================================
    class Sprite_MsgCtrlButton extends Sprite_Clickable {
        constructor(label, imageName, activeImageName, hoverImageName) {
            super();
            this._label = label;
            this._imageName = imageName || '';
            this._activeImageName = activeImageName || '';
            this._hoverImageName = hoverImageName || '';
            this._isActive = false;
            this._isHovered = false;
            this._isUsingImage = false;
            this._pressed = false;
            this._clicked = false;
            this._setupGraphic();
        }

        _setupGraphic() {
            if (this._imageName) {
                // 画像ボタン
                this._isUsingImage = true;
                this._normalBitmap = ImageManager.loadPicture(this._imageName);
                this._activeBitmap = this._activeImageName ?
                    ImageManager.loadPicture(this._activeImageName) : this._normalBitmap;
                this._hoverBitmap = this._hoverImageName ?
                    ImageManager.loadPicture(this._hoverImageName) : null;
                this.bitmap = this._normalBitmap;
            } else {
                // テキストフォールバックボタン
                this._isUsingImage = false;
                const w = param.fallbackButtonWidth || 72;
                const h = param.fallbackButtonHeight || 28;
                this.bitmap = new Bitmap(w, h);
                this._drawTextButton(false, false);
            }
        }

        _drawTextButton(active, hover) {
            if (this._isUsingImage) return;
            const w = this.bitmap.width;
            const h = this.bitmap.height;
            this.bitmap.clear();

            // 背景
            let bgColor = 'rgba(0,0,0,0.65)';
            if (active) bgColor = 'rgba(255,200,100,0.85)';
            else if (hover) bgColor = 'rgba(100,100,150,0.85)'; // ホバー色

            let borderColor = 'rgba(200,200,200,0.7)';
            if (active) borderColor = 'rgba(255,220,150,1)';
            else if (hover) borderColor = 'rgba(220,220,255,0.9)'; // ホバー枠

            const ctx = this.bitmap.context;
            ctx.save();

            // 角丸矩形
            const r = 4;
            ctx.beginPath();
            ctx.moveTo(r, 0);
            ctx.lineTo(w - r, 0);
            ctx.quadraticCurveTo(w, 0, w, r);
            ctx.lineTo(w, h - r);
            ctx.quadraticCurveTo(w, h, w - r, h);
            ctx.lineTo(r, h);
            ctx.quadraticCurveTo(0, h, 0, h - r);
            ctx.lineTo(0, r);
            ctx.quadraticCurveTo(0, 0, r, 0);
            ctx.closePath();

            ctx.fillStyle = bgColor;
            ctx.fill();
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();

            // テキスト
            this.bitmap.fontSize = param.fallbackButtonFontSize || 14;
            this.bitmap.textColor = active ? '#333333' : '#ffffff';
            this.bitmap.outlineColor = active ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.7)';
            this.bitmap.outlineWidth = 2;
            this.bitmap.drawText(this._label, 0, 0, w, h, 'center');
        }

        setActive(active) {
            if (this._isActive === active) return;
            this._isActive = active;
            this._refreshBitmap();
        }

        update() {
            // _clicked を先にリセットしてから super.update()を実行
            this._clicked = false;
            super.update();
            this._updateHover();
            this._refreshBitmap();
        }

        _updateHover() {
            if (!this.visible) {
                this._isHovered = false;
                return;
            }
            const touchX = TouchInput.x;
            const touchY = TouchInput.y;
            const node = this;
            // worldTransformの逆変換を使ってローカル座標系でヒットテスト
            if (node.worldTransform) {
                const localPos = new Point(touchX, touchY);
                node.worldTransform.applyInverse(localPos, localPos);
                this._isHovered = this.hitTest(localPos.x, localPos.y);
            } else {
                // worldTransformが未生成の場合の簡易判定（保険）
                this._isHovered = false;
            }
        }

        _refreshBitmap() {
            if (this._isUsingImage) {
                if (this._pressed) {
                    // プレス時は輝度を下げる
                    this.setColorTone([-32, -32, -32, 0]);
                    this.bitmap = this._isActive ? this._activeBitmap : this._normalBitmap;
                } else if (this._isActive) {
                    this.setColorTone([0, 0, 0, 0]);
                    this.bitmap = this._activeBitmap;
                } else if (this._isHovered) {
                    if (this._hoverBitmap) {
                        this.setColorTone([0, 0, 0, 0]);
                        this.bitmap = this._hoverBitmap;
                    } else {
                        // ホバー画像が無い場合は明るくする
                        this.setColorTone([32, 32, 32, 0]);
                        this.bitmap = this._normalBitmap;
                    }
                } else {
                    this.setColorTone([0, 0, 0, 0]);
                    this.bitmap = this._normalBitmap;
                }
                // opacity制御はsetColorToneと競合しないが、ここでは標準のまま
            } else {
                // テキストボタンの再描画
                // 状態が変わった時だけ再描画すべきだが、簡易実装として毎フレーム呼ばれるrefreshBitmap内で判定
                // (最適化: _lastStateを持たせて変更時のみ_drawTextButton)
                const stateKey = `${this._isActive}:${this._isHovered}:${this._pressed}`;
                if (this._lastStateKey !== stateKey) {
                    this._drawTextButton(this._isActive, this._isHovered);
                    this._lastStateKey = stateKey;
                    // テキストボタンのプレス表現
                    this.opacity = this._pressed ? 160 : 255;
                }
            }
        }

        onPress() {
            this._pressed = true;
        }

        onClick() {
            this._clicked = true;
            this._pressed = false;
        }

        onMouseExit() {
            this._pressed = false;
            this._isHovered = false;
        }

        isClicked() {
            return this._clicked;
        }

        hitTest(x, y) {
            if (!this.bitmap) return false;
            const rect = new Rectangle(0, 0, this.bitmap.width, this.bitmap.height);
            return rect.contains(x, y);
        }
    }

    // =========================================================================
    // Scene_Backlog — バックログシーン
    // =========================================================================
    class Scene_Backlog extends Scene_Base {
        create() {
            super.create();
            this._createBackground();
            this.createWindowLayer();
            this._createBacklogWindow();
            this._createCloseButton();
        }

        _createBackground() {
            this._backgroundSprite = new Sprite();
            if (param.logBackgroundImage) {
                this._backgroundSprite.bitmap = ImageManager.loadBitmap('img/', param.logBackgroundImage);
            } else {
                this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
            }
            this.addChild(this._backgroundSprite);
        }

        _createBacklogWindow() {
            const y = ConfigManager.touchUI ? this.buttonAreaBottom() : 0;
            const rect = new Rectangle(0, y, Graphics.boxWidth, Graphics.boxHeight - y);
            this._backlogWindow = new Window_Backlog(rect);
            this._backlogWindow.setHandler('cancel', this.popScene.bind(this));
            this.addWindow(this._backlogWindow);
        }

        _createCloseButton() {
            if (ConfigManager.touchUI) {
                this._cancelButton = new Sprite_Button('cancel');
                this._cancelButton.x = Graphics.boxWidth - this._cancelButton.width - 4;
                this._cancelButton.y = this.buttonY();
                this.addChild(this._cancelButton);
            }
        }
    }

    // =========================================================================
    // Window_Backlog — バックログウィンドウ
    // =========================================================================
    class Window_Backlog extends Window_Selectable {
        initialize(rect) {
            super.initialize(rect);
            this._setupMessages();
            this._scrollY = this.maxScrollY();
            this._scrollbarDragging = false;
            this._scrollbarWidth = 12;
            this._scrollbarPadding = 4;
            this._createScrollbarSprite();
            this.refresh();
            this.activate();
        }

        _createScrollbarSprite() {
            // スクロールバーをウィンドウコンテンツの上に描画するスプライト
            this._scrollbarSprite = new Sprite();
            this._scrollbarSprite.bitmap = new Bitmap(this._scrollbarWidth, this.innerHeight);
            this._scrollbarSprite.x = this.innerWidth - this._scrollbarWidth + this.padding;
            this._scrollbarSprite.y = this.padding;
            this.addChild(this._scrollbarSprite);
        }

        maxItems() {
            return this._logMessages ? this._logMessages.length : 0;
        }

        lineHeight() {
            return super.lineHeight() + (param.logLineSpacing || 2);
        }

        _setupMessages() {
            let fromBottom = 0;
            this._logMessages = Array.from($gameTemp.messageBacklog().messages)
                .reverse()
                .map(message => {
                    const height = this._calcMsgHeight(message);
                    fromBottom += height;
                    return { message, height, heightFromBottom: fromBottom };
                })
                .reverse();
        }

        overallHeight() {
            if (this._logMessages && this._logMessages.length > 0) {
                return this._logMessages[0].heightFromBottom;
            }
            return this.innerHeight;
        }

        isCursorMovable() {
            return true;
        }

        cursorUp() {
            this.smoothScrollUp(param.logScrollSpeed || 1);
        }

        cursorDown() {
            this.smoothScrollDown(param.logScrollSpeed || 1);
        }

        cursorPageup() {
            this.smoothScrollUp(param.logScrollSpeedHigh || 10);
        }

        cursorPagedown() {
            this.smoothScrollDown(param.logScrollSpeedHigh || 10);
        }

        isCancelTriggered() {
            if (super.isCancelTriggered()) return true;
            if (this.isOkTriggered()) return true;
            if (logInputName && Input.isTriggered(logInputName)) return true;
            return false;
        }

        paint() {
            if (this.contents) {
                this.contents.clear();
                this._drawBacklog();
            }
            this._drawScrollbar();
        }

        _drawScrollbar() {
            if (!this._scrollbarSprite) return;
            const sb = this._scrollbarSprite.bitmap;
            sb.clear();
            const maxScroll = this.maxScrollY();
            if (maxScroll <= 0) return;

            const trackH = this.innerHeight;
            const w = this._scrollbarWidth;
            const pad = this._scrollbarPadding;

            // トラック背景
            sb.fillRect(0, 0, w, trackH, 'rgba(255,255,255,0.1)');

            // サム（つまみ）
            const viewRatio = this.innerHeight / this.overallHeight();
            const thumbH = Math.max(30, Math.floor(trackH * viewRatio));
            const scrollRatio = this._scrollY / maxScroll;
            const thumbY = Math.floor((trackH - thumbH) * scrollRatio);

            const ctx = sb.context;
            ctx.save();
            const r = w / 2;
            ctx.beginPath();
            ctx.moveTo(r, thumbY);
            ctx.lineTo(w - 1, thumbY + r);
            ctx.lineTo(w - 1, thumbY + thumbH - r);
            ctx.quadraticCurveTo(w - 1, thumbY + thumbH, r, thumbY + thumbH);
            ctx.lineTo(1, thumbY + thumbH - r);
            ctx.lineTo(1, thumbY + r);
            ctx.quadraticCurveTo(1, thumbY, r, thumbY);
            ctx.closePath();
            ctx.fillStyle = this._scrollbarDragging ? 'rgba(255,220,150,0.9)' : 'rgba(200,200,200,0.6)';
            ctx.fill();
            ctx.restore();
            sb.baseTexture.update();
        }

        _drawBacklog() {
            if (!this._logMessages) return;
            let height = 0;
            const x = 4;
            const spacing = param.logMessageSpacing || 8;
            this._logMessages.forEach(entry => {
                const lineSpacing = param.logLineSpacing || 2;
                this.drawTextEx(entry.message.text(), x, height + Math.floor(lineSpacing / 2) - this.scrollBaseY());
                height += entry.height;
            });
        }

        textSizeEx(text) {
            this.resetFontSettings();
            const textState = this.createTextState(text, 4, 0, this.innerWidth);
            textState.drawing = false;
            this.processAllText(textState);
            return { width: textState.outputWidth, height: textState.outputHeight };
        }

        _calcMsgHeight(message) {
            const spacing = param.logMessageSpacing || 8;
            return this.textSizeEx(message.text()).height + spacing;
        }

        select() { }

        update() {
            super.update();
            this.updateArrows();
            this._updateScrollbar();
            // Home/End ジャンプ
            if (Input.isTriggered('msgCtrl_home')) {
                this.setScrollAccel(0, 0);
                this._scrollY = 0;
                this.paint();
            } else if (Input.isTriggered('msgCtrl_end')) {
                this.setScrollAccel(0, 0);
                this._scrollY = this.maxScrollY();
                this.paint();
            }
        }

        _updateScrollbar() {
            const maxScroll = this.maxScrollY();
            if (maxScroll <= 0) return;

            const trackH = this.innerHeight;
            const sbX = this.x + this.innerWidth - this._scrollbarWidth + this.padding;
            const sbY = this.y + this.padding;
            const tx = TouchInput.x;
            const ty = TouchInput.y;
            const isOnScrollbar = tx >= sbX && tx < sbX + this._scrollbarWidth && ty >= sbY && ty < sbY + trackH;

            if (TouchInput.isTriggered() && isOnScrollbar) {
                this._scrollbarDragging = true;
                // クリック位置に即ジャンプ
                const ratio = (ty - sbY) / trackH;
                this._scrollY = Math.floor(ratio * maxScroll);
                this._scrollY = this._scrollY.clamp(0, maxScroll);
                this.setScrollAccel(0, 0);
                this.paint();
            }

            if (this._scrollbarDragging) {
                if (TouchInput.isPressed()) {
                    const ratio = (ty - sbY) / trackH;
                    this._scrollY = Math.floor(ratio * maxScroll);
                    this._scrollY = this._scrollY.clamp(0, maxScroll);
                    this.setScrollAccel(0, 0);
                    this.paint();
                } else {
                    this._scrollbarDragging = false;
                    this._drawScrollbar();
                }
            }
        }

        // ドラッグ中はキャンセル入力を無視
        isCancelTriggered() {
            if (this._scrollbarDragging) return false;
            if (super.isCancelTriggered()) return true;
            if (this.isOkTriggered()) return true;
            if (logInputName && Input.isTriggered(logInputName)) return true;
            return false;
        }
    }

    // =========================================================================
    // Scene_Message — 確認ウィンドウ統合
    // =========================================================================
    const _Scene_Message_createAllWindows = Scene_Message.prototype.createAllWindows;
    Scene_Message.prototype.createAllWindows = function () {
        _Scene_Message_createAllWindows.call(this);
        try {
            this._createMsgCtrlConfirmWindow();
        } catch (e) {
            console.error('fyis_MessageController: 確認ウィンドウ作成エラー', e);
        }
    };

    Scene_Message.prototype._createMsgCtrlConfirmWindow = function () {
        const ww = 300;
        const lineHeight = 36;
        const itemHeight = lineHeight + 8; // Window_Selectable の itemHeight
        const padding = ($gameSystem ? $gameSystem.windowPadding() : 12);
        const wh = lineHeight + itemHeight * 2 + padding * 2; // 質問1行 + コマンド2行
        const wx = (Graphics.boxWidth - ww) / 2;
        const wy = (Graphics.boxHeight - wh) / 2;
        const rect = new Rectangle(wx, wy, ww, wh);
        this._msgCtrlConfirmWindow = new Window_MsgCtrlConfirm(rect);
        this._msgCtrlConfirmWindow.setHandler('yes', this._onMsgCtrlConfirmYes.bind(this));
        this._msgCtrlConfirmWindow.setHandler('no', this._onMsgCtrlConfirmNo.bind(this));
        this._msgCtrlConfirmWindow.setHandler('cancel', this._onMsgCtrlConfirmNo.bind(this));
        this.addWindow(this._msgCtrlConfirmWindow);
        // Window_Message に参照を渡す
        if (this._messageWindow) {
            this._messageWindow._msgCtrlConfirmWindow = this._msgCtrlConfirmWindow;
        }
    };

    Scene_Message.prototype._onMsgCtrlConfirmYes = function () {
        const action = this._msgCtrlConfirmWindow.getAction();
        this._msgCtrlConfirmWindow.close();
        this._msgCtrlConfirmWindow.deactivate();
        if (action === 'save') {
            this._messageWindow._executeQuickSave();
        } else if (action === 'load') {
            this._messageWindow._executeQuickLoad();
        }
    };

    Scene_Message.prototype._onMsgCtrlConfirmNo = function () {
        this._msgCtrlConfirmWindow.close();
        this._msgCtrlConfirmWindow.deactivate();
    };

    // =========================================================================
    // Window_MsgCtrlConfirm — セーブ/ロード確認ウィンドウ
    // =========================================================================
    class Window_MsgCtrlConfirm extends Window_Command {
        initialize(rect) {
            this._action = null;
            this._questionText = '';
            super.initialize(rect);
            this.openness = 0;
            this.deactivate();
        }

        // ビットマップの高さをウィンドウ内部高さに合わせる（質問行分の領域を確保）
        contentsHeight() {
            return Math.max(this.innerHeight, 1);
        }

        makeCommandList() {
            this.addCommand('はい', 'yes');
            this.addCommand('いいえ', 'no');
        }

        // コマンドを質問テキストの分だけ下にシフト
        itemRect(index) {
            const rect = super.itemRect(index);
            rect.y += this.lineHeight();
            return rect;
        }

        refresh() {
            super.refresh();
            if (this._questionText) {
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(this._questionText, 0, 4, this.innerWidth, 'center');
                this.resetTextColor();
            }
        }

        showConfirm(action, text) {
            this._action = action;
            this._questionText = text;
            this.refresh();
            this.open();
            this.activate();
            this.select(1); // デフォルトは「いいえ」で安全側
        }

        getAction() {
            return this._action;
        }
    }

    // =========================================================================
    // Scene_Map — マップ上でのバックログ呼び出し対応
    // =========================================================================
    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        _Scene_Map_update.call(this);
        if (!SceneManager.isSceneChanging()) {
            this._updateCallBacklog();
        }
    };

    Scene_Map.prototype._updateCallBacklog = function () {
        if (isPluginDisabled()) return;
        // Window_Messageからのフラグ要求、またはメッセージ非表示中のキー入力
        if ($gameTemp.isCallBacklogOnMapRequested()) {
            $gameTemp.clearCallBacklogOnMapRequest();
            this._callBacklog();
            return;
        }
        // マップ上でメッセージ表示中でないときにもログキーでバックログを開く
        if (!$gameMessage.isBusy() && logInputName && Input.isTriggered(logInputName)) {
            this._callBacklog();
        }
    };

    Scene_Map.prototype._callBacklog = function () {
        SoundManager.playCursor();
        SceneManager.push(Scene_Backlog);
        $gameTemp.clearDestination();
    };

    // =========================================================================
    // Window_NameBox — 名前ウィンドウ拡張
    // =========================================================================
    const _Window_NameBox_initialize = Window_NameBox.prototype.initialize;
    Window_NameBox.prototype.initialize = function (rect) {
        _Window_NameBox_initialize.call(this, rect);

        // 背景画像
        if (param.nameWindowImage) {
            const bitmap = ImageManager.loadPicture(param.nameWindowImage);
            this._nameBackSprite = new Sprite(bitmap);
            this._nameBackSprite.anchor.x = 0.5;
            this._nameBackSprite.anchor.y = 0.5;
            this._container.addChildAt(this._nameBackSprite, 0);
        }

        // 枠非表示
        if (param.nameWindowHideFrame) {
            if (this._backSprite) this._backSprite.visible = false;
            if (this._frameSprite) this._frameSprite.visible = false;
            // MZ標準プロパティがあれば設定
            if (this.frameVisible !== undefined) this.frameVisible = false;
        }
    };

    const _Window_NameBox_updatePlacement = Window_NameBox.prototype.updatePlacement;
    Window_NameBox.prototype.updatePlacement = function () {
        _Window_NameBox_updatePlacement.call(this);

        // ウィンドウ位置補正
        const offsetX = (param.nameWindowOffsetX || 0);
        const offsetY = (param.nameWindowOffsetY || 0);
        this.x += offsetX;
        this.y += offsetY;

        // 背景画像位置補正
        if (this._nameBackSprite) {
            const imgOffsetX = (param.nameWindowImageX || 0);
            const imgOffsetY = (param.nameWindowImageY || 0);
            this._nameBackSprite.x = this.width / 2 + imgOffsetX;
            this._nameBackSprite.y = this.height / 2 + imgOffsetY;
        }
    };

    // ----- マスク無効化 -----
    // WindowLayerはステンシルバッファを使い、drawShapeで描かれた矩形で
    // ウィンドウ同士の重なり部分をマスクする。
    // NameBoxをWindowLayerから取り出してScene直下に配置することで、
    // ステンシルシステムを完全に回避し、両ウィンドウが完全に描画される。
    if (param.nameWindowDisableMask) {
        const _Scene_Message_associateWindows = Scene_Message.prototype.associateWindows;
        Scene_Message.prototype.associateWindows = function () {
            _Scene_Message_associateWindows.call(this);
            // NameBoxをWindowLayerから取り出してScene直下に配置
            if (this._windowLayer && this._nameBoxWindow) {
                this._windowLayer.removeChild(this._nameBoxWindow);
                this.addChild(this._nameBoxWindow);
            }
        };

        // NameBoxの可視性をMessageWindowの非表示状態に連動
        const _Window_Message_update_mask = Window_Message.prototype.update;
        Window_Message.prototype.update = function () {
            _Window_Message_update_mask.call(this);
            if (this._nameBoxWindow) {
                this._nameBoxWindow.visible = this.visible && !this._msgCtrlHidden;
            }
        };
    }

    // =========================================================================
    // グローバル公開
    // =========================================================================
    globalThis.Game_MessageBacklog = Game_MessageBacklog;
    globalThis.Game_BacklogMessage = Game_BacklogMessage;
    globalThis.Scene_Backlog = Scene_Backlog;
    globalThis.Window_Backlog = Window_Backlog;
    globalThis.Sprite_MsgCtrlButton = Sprite_MsgCtrlButton;
    globalThis.Window_MsgCtrlConfirm = Window_MsgCtrlConfirm;


})();
