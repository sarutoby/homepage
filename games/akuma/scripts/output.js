var assets = [
    'images/backgrounds.json',
    'images/backgrounds.png',
    'images/buttons.json',
    'images/buttons.png',
    'images/caution.png',
    'images/charactors.json',
    'images/charactors.png',
    'images/configWindow.png',
    'images/confirmWindow.png',
    'images/cutinMessageWindow.png',
    'images/endroll_1.png',
    'images/endroll_2.png',
    'images/menuBar.png',
    'images/messageWindow_bk.png',
    'images/messageWindow.png',
    'images/saveWindow.png',
    'images/title.png',
    'sounds/button40.mp3',
    'sounds/button63.mp3',
    'sounds/Clap01-1.mp3',
    'sounds/door-cl01.mp3',
    'sounds/door-cl02.mp3',
    'sounds/game_maoudamashii_6_dangeon09_fixed.mp3',
    'sounds/Hit01-2.mp3',
    'sounds/LovelyDay.mp3',
    'sounds/Onmtp-Inspiration08-1.mp3',
    'sounds/Puzzle.mp3',
    'sounds/se_maoudamashii_battle_gun01.mp3',
    'sounds/se_maoudamashii_battle01.mp3',
    'sounds/se_maoudamashii_battle16.mp3',
    'sounds/se_maoudamashii_onepoint06.mp3',
    'sounds/se_maoudamashii_onepoint13.mp3',
    'sounds/se_maoudamashii_onepoint25.mp3',
    'sounds/se_maoudamashii_system41.mp3',
    'sounds/Shortbridge02-1.mp3',
    'sounds/silent.mp3',
    'sounds/Social_Documentary04.mp3',
    'fonts/mplus-1c-regular.ttf'
];
var scenarioFiles = [
    'scenarios/akuma_no_meishi.txt'
];
var jsons = [
    'jsons/1_settings.json'
];
var backgroundFactory;
(function (backgroundFactory) {
    var list = {
        "病室": { "image": "bg_hospital_room.png" },
        "玄関": { "image": "bg_house.png" },
        "美術室": { "image": "bg_art_room.png" },
        "ダイニング": { "image": "bg_dining.png" }
    };
    // キャラクターSpriteを作成して返す
    // 使い方: sprite.show(sprite.status[key]);
    function createSprite() {
        var sprite;
        var images = ['dummyChara.png'];
        var status = { '': 0 };
        keys = Object.keys(list);
        for (var i = 0; i < keys.length; i++) {
            images.push(list[keys[i]].image);
            status[keys[i]] = i + 1;
        }
        sprite = g.sprite(images);
        sprite.status = status;
        return sprite;
    }
    backgroundFactory.createSprite = createSprite;
})(backgroundFactory || (backgroundFactory = {}));
var charactorFactory;
(function (charactorFactory) {
    var list = {
        "武田": { "image": "takeda.png" },
        "鈴木": { "image": "suzuki.png" },
        "浩美": { "image": "hiromi.png" }
    };
    // キャラクターSpriteを作成して返す
    // 使い方: sprite.show(sprite.status[key]);
    function createSprite() {
        var sprite;
        var images = ['dummyChara.png'];
        var status = { '': 0 };
        keys = Object.keys(list);
        for (var i = 0; i < keys.length; i++) {
            images.push(list[keys[i]].image);
            status[keys[i]] = i + 1;
        }
        sprite = g.sprite(images);
        sprite.status = status;
        return sprite;
    }
    charactorFactory.createSprite = createSprite;
})(charactorFactory || (charactorFactory = {}));
var common;
(function (common) {
    var parts;
    (function (parts) {
        // セーブウィンドウ
        var saveWindow;
        (function (saveWindow) {
        })(saveWindow = parts.saveWindow || (parts.saveWindow = {}));
        // 確認ダイアログ
        var confirmDialog;
        (function (confirmDialog) {
        })(confirmDialog = parts.confirmDialog || (parts.confirmDialog = {}));
        // Y/Nダイアログ
        var yesNoDialog;
        (function (yesNoDialog) {
        })(yesNoDialog = parts.yesNoDialog || (parts.yesNoDialog = {}));
        // 設定ダイアログ
        var configWindow;
        (function (configWindow) {
        })(configWindow = parts.configWindow || (parts.configWindow = {}));
        // 画面項目の設定
        function init() {
            makeSaveWindowObject();
            makeConfirmDialogObject();
            makeYesNoDialogObject();
            makeConfigWindowObject();
        }
        parts.init = init;
    })(parts = common.parts || (common.parts = {}));
    // セーブウィンドウ表示
    function showSaveWindow(onTap, onClose) {
        sounds.playSe('ボタン操作音');
        parts.saveWindow.group.visible = true;
        parts.saveWindow.title.content = 'セーブ';
        drawSavedata();
        parts.saveWindow.closeButton.interact = true;
        for (var i = 0; i < 4; i++) {
            parts.saveWindow.slots[i].interact = true;
        }
        // スロットのタップイベント設定
        var _loop_1 = function(i) {
            parts.saveWindow.slots[i].interact = true;
            parts.saveWindow.slots[i].slot = i + 1;
            parts.saveWindow.slots[i].tap = function () {
                console.log('slot' + parts.saveWindow.slots[i].slot + ' selected');
                for (var i_1 = 0; i_1 < 4; i_1++) {
                    parts.saveWindow.slots[i_1].interact = false;
                }
                parts.saveWindow.closeButton.interact = false;
                onTap(parts.saveWindow.slots[i].slot);
            };
            console.debug(parts.saveWindow.slots[i]);
        };
        for (var i = 0; i < 4; i++) {
            _loop_1(i);
        }
        // 終了イベント設定
        parts.saveWindow.closeButton.tap = function () {
            for (var i = 0; i < 4; i++) {
                parts.saveWindow.slots[i].interact = false;
            }
            parts.saveWindow.closeButton.interact = false;
            closeSaveWindow();
            onClose();
        };
    }
    common.showSaveWindow = showSaveWindow;
    // ロードウィンドウ表示
    function showLoadWindow(onTap, onClose) {
        sounds.playSe('ボタン操作音');
        parts.saveWindow.group.visible = true;
        parts.saveWindow.title.content = 'ロード';
        drawSavedata();
        parts.saveWindow.closeButton.interact = true;
        // スロットのタップイベント設定
        var _loop_2 = function(i) {
            parts.saveWindow.slots[i].interact = true;
            parts.saveWindow.slots[i].slot = i + 1;
            parts.saveWindow.slots[i].tap = function () {
                // セーブデータが存在しない場合、何もしない
                if (savedataUtil.getData()[i + 1].scenario === '')
                    return;
                console.log('slot' + parts.saveWindow.slots[i].slot + ' selected');
                for (var i_2 = 0; i_2 < 4; i_2++) {
                    parts.saveWindow.slots[i_2].interact = false;
                }
                parts.saveWindow.closeButton.interact = false;
                onTap(parts.saveWindow.slots[i].slot);
            };
        };
        for (var i = 0; i < 4; i++) {
            _loop_2(i);
        }
        // 終了イベント設定
        parts.saveWindow.closeButton.tap = function () {
            sounds.playSe('ボタン操作音');
            for (var i = 0; i < 4; i++) {
                parts.saveWindow.slots[i].interact = false;
            }
            parts.saveWindow.closeButton.interact = false;
            closeSaveWindow();
            onClose();
        };
    }
    common.showLoadWindow = showLoadWindow;
    // セーブウィンドウのクローズ
    function closeSaveWindow() {
        parts.saveWindow.closeButton.interact = false;
        for (var i = 0; i < 4; i++) {
            parts.saveWindow.slots[i].interact = false;
        }
        parts.saveWindow.group.visible = false;
    }
    common.closeSaveWindow = closeSaveWindow;
    // セーブデータの読み込みと表示
    function drawSavedata() {
        var data = savedataUtil.getData();
        for (var i = 0; i < 4; i++) {
            parts.saveWindow.text[i].content = data[i + 1].text;
            parts.saveWindow.time[i].content = data[i + 1].time;
        }
    }
    // 確認ダイアログ表示
    function showConfirmDialog(title, text, onClose) {
        sounds.playSe('ボタン操作音');
        parts.confirmDialog.group.visible = true;
        parts.confirmDialog.title.content = title;
        parts.confirmDialog.text.content = text;
        parts.confirmDialog.okButton.interact = true;
        // 終了イベント設定
        parts.confirmDialog.okButton.tap = function () {
            sounds.playSe('ボタン操作音');
            parts.confirmDialog.okButton.interact = false;
            parts.confirmDialog.group.visible = false;
            onClose();
        };
    }
    common.showConfirmDialog = showConfirmDialog;
    // Y/Nダイアログ表示
    function showYesNoDialog(title, text, onYes, onNo) {
        sounds.playSe('ボタン操作音');
        parts.yesNoDialog.group.visible = true;
        parts.yesNoDialog.title.content = title;
        parts.yesNoDialog.text.content = text;
        parts.yesNoDialog.yesButton.interact = true;
        parts.yesNoDialog.noButton.interact = true;
        // 終了イベント設定
        parts.yesNoDialog.yesButton.tap = function () {
            sounds.playSe('ボタン操作音');
            parts.yesNoDialog.yesButton.interact = false;
            parts.yesNoDialog.noButton.interact = false;
            parts.yesNoDialog.group.visible = false;
            onYes();
        };
        parts.yesNoDialog.noButton.tap = function () {
            sounds.playSe('ボタン操作音');
            parts.yesNoDialog.noButton.interact = false;
            parts.yesNoDialog.noButton.interact = false;
            parts.yesNoDialog.group.visible = false;
            onNo();
        };
    }
    common.showYesNoDialog = showYesNoDialog;
    // 設定ダイアログ表示
    function showConfigWindow(onClose) {
        sounds.playSe('ボタン操作音');
        reloadConfigParts();
        parts.configWindow.group.visible = true;
        //        parts.configWindow.text.content = text;
        parts.configWindow.okButton.interact = true;
        // ボタン押下イベント設定
        for (var i = 0; i < 3; i++) {
            parts.configWindow.leftButtons[i].interact = true;
            parts.configWindow.rightButtons[i].interact = true;
            // メッセージスピード
            if (i === 0) {
                parts.configWindow.leftButtons[i].tap = function () {
                    var val = configUtil.getData('speed');
                    if (val > 1) {
                        configUtil.setData('speed', val - 1);
                        sounds.playSe('ボタン操作音');
                        reloadConfigParts();
                    }
                };
                parts.configWindow.rightButtons[i].tap = function () {
                    var val = configUtil.getData('speed');
                    if (val < 5) {
                        configUtil.setData('speed', val + 1);
                        sounds.playSe('ボタン操作音');
                        reloadConfigParts();
                    }
                };
            }
            else if (i === 1) {
                parts.configWindow.leftButtons[i].tap = function () {
                    var val = configUtil.getData('bgm');
                    if (val > 0) {
                        sounds.playSe('ボタン操作音');
                        configUtil.setData('bgm', val - 1);
                        sounds.setBgmVolume(val - 1);
                        reloadConfigParts();
                    }
                };
                parts.configWindow.rightButtons[i].tap = function () {
                    var val = configUtil.getData('bgm');
                    if (val < 5) {
                        sounds.playSe('ボタン操作音');
                        configUtil.setData('bgm', val + 1);
                        sounds.setBgmVolume(val);
                        reloadConfigParts();
                    }
                };
            }
            else if (i === 2) {
                parts.configWindow.leftButtons[i].tap = function () {
                    var val = configUtil.getData('se');
                    if (val > 0) {
                        sounds.playSe('ボタン操作音');
                        configUtil.setData('se', val - 1);
                        sounds.setSeVolume(val);
                        reloadConfigParts();
                    }
                };
                parts.configWindow.rightButtons[i].tap = function () {
                    var val = configUtil.getData('se');
                    if (val < 5) {
                        sounds.playSe('ボタン操作音');
                        configUtil.setData('se', val + 1);
                        sounds.setSeVolume(val + 1);
                        reloadConfigParts();
                    }
                };
            }
        }
        // 終了イベント設定
        var event = function () {
            sounds.playSe('ボタン操作音');
            for (var i = 0; i < 3; i++) {
                parts.configWindow.leftButtons[i].interact = false;
                parts.configWindow.rightButtons[i].interact = false;
            }
            parts.configWindow.okButton.interact = false;
            parts.configWindow.group.visible = false;
            configUtil.save();
            onClose();
        };
        parts.configWindow.okButton.tap = event;
    }
    common.showConfigWindow = showConfigWindow;
    // セーブウィンドウの初期化。一度だけ呼び出す
    function makeSaveWindowObject() {
        parts.saveWindow.mask = g.rectangle(640, 960, "black");
        parts.saveWindow.mask.alpha = 0.3;
        parts.saveWindow.body = g.sprite("images/saveWindow.png");
        parts.saveWindow.body.setPosition(50, 100);
        parts.saveWindow.title = g.text('', '38px mplus-1c-regular', 'white');
        parts.saveWindow.title.setPosition(82, 124);
        parts.saveWindow.closeButton = g.rectangle(80, 70, "white");
        parts.saveWindow.closeButton.setPosition(500, 110);
        parts.saveWindow.closeButton.alpha = 0;
        parts.saveWindow.group.addChild(parts.saveWindow.mask);
        parts.saveWindow.group.addChild(parts.saveWindow.body);
        parts.saveWindow.group.addChild(parts.saveWindow.title);
        parts.saveWindow.group.addChild(parts.saveWindow.closeButton);
        // スロットオブジェクト作成
        parts.saveWindow.slots = new Array(4);
        for (var i = 0; i < 4; i++) {
            parts.saveWindow.slots[i] = g.rectangle(480, 150, "green");
            parts.saveWindow.slots[i].setPosition(80, 200 + i * 160);
            parts.saveWindow.slots[i].alpha = 0.5;
            parts.saveWindow.group.addChild(parts.saveWindow.slots[i]);
        }
        // テキストオブジェクト作成
        parts.saveWindow.text = new Array(4);
        parts.saveWindow.time = new Array(4);
        for (var i = 0; i < 4; i++) {
            parts.saveWindow.text[i] = g.text('', '32px mplus-1c-regular', 'white');
            parts.saveWindow.text[i].setPosition(152, 230 + 160 * i);
            parts.saveWindow.group.addChild(parts.saveWindow.text[i]);
            parts.saveWindow.time[i] = g.text('', '32px mplus-1c-regular', 'white');
            parts.saveWindow.time[i].setPosition(192, 285 + 160 * i);
            parts.saveWindow.group.addChild(parts.saveWindow.time[i]);
        }
        parts.saveWindow.group.visible = false;
    }
    // 確認ダイアログの初期化。一度だけ呼び出す
    function makeConfirmDialogObject() {
        parts.confirmDialog.mask = g.rectangle(640, 960, "black");
        parts.confirmDialog.mask.alpha = 0.3;
        parts.confirmDialog.body = g.sprite("images/confirmWindow.png");
        parts.confirmDialog.body.setPivot(0.5, 0.5);
        parts.confirmDialog.body.setPosition(320, 480);
        parts.confirmDialog.title = g.text('', '38px mplus-1c-regular', 'white');
        parts.confirmDialog.title.setPosition(102, 354);
        parts.confirmDialog.text = g.text('', '32px mplus-1c-regular', 'white');
        parts.confirmDialog.text.setPosition(102, 424);
        parts.confirmDialog.group.addChild(parts.confirmDialog.text);
        parts.confirmDialog.okButton = g.sprite("button_ok.gif");
        parts.confirmDialog.okButton.setPivot(0.5, 0.5);
        parts.confirmDialog.okButton.setPosition(320, 580);
        parts.confirmDialog.group.addChild(parts.confirmDialog.mask);
        parts.confirmDialog.group.addChild(parts.confirmDialog.body);
        parts.confirmDialog.group.addChild(parts.confirmDialog.text);
        parts.confirmDialog.group.addChild(parts.confirmDialog.title);
        parts.confirmDialog.group.addChild(parts.confirmDialog.okButton);
        parts.confirmDialog.group.visible = false;
    }
    // Y/Nダイアログの初期化。一度だけ呼び出す
    function makeYesNoDialogObject() {
        parts.yesNoDialog.mask = g.rectangle(640, 960, "black");
        parts.yesNoDialog.mask.alpha = 0.3;
        parts.yesNoDialog.body = g.sprite("images/confirmWindow.png");
        parts.yesNoDialog.body.setPivot(0.5, 0.5);
        parts.yesNoDialog.body.setPosition(320, 480);
        parts.yesNoDialog.title = g.text('', '38px mplus-1c-regular', 'white');
        parts.yesNoDialog.title.setPosition(102, 354);
        parts.yesNoDialog.text = g.text('', '32px mplus-1c-regular', 'white');
        parts.yesNoDialog.text.setPosition(102, 424);
        parts.yesNoDialog.group.addChild(parts.yesNoDialog.text);
        parts.yesNoDialog.yesButton = g.sprite("button_yes.gif");
        parts.yesNoDialog.yesButton.setPivot(0.5, 0.5);
        parts.yesNoDialog.yesButton.setPosition(200, 580);
        parts.yesNoDialog.noButton = g.sprite("button_no.gif");
        parts.yesNoDialog.noButton.setPivot(0.5, 0.5);
        parts.yesNoDialog.noButton.setPosition(440, 580);
        parts.yesNoDialog.group.addChild(parts.yesNoDialog.mask);
        parts.yesNoDialog.group.addChild(parts.yesNoDialog.body);
        parts.yesNoDialog.group.addChild(parts.yesNoDialog.text);
        parts.yesNoDialog.group.addChild(parts.yesNoDialog.title);
        parts.yesNoDialog.group.addChild(parts.yesNoDialog.yesButton);
        parts.yesNoDialog.group.addChild(parts.yesNoDialog.noButton);
        parts.yesNoDialog.group.visible = false;
    }
    // 設定ウィンドウの初期化。一度だけ呼び出す
    function makeConfigWindowObject() {
        parts.configWindow.mask = g.rectangle(640, 960, "black");
        parts.configWindow.mask.alpha = 0.3;
        parts.configWindow.body = g.sprite("images/configWindow.png");
        parts.configWindow.body.setPivot(0.5, 0.5);
        parts.configWindow.body.setPosition(320, 480);
        parts.configWindow.title = g.text('設定', '38px mplus-1c-regular', 'white');
        parts.configWindow.title.setPosition(82, 228);
        parts.configWindow.okButton = g.sprite("button_ok.gif");
        parts.configWindow.okButton.setPivot(0.5, 0.5);
        parts.configWindow.okButton.setPosition(320, 690);
        parts.configWindow.group.addChild(parts.configWindow.mask);
        parts.configWindow.group.addChild(parts.configWindow.body);
        parts.configWindow.group.addChild(parts.configWindow.title);
        parts.configWindow.group.addChild(parts.configWindow.okButton);
        // テキストオブジェクト作成
        parts.configWindow.values = new Array(4);
        parts.configWindow.bars = new Array(4);
        //        parts.configWindow.controls = new Array(4);
        parts.configWindow.leftButtons = new Array(4);
        parts.configWindow.rightButtons = new Array(4);
        for (var i = 0; i < 3; i++) {
            parts.configWindow.values[i] = g.text('5', '42px mplus-1c-regular', 'white');
            parts.configWindow.values[i].setPivot(0.5, 0.5);
            parts.configWindow.values[i].setPosition(442, 325 + 110 * i);
            parts.configWindow.group.addChild(parts.configWindow.values[i]);
            parts.configWindow.bars[i] = g.sprite('config_bar.png');
            parts.configWindow.bars[i].setPivot(0, 0.5);
            parts.configWindow.bars[i].setPosition(120, 380 + 110 * i);
            parts.configWindow.group.addChild(parts.configWindow.bars[i]);
            parts.configWindow.leftButtons[i] = g.sprite('config_button_left.png');
            parts.configWindow.leftButtons[i].setPivot(0.5, 0.5);
            parts.configWindow.leftButtons[i].setPosition(365, 325 + 110 * i);
            parts.configWindow.group.addChild(parts.configWindow.leftButtons[i]);
            parts.configWindow.rightButtons[i] = g.sprite('config_button_right.png');
            parts.configWindow.rightButtons[i].setPivot(0.5, 0.5);
            parts.configWindow.rightButtons[i].setPosition(515, 325 + 110 * i);
            parts.configWindow.group.addChild(parts.configWindow.rightButtons[i]);
        }
        parts.configWindow.group.visible = false;
    }
    // 設定に合わせてバーを描画する
    function reloadConfigParts() {
        for (var i = 0; i < 3; i++) {
            parts.configWindow.bars[i].width =
                400 * (configUtil.getData(configUtil.keys[i]) / 5);
            //            parts.configWindow.controls[i].setPosition(
            //                90 + 100 * (configUtil.getData(configUtil.keys[i]) - 1), 380 + 110 * i
            //            );
            parts.configWindow.values[i].content = configUtil.getData(configUtil.keys[i]);
        }
    }
    common.reloadConfigParts = reloadConfigParts;
})(common || (common = {}));
var common;
(function (common) {
})(common || (common = {}));
var configUtil;
(function (configUtil) {
    var data;
    configUtil.keys = ['speed', 'bgm', 'se'];
    var CONFIGDATA_KEY_NAME = 'adv_configdata';
    function setup() {
        // データの読み込み
        try {
            var val = localStorage.getItem(CONFIGDATA_KEY_NAME);
            if (val === null) {
                data = makeInitData();
                localStorage.setItem(CONFIGDATA_KEY_NAME, JSON.stringify(data));
            }
            else if (val === '[object Object]') {
                throw new Error('config load error');
            }
            else {
                data = JSON.parse(val);
            }
            console.log('configdata loaded from localStorage.');
            console.log(data);
        }
        catch (e) {
            console.error('loading configdata failed.');
            console.error(e);
        }
        // 設定の反映
        sounds.setBgmVolume(configUtil.getData('bgm'));
        sounds.setSeVolume(configUtil.getData('se'));
    }
    configUtil.setup = setup;
    ;
    // データ取得
    function getData(key) {
        return data[key];
    }
    configUtil.getData = getData;
    // データ設定
    function setData(key, value) {
        data[key] = value;
    }
    configUtil.setData = setData;
    // データの保存
    function save() {
        localStorage.setItem(CONFIGDATA_KEY_NAME, JSON.stringify(data));
    }
    configUtil.save = save;
    // 初期値設定
    function makeInitData() {
        return {
            "speed": 3,
            "bgm": 3,
            "se": 3
        };
    }
})(configUtil || (configUtil = {}));
var g = hexi(640, 960, setup, assets, load);
var charactorConfig, backgroundConfig, settings;
g.backgroundColor = 0x000000;
g.scaleToWindow();
g.start();
// データロード中の処理
function load() {
    //  console.log(`loading: ${g.loadingFile}`); 
    //  console.log(`progress: ${g.loadingProgress}`);
    g.loadingBar();
}
// セットアップ関数
function setup() {
    // 音声データのセットアップ
    sounds.setup();
    common.bgm = g.sound('sounds/silent.mp3');
    // セーブデータ、設定データのセットアップ
    savedataUtil.setup();
    configUtil.setup();
    // 画像グループの作成
    makeGroups();
    // jsonファイルの読み込み
    getJsonFiles().done(function () {
        ;
        // 取得したデータを格納
        settings = arguments[0][0]; // 設定
        // シナリオファイルの読み込み
        getScenarioFiles().done(function () {
            // シナリオのセットアップ
            scenarios.setup(arguments);
            // 各画面のステートオブジェクト生成
            states.setup();
            // 共通部品のセットアップ
            common.parts.init();
            // メインループの設定
            g.state = loop;
            // オープニング画面に移行
            setState(states.openingState);
        })
            .fail(function (data) {
            console.error(data);
        });
    })
        .fail(function (data) {
        console.error(data);
    });
    function getJsonFiles() {
        // 設定ファイルを読み込む
        var reqList = [];
        for (var i = 0; i < jsons.length; i++) {
            reqList.push($.getJSON(jsons[i]));
        }
        return $.when.apply($, reqList);
    }
    function getScenarioFiles() {
        // 設定ファイルを読み込む
        var reqList = [];
        for (var i = 0; i < scenarioFiles.length; i++) {
            reqList.push($.ajax({
                url: scenarioFiles[i]
            }));
        }
        return $.when.apply($, reqList);
    }
}
// メインループ
function loop() {
    stateLoop();
    fadeLoop();
}
function stateLoop() { }
// ステートの設定
function setState(state) {
    state.init();
    stateLoop = state.loop;
}
// レイヤー代わりにグループ作成
function makeGroups() {
    opening.parts.group = g.group();
    title.parts.group = g.group();
    adv.parts.group = g.group();
    common.parts.saveWindow.group = g.group();
    common.parts.configWindow.group = g.group();
    common.parts.confirmDialog.group = g.group();
    common.parts.yesNoDialog.group = g.group();
    // マスクを一番上に置く
    common.parts.fadeMask = g.rectangle(640, 960, "black");
    common.parts.fadeMask.alpha = 0;
}
// フェードイン、アウト
var fadeInFlg, fadeOutFlg, fadeCounter, fadeTime, cb;
function fadeIn(time) {
    fadeInFlg = true;
    fadeCounter = 0;
    fadeTime = time;
    common.parts.fadeMask.alpha = 1;
}
function fadeOut(time, onEnd) {
    fadeOutFlg = true;
    fadeCounter = 0;
    fadeTime = time;
    cb = onEnd;
    common.parts.fadeMask.alpha = 0;
}
function fadeLoop() {
    if (fadeOutFlg) {
        fadeCounter += 1;
        common.parts.fadeMask.alpha = fadeCounter / fadeTime;
        if (fadeCounter >= fadeTime) {
            common.parts.fadeMask.alpha = 1;
            fadeOutFlg = false;
            cb();
        }
    }
    else if (fadeInFlg) {
        fadeCounter += 1;
        common.parts.fadeMask.alpha = 1 - fadeCounter / fadeTime;
        if (fadeCounter >= fadeTime) {
            common.parts.fadeMask.alpha = 0;
            fadeInFlg = false;
        }
    }
}
var savedataUtil;
(function (savedataUtil) {
    var data;
    var SAVEDATA_KEY_NAME = 'adv_savedata';
    function setup() {
        try {
            var val = localStorage.getItem(SAVEDATA_KEY_NAME);
            if (val === null) {
                data = makeEmptyData();
                localStorage.setItem(SAVEDATA_KEY_NAME, JSON.stringify(data));
            }
            else if (val === '[object Object]') {
                throw new Error('save error');
            }
            else {
                data = JSON.parse(val);
            }
            console.log('savedata loaded from localStorage.');
            console.log(data);
        }
        catch (e) {
            console.error('getting savedata failed.');
            console.error(e);
        }
    }
    savedataUtil.setup = setup;
    ;
    function getData() {
        return data;
    }
    savedataUtil.getData = getData;
    function save(slot) {
        var scenarioStr = adv.scenarioManager.getCurrentScenarioName();
        if (scenarioStr === undefined) {
            console.log('save failed.');
            return;
        }
        data[slot].scenario = scenarioStr;
        data[slot].sentence = adv.sentenceNum;
        var textStr = adv.getTopSentence();
        if (textStr === undefined) {
            console.log('save failed.');
            return;
        }
        if (textStr.length > 10)
            textStr = textStr.substring(0, 10) + '…';
        data[slot].text = textStr;
        var isoStr = new Date().toISOString();
        data[slot].time
            = isoStr.substring(0, 10) + ' ' + isoStr.substring(11, 19);
        data[slot].chara1 = adv.chara1Str;
        data[slot].chara2 = adv.chara2Str;
        data[slot].background = adv.backgroundStr;
        data[slot].bgm = adv.bgmStr;
        data[slot].talker = adv.parts.talker.content;
        data[slot].messages = new Array(4);
        for (var i = 0; i < 4; i++) {
            data[slot].messages[i] = adv.parts.messages[i].content;
        }
        localStorage.setItem(SAVEDATA_KEY_NAME, JSON.stringify(data));
        console.log('saved on slot' + slot + '.');
        console.log(getData());
    }
    savedataUtil.save = save;
    // セーブウィンドウにメッセージを格納
    function drawSavedata() {
        for (var i = 0; i < 4; i++) {
            common.parts.saveWindow.text[i].content = data[i + 1].text;
            common.parts.saveWindow.time[i].content = data[i + 1].time;
        }
    }
    savedataUtil.drawSavedata = drawSavedata;
    function makeEmptyData() {
        return {
            "1": {
                "scenario": "",
                "sentence": "",
                "text": "データがありません",
                "time": "",
                "chara1": "",
                "chara2": "",
                "background": "",
                "bgm": "",
                "talker": "",
                "messages": ["", "", "", ""]
            },
            "2": {
                "scenario": "",
                "sentence": "",
                "text": "データがありません",
                "time": "",
                "chara1": "",
                "chara2": "",
                "background": "",
                "bgm": "",
                "talker": "",
                "messages": ["", "", "", ""]
            },
            "3": {
                "scenario": "",
                "sentence": "",
                "text": "データがありません",
                "time": "",
                "chara1": "",
                "chara2": "",
                "background": "",
                "bgm": "",
                "talker": "",
                "messages": ["", "", "", ""]
            },
            "4": {
                "scenario": "",
                "sentence": "",
                "text": "データがありません",
                "time": "",
                "chara1": "",
                "chara2": "",
                "background": "",
                "bgm": "",
                "talker": "",
                "messages": ["", "", "", ""]
            }
        };
    }
})(savedataUtil || (savedataUtil = {}));
var adv;
(function (adv) {
    // シナリオを読み込む
    var ScenarioManager = (function () {
        function ScenarioManager() {
        }
        ScenarioManager.prototype.setScenario = function (name) {
            this.currentScenarioName = name;
            this.currentScenario = scenarios.list[name];
        };
        // 文章を取得する
        ScenarioManager.prototype.getSentence = function (id) {
            if (id >= this.currentScenario.length) {
                this.currentSentence = '';
            }
            else {
                console.log(this.currentScenario[id]);
                this.currentSentence = this.currentScenario[id];
            }
            return this.currentSentence;
        };
        // 現在のシナリオ名を取得する
        ScenarioManager.prototype.getCurrentScenarioName = function () {
            return this.currentScenarioName;
        };
        // 現在の文章を取得する
        ScenarioManager.prototype.getCurrentSentence = function () {
            return this.currentSentence;
        };
        return ScenarioManager;
    }());
    adv.ScenarioManager = ScenarioManager;
})(adv || (adv = {}));
var scenarios;
(function (scenarios) {
    scenarios.list = {};
    function setup(args) {
        var key, value;
        // シナリオファイルが一つの場合と2つ以上の場合で構造が異なるので、処理を分ける
        if (scenarioFiles.length === 1) {
            key = scenarioFiles[0].replace('scenarios/', '').replace('.txt', '');
            // 改行で分割して配列化
            var value_1 = args[0].split(/\r\n|\r|\n/);
            scenarios.list[key] = value_1;
        }
        else {
            for (var i = 0; i < scenarioFiles.length; i++) {
                var key_1 = scenarioFiles[i].replace('scenarios/', '').replace('.txt', '');
                // 改行で分割して配列化
                var value_2 = args[i][0].split(/\r\n|\r|\n/);
                scenarios.list[key_1] = value_2;
            }
        }
    }
    scenarios.setup = setup;
})(scenarios || (scenarios = {}));
var sounds;
(function (sounds) {
    function setup() {
        sounds.se = {
            '怪しい': g.sound('sounds/se_maoudamashii_onepoint13.mp3'),
            'ハテナ': g.sound('sounds/se_maoudamashii_onepoint25.mp3'),
            '呆然': g.sound('sounds/se_maoudamashii_system41.mp3'),
            'ピストル': g.sound('sounds/se_maoudamashii_battle_gun01.mp3'),
            'バッサリ': g.sound('sounds/se_maoudamashii_battle01.mp3'),
            'カーソル音': g.sound('sounds/button63.mp3'),
            'ボタン操作音': g.sound('sounds/button40.mp3'),
            'ひらめき': g.sound('sounds/Onmtp-Inspiration08-1.mp3'),
            '殴打': g.sound('sounds/se_maoudamashii_battle16.mp3'),
            '殴打２': g.sound('sounds/Hit01-2.mp3'),
            '手を叩く': g.sound('sounds/Clap01-1.mp3'),
            'キラリーン': g.sound('sounds/Shortbridge02-1.mp3'),
            'ガタン': g.sound('sounds/door-cl01.mp3'),
            'ドア': g.sound('sounds/door-cl02.mp3'),
            'ガーン': g.sound('sounds/se_maoudamashii_onepoint06.mp3')
        };
        sounds.bgm = {
            '不穏': g.sound('sounds/game_maoudamashii_6_dangeon09_fixed.mp3'),
            '安穏': g.sound('sounds/LovelyDay.mp3'),
            'Puzzle': g.sound('sounds/Puzzle.mp3'),
            'ドキュメンタリー': g.sound('sounds/Social_Documentary04.mp3'),
            '無音': g.sound('sounds/silent.mp3')
        };
        common.bgm = sounds.bgm['無音'];
        common.se = sounds.bgm['無音'];
    }
    sounds.setup = setup;
    // bgmを再生
    function playBgm(target) {
        common.bgm = sounds.bgm[target];
        common.bgm.loop = true;
        common.bgm.volume = configUtil.getData('bgm') / 5;
        common.bgm.playFrom(0);
    }
    sounds.playBgm = playBgm;
    // bgmを停止
    function stopBgm() {
        common.bgm.pause();
    }
    sounds.stopBgm = stopBgm;
    // bgmの音量を変更
    function setBgmVolume(value) {
        common.bgm.volume = value / 5;
    }
    sounds.setBgmVolume = setBgmVolume;
    // seの音量を変更
    function setSeVolume(value) {
        common.se.volume = value / 5;
    }
    sounds.setSeVolume = setSeVolume;
    // seを再生
    function playSe(target) {
        common.se = sounds.se[target];
        common.se.volume = configUtil.getData('se') / 5;
        common.se.play();
    }
    sounds.playSe = playSe;
})(sounds || (sounds = {}));
var states;
(function (states) {
    function setup() {
        states.advState = new adv.AdvState();
        states.titleState = new title.TitleState();
        states.openingState = new opening.OpeningState();
    }
    states.setup = setup;
})(states || (states = {}));
var adv;
(function (adv) {
    (function (Effect) {
        Effect[Effect["flash"] = false] = "flash";
        Effect[Effect["shake"] = false] = "shake";
        Effect[Effect["cutin"] = false] = "cutin";
        Effect[Effect["endroll"] = false] = "endroll";
    })(adv.Effect || (adv.Effect = {}));
    var Effect = adv.Effect;
    function setChara1(target) {
        adv.parts.chara1.show(adv.parts.chara1.status[target]);
    }
    adv.setChara1 = setChara1;
    function setChara2(target) {
        adv.parts.chara2.show(adv.parts.chara2.status[target]);
    }
    adv.setChara2 = setChara2;
    function setBackground(target) {
        if (target === '')
            adv.parts.background.show(0);
        else
            adv.parts.background.show(adv.parts.background.status[target]);
    }
    adv.setBackground = setBackground;
    function setBgm(target) {
        if (common.bgm)
            sounds.stopBgm();
        if (target !== '') {
            sounds.playBgm(target);
        }
    }
    adv.setBgm = setBgm;
    function setTalker(target) {
        adv.parts.talker.content = target;
    }
    adv.setTalker = setTalker;
    function setMessages(target) {
        for (var i = 0; i < 4; i++) {
            adv.parts.messages[i].content = target[i];
        }
    }
    adv.setMessages = setMessages;
    var AdvDrawer = (function () {
        function AdvDrawer() {
        }
        // ゲーム管理クラスから文章を受け取り、描画を開始する
        AdvDrawer.prototype.startDrawing = function (str) {
            // バッファにメッセージを格納する
            adv.messageBuffer = str;
            // コメント文の場合、falseを返して再送を依頼
            if (adv.messageBuffer.substring(0, 1) === '#') {
                return false;
            }
            //先頭にコマンドがある場合、処理を実行
            while (adv.messageBuffer.indexOf('<') === 0) {
                this.handleCommand();
            }
            // 「/」の有無で、文章の種類を判別
            if (adv.messageBuffer.indexOf('/') !== -1) {
                // メッセージを発言者と発言に分離する
                adv.parts.talker.content = adv.messageBuffer.substring(0, adv.messageBuffer.indexOf('/'));
                adv.messageBuffer = adv.messageBuffer.substring(adv.messageBuffer.indexOf('/') + 1, adv.messageBuffer.length);
            }
            else {
                // 発言者を空にする
                adv.parts.talker.content = '';
            }
            // メッセージのクリア
            for (var i = 0; i < 4; i++) {
                adv.parts.messages[i].content = '';
            }
            // メッセージ描画行を一行目に設定
            adv.line = 0;
            // 描画用カウンタを初期化
            adv.counter = 0;
            adv.effectCounter = 0;
            // フラグを初期化
            adv.drawStopped = false;
            // カウンタ目標時間を初期化
            adv.nextCount = 2;
            return true;
        };
        // メッセージ描画処理
        // ゲーム管理クラスのメインループから呼ばれる
        AdvDrawer.prototype.drawMessage = function () {
            // カウンタ処理
            adv.counter += 1;
            do {
                // 文字スピード最大の場合、強制文字送り
                if (configUtil.getData('speed') === 5)
                    adv.drawStopped = true;
                // 一定時間が経過したら、バッファから一文字ずつメッセージに加えていく
                // ただし、強制終了モードの場合は全文字の処理を行う
                if ((adv.drawStopped || adv.counter >= adv.nextCount) && adv.messageBuffer.length !== 0) {
                    // バッファから次の一文字を取得
                    adv.nextChar = adv.messageBuffer.substring(0, 1);
                    if (adv.nextChar === '\\') {
                        // バックスラッシュの場合、特殊記号なので次の文字に応じて処理を行う
                        adv.nextChar = adv.messageBuffer.substring(1, 2);
                        // \n 改行記号
                        if (adv.nextChar === 'n') {
                            // 改行を行う(下のメッセージボックスを描画対象にする)
                            adv.line += 1;
                            // 特殊記号をバッファから削除
                            adv.messageBuffer = adv.messageBuffer.substring(2, adv.messageBuffer.length);
                            // 再帰処理
                            this.drawMessage();
                        }
                    }
                    else if (adv.nextChar === '<') {
                        // 「<」の場合、コマンドなので切り抜いて処理を行う
                        this.handleCommand();
                        // 再帰処理
                        this.drawMessage();
                    }
                    else {
                        // カウンタリセット
                        adv.counter = 0;
                        // メッセージ追加
                        adv.parts.messages[adv.line].content += adv.nextChar;
                        // メッセージバッファから追加済み文字を削除
                        adv.messageBuffer = adv.messageBuffer.substring(1, adv.messageBuffer.length);
                        // メッセージの横幅が一定値以上の場合、改行
                        if (adv.parts.messages[adv.line].width > 580) {
                            adv.parts.messages[adv.line].content = adv.parts.messages[adv.line].content.substring(0, adv.parts.messages[adv.line].content.length - 1);
                            adv.line += 1;
                            adv.parts.messages[adv.line].content += adv.nextChar;
                        }
                        // 文字の種類によって、次の文字を表示するまでの間隔を変える
                        if (adv.nextChar === '、') {
                            adv.nextCount = 40 - configUtil.getData('speed') * 8;
                        }
                        else if (adv.nextChar === '。' || adv.nextChar === '…'
                            || adv.nextChar === '？' || adv.nextChar === '！') {
                            adv.nextCount = 60 - configUtil.getData('speed') * 10;
                        }
                        else {
                            adv.nextCount = 8 - configUtil.getData('speed') * 2;
                        }
                    }
                }
            } while (adv.drawStopped && adv.messageBuffer.length !== 0);
            // バッファの内容をすべて表示したら、待機モードに移行するためtrueを返して完了を通知する
            if (adv.messageBuffer.length === 0) {
                return true;
            }
            // 描画完了まではfalseを返す
            return false;
        };
        // エフェクト描画処理
        // ゲーム管理クラスのメインループから呼ばれる
        AdvDrawer.prototype.drawEffect = function () {
            // TODO エフェクト用のクラスを作る
            // エフェクト重複時、前のエフェクトを終了させないとまずい(フラッシュ用オブジェクトが残ったり？)
            // 論理名、フラグ、ループ内処理、終了時処理。
            // インスタンスを作成して配列に格納。
            // あと全エフェクト終了メソッドを作成
            // 戻り値変数 描画するものがない場合はtrueを返す
            var ret = true;
            // フラッシュ
            if (Effect.flash) {
                adv.effectCounter += 1;
                if (adv.effectCounter >= adv.effectCounterMax) {
                    adv.parts.colorMask.visible = false;
                    Effect.flash = false;
                }
                else {
                    adv.parts.colorMask.alpha = 1 - Math.abs(adv.effectCounter - 3) / 3;
                }
                ret = false;
            } // 振動
            if (Effect.shake) {
                adv.effectCounter += 1;
                if (adv.effectCounter >= adv.effectCounterMax) {
                    adv.parts.background.x = 0;
                    adv.parts.background.y = 60;
                    adv.parts.messageWindow.x = 0;
                    adv.parts.messageWindow.y = 600;
                    Effect.shake = false;
                }
                else {
                    adv.parts.background.x = 10 - g.randomInt(0, 20);
                    adv.parts.background.y = 70 - g.randomInt(0, 20);
                    adv.parts.messageWindow.x = 3 - g.randomInt(0, 3);
                    adv.parts.messageWindow.y = 603 - g.randomInt(0, 3);
                }
                ret = false;
            }
            // カットイン描画
            if (Effect.cutin) {
                var deleteFunc = function () {
                    adv.parts.cutinMessage.visible = false;
                    adv.parts.extraTapArea.interact = false;
                    adv.cutinCounter = 181;
                };
                adv.cutinCounter += 1;
                adv.parts.cutinMessageWindow.visible = true;
                // 表示アニメーション
                if (adv.cutinCounter <= 5) {
                    adv.parts.cutinMessageWindow.scale.x = adv.cutinCounter / 5;
                }
                else if (adv.cutinCounter <= 15) {
                    adv.parts.cutinMessageWindow.scale.y = 0.2 + (adv.cutinCounter - 5) / 10 * 0.8;
                }
                else if (adv.cutinCounter === 16) {
                    // 表示完了＋消去用イベント定義
                    adv.parts.cutinMessageWindow.scale.x = 1;
                    adv.parts.cutinMessageWindow.scale.y = 1;
                    adv.parts.cutinMessage.visible = true;
                    adv.parts.extraTapArea.interact = true;
                    // タップしたらウィンドウ消去イベント実行
                    adv.parts.extraTapArea.tap = deleteFunc;
                }
                else if (adv.cutinCounter === 180) {
                    // 一定時間経過後も消去イベント実行
                    deleteFunc();
                }
                else if (adv.cutinCounter > 180 && adv.cutinCounter <= 185) {
                    adv.parts.cutinMessageWindow.scale.y = 1 - (adv.cutinCounter - 180) / 5;
                }
                else if (adv.cutinCounter > 185) {
                    Effect.cutin = false;
                    adv.parts.cutinMessageWindow.visible = false;
                }
                ret = false;
            }
            // エンドロール
            if (Effect.endroll) {
                if (adv.effectCounter === 0) {
                    adv.parts.allMask.visible = true;
                    adv.parts.allMask.alpha = 0;
                    adv.endrollPics = [
                        'images/endroll_1.png',
                        'images/endroll_2.png'
                    ];
                    adv.endrollPicsIndex = 0;
                }
                adv.effectCounter += 1;
                console.log(adv.effectCounter);
                // 表示アニメーション
                if (adv.effectCounter <= 60) {
                    // フェードアウト（暗転）
                    adv.parts.allMask.alpha = adv.effectCounter / 60;
                }
                else if (adv.effectCounter === 61) {
                    // 画像をすべて表示したら終了
                    if (adv.endrollPics.length === adv.endrollPicsIndex) {
                        adv.parts.allPic.visible = false;
                        Effect.endroll = false;
                    }
                    else {
                        // フェードイン開始
                        adv.parts.allMask.alpha = 1;
                        adv.parts.allPic.visible = true;
                        adv.parts.allPic = g.sprite(adv.endrollPics[adv.endrollPicsIndex]);
                        adv.parts.allPic.alpha = 0;
                    }
                }
                else if (adv.effectCounter <= 120) {
                    // フェードイン（画像表示）
                    adv.parts.allPic.alpha = (adv.effectCounter - 60) / 60;
                }
                else if (adv.effectCounter <= 300) {
                }
                else if (adv.effectCounter <= 360) {
                    // フェードアウト
                    adv.parts.allPic.alpha = 1 - (adv.effectCounter - 300) / 60;
                }
                else if (adv.effectCounter == 361) {
                    adv.parts.allPic.alpha = 0;
                    adv.endrollPicsIndex += 1;
                    adv.effectCounter = 60;
                }
                ret = false;
            }
            return ret;
        };
        // 描画を強制終了
        AdvDrawer.prototype.endDrawing = function () {
            adv.drawStopped = true;
        };
        // バッファの先頭にあるコマンドを抽出、実行する
        AdvDrawer.prototype.handleCommand = function () {
            // エラーチェック
            if (adv.messageBuffer.indexOf('<') !== 0) {
                console.error('scenario error: \"<\" is not at top of arg');
                adv.messageBuffer = adv.messageBuffer.substring(1, adv.messageBuffer.length);
                return;
            }
            else if (adv.messageBuffer.indexOf('>') === -1) {
                console.error('scenario error: \">\" not found');
                adv.messageBuffer = adv.messageBuffer.substing(1, adv.messageBuffer.length);
                return;
            }
            // コマンドを抽出して保持
            var str = adv.messageBuffer.substring(1, adv.messageBuffer.indexOf('>'));
            // バッファからコマンドを削除
            adv.messageBuffer = adv.messageBuffer.substring(adv.messageBuffer.indexOf('>') + 1, adv.messageBuffer.length);
            // コマンド部(コロンより前)とターゲット部(コロンより後)に分離
            var cmd;
            var target;
            if (str.indexOf(':') === -1) {
                cmd = str;
                target = '';
            }
            else {
                cmd = str.substring(0, str.indexOf(':'));
                target = str.substring(str.indexOf(':') + 1, str.length);
            }
            switch (cmd) {
                case '左':
                    adv.chara1Str = target;
                    setChara1(target);
                    break;
                case '右':
                    adv.chara2Str = target;
                    setChara2(target);
                    break;
                case '効果':
                    if (target === 'フラッシュ') {
                        Effect.flash = true;
                        adv.parts.colorMask.visible = true;
                        adv.effectCounterMax = 6;
                        adv.parts.colorMask.y = 60;
                    }
                    else if (target === '振動') {
                        Effect.shake = true;
                        adv.effectCounterMax = 10;
                    }
                    console.log(target + '効果');
                    break;
                case '背景':
                    adv.backgroundStr = target;
                    setBackground(target);
                    break;
                case '文字カットイン':
                    Effect.cutin = true;
                    adv.parts.cutinMessageWindow.scale.x = 0;
                    adv.parts.cutinMessageWindow.scale.y = 0.2;
                    adv.parts.cutinMessageWindow.visible = true;
                    adv.parts.cutinMessage.content = target;
                    adv.parts.cutinMessage.setPosition(320 - adv.parts.cutinMessage.width / 2, 328 - adv.parts.cutinMessage.height / 2);
                    adv.parts.cutinMessageWindow.visible = false;
                    adv.cutinCounter = 0;
                    break;
                case '音':
                    if (sounds.se[target] === undefined) {
                        console.error('sound ' + target + ' not found.');
                    }
                    else {
                        sounds.playSe(target);
                    }
                    break;
                case '音楽':
                    adv.bgmStr = target;
                    if (target === '') {
                        sounds.stopBgm();
                    }
                    else if (sounds.bgm[target] === undefined) {
                        console.error('bgm ' + target + ' not found.');
                    }
                    else {
                        setBgm(target);
                    }
                    break;
                case 'エンドロール':
                    Effect.endroll = true;
                    break;
                case '終了':
                    adv.setEventsActivity(false);
                    common.showConfirmDialog('Thank you for playing!', 'タイトルに戻ります', function () {
                        adv.goTitle();
                    });
                    break;
            }
        };
        return AdvDrawer;
    }());
    adv.AdvDrawer = AdvDrawer;
})(adv || (adv = {}));
var adv;
(function (adv) {
    (function (Mode) {
        Mode[Mode["startAdv"] = 0] = "startAdv";
        Mode[Mode["standby"] = 1] = "standby";
        Mode[Mode["draw"] = 2] = "draw";
        Mode[Mode["load"] = 3] = "load";
        Mode[Mode["save"] = 4] = "save";
    })(adv.Mode || (adv.Mode = {}));
    var Mode = adv.Mode;
    // モードの設定
    function setMode(mode) {
        adv.currentMode = mode;
        adv.currentMode.init();
    }
    adv.setMode = setMode;
    ;
    // モードオブジェクトの生成
    function initMode() {
        Mode.draw = new DrawMode();
        Mode.standby = new StandbyMode();
        Mode.startAdv = new StartAdvMode();
        Mode.load = new LoadMode();
        Mode.save = new SaveMode();
    }
    adv.initMode = initMode;
    ;
    //ADV開始モード
    var StartAdvMode = (function () {
        function StartAdvMode() {
        }
        StartAdvMode.prototype.init = function () {
            console.log('mode:startAdv');
            // 一定時間、イベントを生成しない
            adv.setEventsActivity(false);
            adv.counter = 0;
        };
        StartAdvMode.prototype.loop = function () {
            adv.counter++;
            console.log(adv.counter);
            if (adv.counter > 15) {
                // イベントの設定
                // 各ボタンのタップイベント
                adv.setEventsActivity(true);
                // タイトルへ
                adv.parts.titleButton.tap = function () {
                    adv.setEventsActivity(false);
                    var onYes = function () {
                        if (common.bgm)
                            sounds.stopBgm();
                        fadeOut(60, function () {
                            fadeIn(60);
                            adv.goTitle();
                        });
                    };
                    var onNo = function () {
                        adv.setEventsActivity(true);
                    };
                    common.showYesNoDialog('タイトルに戻る', 'タイトルに戻ります。\nセーブしていないデータは\n失われます。', onYes, onNo);
                };
                // セーブ
                adv.parts.saveButton.tap = function () {
                    adv.setEventsActivity(false);
                    setMode(Mode.save);
                };
                // ロード
                adv.parts.loadButton.tap = function () {
                    adv.setEventsActivity(false);
                    setMode(Mode.load);
                };
                // 設定
                adv.parts.configButton.tap = function () {
                    // 設定ボタン
                    adv.setEventsActivity(false);
                    common.showConfigWindow(function () {
                        adv.setEventsActivity(true);
                    });
                };
                // 待機モードへ
                setMode(Mode.standby);
            }
        };
        return StartAdvMode;
    }());
    adv.StartAdvMode = StartAdvMode;
    // 描画モード
    var DrawMode = (function () {
        function DrawMode() {
        }
        DrawMode.prototype.init = function () {
            console.log('mode:drawing');
            // 次の文章を取得し、描画クラスに送る
            var sentence = adv.scenarioManager.getSentence(adv.sentenceNum);
            if (sentence !== '') {
                while (!adv.drawer.startDrawing(sentence)) {
                    adv.sentenceNum += 1;
                    sentence = adv.scenarioManager.getSentence(adv.sentenceNum);
                    if (sentence === '') {
                        break;
                    }
                }
            }
            // 画面がタップされたら、メッセージ描画を強制終了
            adv.parts.tapArea.tap = function () {
                console.log('tapped on draw mode');
                adv.parts.tapArea.interact = false;
                adv.drawer.endDrawing();
            };
        };
        DrawMode.prototype.loop = function () {
            // メッセージ描画処理
            if (adv.drawer.drawMessage() & adv.drawer.drawEffect()) {
                // 描画が終了した場合、スタンバイモードに移行
                adv.sentenceNum += 1;
                setMode(Mode.standby);
            }
        };
        return DrawMode;
    }());
    adv.DrawMode = DrawMode;
    // スタンバイモード
    var StandbyMode = (function () {
        function StandbyMode() {
        }
        StandbyMode.prototype.init = function () {
            console.log('mode:standby');
            adv.counter = 0;
            // イベントの活性化
            adv.setEventsActivity(true);
            // 画面タップイベントの作成
            adv.parts.tapArea.tap = function () {
                console.log('tapped on standby mode');
                adv.setEventsActivity(false);
                adv.parts.tapArea.interact = true;
                sounds.playSe('カーソル音');
                setMode(Mode.draw);
                adv.parts.nextIcon.visible = false;
            };
            // ページ送りアイコンの表示
            adv.parts.nextIcon.visible = true;
            adv.parts.nextIcon.setPosition(570, 880);
        };
        StandbyMode.prototype.loop = function () {
            adv.counter++;
            // 一定時間ごとに、カウンターを動かす
            if (adv.counter >= 60) {
                adv.parts.nextIcon.setPosition(570, 880);
                adv.counter = 0;
            }
            else if (adv.counter >= 30) {
                adv.parts.nextIcon.setPosition(570, 890);
            }
            // エフェクト描画中にスタンバイモードになった場合のために、エフェクト描画処理を行う
            adv.drawer.drawEffect();
        };
        return StandbyMode;
    }());
    adv.StandbyMode = StandbyMode;
    // セーブモード
    var SaveMode = (function () {
        function SaveMode() {
        }
        SaveMode.prototype.init = function () {
            // セーブウィンドウを表示させる
            var onTap = function (index) {
                // コールバックを定義して、YesNoダイアログを開く
                var onYes = function () {
                    savedataUtil.save(index);
                    common.closeSaveWindow();
                    common.showConfirmDialog('セーブ完了', 'セーブしました', function () {
                        setMode(Mode.standby);
                    });
                };
                var onNo = function () {
                    common.closeSaveWindow();
                    common.showSaveWindow(onTap, onClose);
                };
                common.showYesNoDialog('セーブ確認', 'スロット' + index + 'にセーブします。\nよろしいですか？', onYes, onNo);
            };
            var onClose = function () {
                adv.setEventsActivity(true);
                setMode(Mode.standby);
            };
            // ウィンドウ表示
            common.showSaveWindow(onTap, onClose);
        };
        SaveMode.prototype.loop = function () { };
        return SaveMode;
    }());
    adv.SaveMode = SaveMode;
    // ロードモード
    var LoadMode = (function () {
        function LoadMode() {
        }
        LoadMode.prototype.init = function () {
            // イベント定義
            var onTap = function (index) {
                // コールバックを定義して、YesNoダイアログを開く
                var onYes = function () {
                    adv.setEventsActivity(false);
                    fadeOut(60, function () {
                        fadeIn(60);
                        adv.selectedSavedata = index;
                        common.closeSaveWindow();
                        adv.reloadState();
                    });
                };
                var onNo = function () {
                    common.closeSaveWindow();
                    common.showLoadWindow(onTap, onClose);
                };
                common.showYesNoDialog('ロード確認', 'スロット' + index + 'をロードします。\nよろしいですか？', onYes, onNo);
            };
            var onClose = function () {
                adv.setEventsActivity(true);
                setMode(Mode.standby);
            };
            // ウィンドウ表示
            common.showLoadWindow(onTap, onClose);
        };
        LoadMode.prototype.loop = function () { };
        return LoadMode;
    }());
    adv.LoadMode = LoadMode;
})(adv || (adv = {}));
var adv;
(function (adv) {
    var parts;
    (function (parts) {
        function init() {
            // 背景画像
            parts.background = backgroundFactory.createSprite();
            parts.background.setPosition(-10, 50);
            parts.background.show(0);
            parts.group.addChild(parts.background);
            // メッセージウィンドウ、メニューバー
            parts.messageWindow = g.sprite("images/messageWindow.png");
            parts.messageWindow.setPosition(0, 600);
            parts.group.addChild(parts.messageWindow);
            parts.menuBar = g.sprite("images/menuBar.png");
            parts.menuBar.setPosition(0, 0);
            parts.group.addChild(parts.menuBar);
            // ボタン
            parts.titleButton = g.sprite("adv_button_1.gif");
            parts.titleButton.setPosition(8, 5);
            parts.group.addChild(parts.titleButton);
            parts.saveButton = g.sprite("adv_button_2.gif");
            parts.saveButton.setPosition(166, 5);
            parts.group.addChild(parts.saveButton);
            parts.loadButton = g.sprite("adv_button_3.gif");
            parts.loadButton.setPosition(324, 5);
            parts.group.addChild(parts.loadButton);
            parts.configButton = g.sprite("adv_button_4.gif");
            parts.configButton.setPosition(482, 5);
            parts.group.addChild(parts.configButton);
            // キャラクター画像
            parts.chara1 = charactorFactory.createSprite();
            parts.chara1.setPosition(30, 60);
            parts.chara1.alpha = 0.9;
            parts.chara1.show(0);
            parts.group.addChild(parts.chara1);
            parts.chara2 = charactorFactory.createSprite();
            parts.chara2.setPosition(380, 60);
            parts.chara2.alpha = 0.9;
            parts.chara2.show(0);
            parts.group.addChild(parts.chara2);
            // ローディング表示
            parts.loadingText = g.text("LOADING...", "38px mplus-1c-regular", "white");
            parts.loadingText.visible = false;
            parts.group.addChild(parts.loadingText);
            // キャラクター名
            parts.talker = g.text('', "42px mplus-1c-regular", "white");
            parts.talker.padding = 10;
            // TODO フォントにより最適な場所に配置
            parts.talker.setPosition(35, 622);
            parts.group.addChild(parts.talker);
            // メッセージ
            parts.messages = new Array(4);
            for (var i = 0; i < 4; i++) {
                parts.messages[i] = g.text('', "32px mplus-1c-regular", "white");
                parts.messages[i].setPosition(30, 705 + i * 60);
                parts.group.addChild(parts.messages[i]);
            }
            // メッセージボックスのアイコン
            parts.nextIcon = g.text("▼", "32px mplus-1c-regular", "white");
            parts.nextIcon.setPosition(570, 900);
            parts.nextIcon.visible = false;
            parts.group.addChild(parts.nextIcon);
            // オーバーレイウィンドウ
            parts.cutinMessageWindow = g.sprite("images/cutinMessageWindow.png");
            parts.cutinMessageWindow.anchor.x = 0.5;
            parts.cutinMessageWindow.anchor.y = 0.5;
            parts.cutinMessageWindow.setPosition(320, 330);
            parts.cutinMessageWindow.visible = false;
            parts.group.addChild(parts.cutinMessageWindow);
            parts.cutinMessage = g.text("", "32px mplus-1c-regular", "white");
            parts.cutinMessage.visible = false;
            parts.group.addChild(parts.cutinMessage);
            // 先送り用のタップエリア
            parts.tapArea = g.rectangle(640, 900, "white");
            parts.tapArea.setPosition(0, 60);
            parts.tapArea.alpha = 0;
            parts.group.addChild(parts.tapArea);
            // 別イベント定義用のタップエリア
            parts.extraTapArea = g.rectangle(640, 900, "white");
            parts.extraTapArea.setPosition(0, 60);
            parts.extraTapArea.alpha = 0;
            parts.extraTapArea.interact = false;
            parts.group.addChild(parts.extraTapArea);
            // エフェクト用のカラーマスク
            parts.colorMask = g.rectangle(640, 540, "white");
            parts.colorMask.alpha = 0;
            parts.group.addChild(parts.colorMask);
            // 全体画像
            parts.allPic = g.sprite("bg_black.png");
            parts.allPic.setPosition(0, 0);
            parts.allPic.alpha = 0;
            parts.group.addChild(parts.allPic);
            // 全体マスク
            parts.allMask = g.rectangle(640, 960, "black");
            parts.allMask.setPosition(0, 0);
            parts.allMask.alpha = 0;
            parts.group.addChild(parts.allMask);
            // グループを不可視に
            adv.parts.group.visible = false;
        }
        parts.init = init;
    })(parts = adv.parts || (adv.parts = {}));
})(adv || (adv = {}));
var adv;
(function (adv) {
    var AdvState = (function () {
        function AdvState() {
            // モードの作成
            adv.initMode();
            // TODO モジュールの作成  消す
            adv.drawer = new adv.AdvDrawer();
            adv.scenarioManager = new adv.ScenarioManager();
            // 共通描画要素の設定
            adv.parts.init();
        }
        // state開始時の処理
        AdvState.prototype.init = function () {
            // 変数の初期化
            adv.chara1Str = '';
            adv.chara2Str = '';
            adv.backgroundStr = '';
            adv.bgmStr = '';
            g.backgroundColor = 0x000000;
            // マスクの不可視化
            adv.parts.allMask.visible = false;
            // グループを不可視に
            // ADV画面表示
            adv.parts.group.visible = true;
            // 初期位置の設定・セーブデータのロード
            if (adv.selectedSavedata === -1) {
                adv.scenarioManager.setScenario('akuma_no_meishi');
                adv.sentenceNum = 0;
                adv.setChara1('');
                adv.setChara2('');
                adv.setBackground('');
                adv.setTalker('');
                adv.setMessages(['', '', '', '']);
            }
            else {
                var data = savedataUtil.getData();
                adv.scenarioManager.setScenario(data[adv.selectedSavedata].scenario);
                adv.sentenceNum = data[adv.selectedSavedata].sentence;
                adv.setChara1(data[adv.selectedSavedata].chara1);
                adv.setChara2(data[adv.selectedSavedata].chara2);
                adv.setBackground(data[adv.selectedSavedata].background);
                adv.setBgm(data[adv.selectedSavedata].bgm);
                adv.setTalker(data[adv.selectedSavedata].talker);
                adv.setMessages(data[adv.selectedSavedata].messages);
            }
            // 初期化モードに移行
            adv.setMode(adv.Mode.startAdv);
        };
        AdvState.prototype.loop = function () {
            adv.currentMode.loop();
        };
        return AdvState;
    }());
    adv.AdvState = AdvState;
    // 一番上のメッセージを取得する。セーブデータ用。
    function getTopSentence() {
        return adv.parts.messages[0].content;
    }
    adv.getTopSentence = getTopSentence;
    // イベントの有効・無効化
    function setEventsActivity(arg) {
        adv.parts.tapArea.interact = arg;
        adv.parts.titleButton.interact = arg;
        adv.parts.saveButton.interact = arg;
        adv.parts.loadButton.interact = arg;
        adv.parts.configButton.interact = arg;
    }
    adv.setEventsActivity = setEventsActivity;
    // タイトルに遷移
    function goTitle() {
        sounds.stopBgm();
        adv.parts.group.visible = false;
        setState(states.titleState);
    }
    adv.goTitle = goTitle;
    // ステート再読み込み
    function reloadState() {
        sounds.stopBgm();
        adv.parts.group.visible = false;
        setState(states.advState);
    }
    adv.reloadState = reloadState;
})(adv || (adv = {}));
var opening;
(function (opening) {
    (function (Mode) {
        Mode[Mode["start"] = 0] = "start";
        Mode[Mode["standby"] = 1] = "standby";
    })(opening.Mode || (opening.Mode = {}));
    var Mode = opening.Mode;
    function setMode(arg) {
        opening.currentMode = arg;
        opening.currentMode.init();
    }
    opening.setMode = setMode;
    ;
    // モードの作成、初期化
    function initMode() {
        Mode.standby = new StandbyMode();
        Mode.start = new StartMode();
        opening.currentMode = Mode.start;
    }
    opening.initMode = initMode;
    // スタンバイ
    var StandbyMode = (function () {
        function StandbyMode() {
        }
        StandbyMode.prototype.init = function () {
            counter = 0;
        };
        StandbyMode.prototype.loop = function () {
            counter++;
            if (counter > 60) {
                opening.parts.caution.interact = true;
                opening.parts.caution.tap = function () {
                    opening.parts.caution.interact = false;
                    opening.parts.group.visible = false;
                    setState(states.titleState);
                };
            }
        };
        return StandbyMode;
    }());
    opening.StandbyMode = StandbyMode;
    // 開始
    var StartMode = (function () {
        function StartMode() {
        }
        StartMode.prototype.init = function () {
            console.log('start adv mode');
            // イベント禁止
            g.pointer.tap = null;
            // フェードイン開始
            fadeIn(60);
            setMode(Mode.standby);
        };
        StartMode.prototype.loop = function () {
        };
        return StartMode;
    }());
    opening.StartMode = StartMode;
})(opening || (opening = {}));
var opening;
(function (opening) {
    var parts;
    (function (parts) {
        // 画面項目の設定
        function init() {
            parts.caution = g.sprite("images/caution.png");
            parts.caution.setPosition(0, 0);
            parts.group.addChild(parts.caution);
            parts.group.visible = true;
        }
        parts.init = init;
    })(parts = opening.parts || (opening.parts = {}));
})(opening || (opening = {}));
var opening;
(function (opening) {
    var OpeningState = (function () {
        function OpeningState() {
            // モードの作成、初期化
            opening.initMode();
        }
        OpeningState.prototype.init = function () {
            // 画面項目の作成
            opening.parts.init();
            // モード設定
            opening.setMode(opening.Mode.start);
        };
        OpeningState.prototype.loop = function () {
            opening.currentMode.loop();
        };
        return OpeningState;
    }());
    opening.OpeningState = OpeningState;
})(opening || (opening = {}));
var title;
(function (title) {
    (function (Mode) {
        Mode[Mode["standby"] = 0] = "standby";
        Mode[Mode["load"] = 1] = "load";
        Mode[Mode["startAdv"] = 2] = "startAdv";
    })(title.Mode || (title.Mode = {}));
    var Mode = title.Mode;
    function setMode(arg) {
        title.currentMode = arg;
        title.currentMode.init();
    }
    title.setMode = setMode;
    ;
    // モードの作成、初期化
    function initMode() {
        Mode.standby = new StandbyMode();
        Mode.startAdv = new StartAdvMode();
        Mode.load = new LoadMode();
        title.currentMode = Mode.standby;
    }
    title.initMode = initMode;
    var StandbyMode = (function () {
        function StandbyMode() {
        }
        StandbyMode.prototype.init = function () {
            // 画面表示
            title.parts.group.visible = true;
            // ＊＊＊＊＊イベントの設定
            // スタートボタン
            title.parts.startButton.interact = true;
            if (!title.parts.startButton.tap)
                title.parts.startButton.tap = function () {
                    title.setEventsActivity(false);
                    adv.selectedSavedata = -1;
                    setMode(Mode.startAdv);
                };
            // ロードボタン
            title.parts.loadButton.interact = true;
            if (!title.parts.loadButton.tap)
                title.parts.loadButton.tap = function () {
                    title.setEventsActivity(false);
                    setMode(Mode.load);
                };
            // 設定ボタン
            title.parts.configButton.interact = true;
            if (!title.parts.configButton.tap)
                title.parts.configButton.tap = function () {
                    title.setEventsActivity(false);
                    common.showConfigWindow(function () {
                        title.setEventsActivity(true);
                    });
                };
        };
        StandbyMode.prototype.loop = function () { };
        return StandbyMode;
    }());
    title.StandbyMode = StandbyMode;
    // つづきから
    var LoadMode = (function () {
        function LoadMode() {
        }
        LoadMode.prototype.init = function () {
            // イベント定義
            var onTap = function (index) {
                // コールバックを定義して、YesNoダイアログを開く
                var onYes = function () {
                    adv.selectedSavedata = index;
                    title.parts.startButton.interact = false;
                    title.parts.loadButton.interact = false;
                    setMode(Mode.startAdv);
                };
                var onNo = function () {
                    common.closeSaveWindow();
                    common.showLoadWindow(onTap, onClose);
                };
                common.showYesNoDialog('ロード確認', 'スロット' + index + 'をロードします。\nよろしいですか？', onYes, onNo);
            };
            var onClose = function () {
                setMode(Mode.standby);
            };
            // ウィンドウ表示
            common.showLoadWindow(onTap, onClose);
        };
        LoadMode.prototype.loop = function () { };
        return LoadMode;
    }());
    title.LoadMode = LoadMode;
    // ADV画面開始
    var StartAdvMode = (function () {
        function StartAdvMode() {
        }
        StartAdvMode.prototype.init = function () {
            console.log('start adv mode');
            // イベント禁止
            g.pointer.tap = null;
            // フェードアウト開始
            fadeOut(60, function () {
                // フェードアウト完了後、フェードインを呼び出し、ADV画面に遷移
                title.parts.group.visible = false;
                common.closeSaveWindow();
                fadeIn(60);
                setState(states.advState);
            });
        };
        StartAdvMode.prototype.loop = function () {
        };
        return StartAdvMode;
    }());
    title.StartAdvMode = StartAdvMode;
})(title || (title = {}));
var title;
(function (title_1) {
    var parts;
    (function (parts) {
        // 画面項目の設定
        function init() {
            //            parts.title = g.text('悪魔の名刺', '56px mplus-1c-regular', 'white');
            //            parts.title.setPosition((640 - parts.title.width) / 2 ,250);
            parts.title = g.sprite("images/title.png");
            parts.title.setPosition(0, 0);
            parts.startButton = g.sprite("title_button_1.gif");
            parts.startButton.setPosition((640 - parts.startButton.width) / 2, 480);
            parts.loadButton = g.sprite("title_button_2.gif");
            parts.loadButton.setPosition((640 - parts.loadButton.width) / 2, 600);
            parts.configButton = g.sprite("title_button_3.gif");
            parts.configButton.setPosition((640 - parts.configButton.width) / 2, 720);
            parts.group.addChild(parts.title);
            parts.group.addChild(parts.startButton);
            parts.group.addChild(parts.loadButton);
            parts.group.addChild(parts.configButton);
            parts.sprites = [];
            parts.sprites.push(parts.group);
            parts.group.visible = true;
            // BGMの再生
            //    let music = g.sound("sounds/bgm_maoudamashii_acoustic07.ogg");
            //    music.loop = true;
            //    music.play();
        }
        parts.init = init;
    })(parts = title_1.parts || (title_1.parts = {}));
})(title || (title = {}));
var title;
(function (title) {
    var TitleState = (function () {
        function TitleState() {
            // モードの作成、初期化
            title.initMode();
        }
        TitleState.prototype.init = function () {
            // 画面項目の作成
            title.parts.init();
            // モード設定
            title.setMode(title.Mode.standby);
        };
        TitleState.prototype.loop = function () {
            title.currentMode.loop();
        };
        return TitleState;
    }());
    title.TitleState = TitleState;
    function setEventsActivity(arg) {
        title.parts.startButton.interact = arg;
        title.parts.loadButton.interact = arg;
        title.parts.configButton.interact = arg;
    }
    title.setEventsActivity = setEventsActivity;
})(title || (title = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy50cyIsImJhY2tncm91bmRGYWN0b3J5LnRzIiwiY2hhcmFjdG9yRmFjdG9yeS50cyIsImNvbW1vblBhcnRzLnRzIiwiY29tbW9uVmFyaWFibGVzLnRzIiwiY29uZmlnVXRpbC50cyIsImdhbWUudHMiLCJzYXZlZGF0YVV0aWwudHMiLCJzY2VuYXJpb01hbmFnZXIudHMiLCJzY2VuYXJpb3MudHMiLCJzb3VuZHMudHMiLCJzdGF0ZXMudHMiLCJhZHYvYWR2RHJhd2VyLnRzIiwiYWR2L2Fkdk1vZGVzLnRzIiwiYWR2L2FkdlBhcnRzLnRzIiwiYWR2L2FkdlN0YXRlLnRzIiwib3BlbmluZy9vcGVuaW5nTW9kZXMudHMiLCJvcGVuaW5nL29wZW5pbmdQYXJ0cy50cyIsIm9wZW5pbmcvb3BlbmluZ1N0YXRlLnRzIiwidGl0bGUvdGl0bGVNb2Rlcy50cyIsInRpdGxlL3RpdGxlUGFydHMudHMiLCJ0aXRsZS90aXRsZVN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksTUFBTSxHQUFHO0lBQ1gseUJBQXlCO0lBQ3pCLHdCQUF3QjtJQUN4QixxQkFBcUI7SUFDckIsb0JBQW9CO0lBQ3BCLG9CQUFvQjtJQUNwQix3QkFBd0I7SUFDeEIsdUJBQXVCO0lBQ3ZCLHlCQUF5QjtJQUN6QiwwQkFBMEI7SUFDMUIsK0JBQStCO0lBQy9CLHNCQUFzQjtJQUN0QixzQkFBc0I7SUFDdEIsb0JBQW9CO0lBQ3BCLDZCQUE2QjtJQUM3QiwwQkFBMEI7SUFDMUIsdUJBQXVCO0lBQ3ZCLGtCQUFrQjtJQUNsQixxQkFBcUI7SUFDckIscUJBQXFCO0lBQ3JCLHFCQUFxQjtJQUNyQixzQkFBc0I7SUFDdEIsc0JBQXNCO0lBQ3RCLGdEQUFnRDtJQUNoRCxvQkFBb0I7SUFDcEIsc0JBQXNCO0lBQ3RCLGtDQUFrQztJQUNsQyxtQkFBbUI7SUFDbkIseUNBQXlDO0lBQ3pDLHFDQUFxQztJQUNyQyxxQ0FBcUM7SUFDckMsdUNBQXVDO0lBQ3ZDLHVDQUF1QztJ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LElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDMUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMzQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSx1QkFBdUIsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN0RSxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQzNDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1RCxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25ELEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDdkMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUQsZUFBZTtRQUNmLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFD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QUNsRCxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1RCxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvRCxlQUFlO1FBQ2YsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0MscURBQXFEO1FBQzdDLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBWSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDeEIsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsdUJBQXVCLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDN0UsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNoRCxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0QsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEUsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3hELEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDNUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNELEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlELEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUN2RSxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3JELEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNsRSxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxD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QUFJLEdBQUo7WUFDSSxVQUFVO1lBQ1YsV0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2IsUUFBUTtZQUNSLGFBQU8sQ0FBQyxVQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUIsQ0FBQztRQUNELHlCQUFJLEdBQUo7WUFDSSxpQkFBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFDTCxpQkFBQztJQUFELENBZEEsQUFjQyxJQUFBO0lBZFksZ0JBQVUsYUFjdEIsQ0FBQTtJQUVELDJCQUFrQyxHQUFXO1FBQ3pDLFdBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNqQyxXQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDaEMsV0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO0lBQ3RDLENBQUM7SUFKZSx1QkFBaUIsb0JBSWhDLENBQUE7QUFDTCxDQUFDLEVBdEJTLEtBQUssS0FBTCxLQUFLLFFBc0JkIiwiZmlsZSI6Im91dHB1dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBhc3NldHMgPSBbXHJcbiAgJ2ltYWdlcy9iYWNrZ3JvdW5kcy5qc29uJyxcclxuICAnaW1hZ2VzL2JhY2tncm91bmRzLnBuZycsXHJcbiAgJ2ltYWdlcy9idXR0b25zLmpzb24nLFxyXG4gICdpbWFnZXMvYnV0dG9ucy5wbmcnLFxyXG4gICdpbWFnZXMvY2F1dGlvbi5wbmcnLFxyXG4gICdpbWFnZXMvY2hhcmFjdG9ycy5qc29uJyxcclxuICAnaW1hZ2VzL2NoYXJhY3RvcnMucG5nJyxcclxuICAnaW1hZ2VzL2NvbmZpZ1dpbmRvdy5wbmcnLFxyXG4gICdpbWFnZXMvY29uZmlybVdpbmRvdy5wbmcnLFxyXG4gICdpbWFnZXMvY3V0aW5NZXNzYWdlV2luZG93LnBuZycsXHJcbiAgJ2ltYWdlcy9lbmRyb2xsXzEucG5nJyxcclxuICAnaW1hZ2VzL2VuZHJvbGxfMi5wbmcnLFxyXG4gICdpbWFnZXMvbWVudUJhci5wbmcnLFxyXG4gICdpbWFnZXMvbWVzc2FnZVdpbmRvd19iay5wbmcnLFxyXG4gICdpbWFnZXMvbWVzc2FnZVdpbmRvdy5wbmcnLFxyXG4gICdpbWFnZXMvc2F2ZVdpbmRvdy5wbmcnLFxyXG4gICdpbWFnZXMvdGl0bGUucG5nJyxcclxuICAnc291bmRzL2J1dHRvbjQwLm1wMycsXHJcbiAgJ3NvdW5kcy9idXR0b242My5tcDMnLFxyXG4gICdzb3VuZHMvQ2xhcDAxLTEubXAzJyxcclxuICAnc291bmRzL2Rvb3ItY2wwMS5tcDMnLFxyXG4gICdzb3VuZHMvZG9vci1jbDAyLm1wMycsXHJcbiAgJ3NvdW5kcy9nYW1lX21hb3VkYW1hc2hpaV82X2Rhbmdlb24wOV9maXhlZC5tcDMnLFxyXG4gICdzb3VuZHMvSGl0MDEtMi5tcDMnLFxyXG4gICdzb3VuZHMvTG92ZWx5RGF5Lm1wMycsXHJcbiAgJ3NvdW5kcy9Pbm10cC1JbnNwaXJhdGlvbjA4LTEubXAzJyxcclxuICAnc291bmRzL1B1enpsZS5tcDMnLFxyXG4gICdzb3VuZHMvc2VfbWFvdWRhbWFzaGlpX2JhdHRsZV9ndW4wMS5tcDMnLFxyXG4gICdzb3VuZHMvc2VfbWFvdWRhbWFzaGlpX2JhdHRsZTAxLm1wMycsXHJcbiAgJ3NvdW5kcy9zZV9tYW91ZGFtYXNoaWlfYmF0dGxlMTYubXAzJyxcclxuICAnc291bmRzL3NlX21hb3VkYW1hc2hpaV9vbmVwb2ludDA2Lm1wMycsXHJcbiAgJ3NvdW5kcy9zZV9tYW91ZGFtYXNoaWlfb25lcG9pbnQxMy5tcDMnLFxyXG4gICdzb3VuZHMvc2VfbWFvdWRhbWFzaGlpX29uZXBvaW50MjUubXAzJyxcclxuICAnc291bmRzL3NlX21hb3VkYW1hc2hpaV9zeXN0ZW00MS5tcDMnLFxyXG4gICdzb3VuZHMvU2hvcnRicmlkZ2UwMi0xLm1wMycsXHJcbiAgJ3NvdW5kcy9zaWxlbnQubXAzJyxcclxuICAnc291bmRzL1NvY2lhbF9Eb2N1bWVudGFyeTA0Lm1wMycsXHJcbiAgJ2ZvbnRzL21wbHVzLTFjLXJlZ3VsYXIudHRmJ1xyXG5dXHJcbmxldCBzY2VuYXJpb0ZpbGVzID0gW1xyXG4gICdzY2VuYXJpb3MvYWt1bWFfbm9fbWVpc2hpLnR4dCdcclxuXVxyXG5sZXQganNvbnMgPSBbXHJcbiAgJ2pzb25zLzFfc2V0dGluZ3MuanNvbidcclxuXVxyXG4iLCJuYW1lc3BhY2UgYmFja2dyb3VuZEZhY3Rvcnkge1xyXG4gICAgbGV0IGxpc3QgPSB7XHJcbiAgICAgICAgXCLnl4XlrqRcIjp7XCJpbWFnZVwiOiBcImJnX2hvc3BpdGFsX3Jvb20ucG5nXCJ9LFxyXG4gICAgICAgIFwi546E6ZaiXCI6e1wiaW1hZ2VcIjogXCJiZ19ob3VzZS5wbmdcIn0sXHJcbiAgICAgICAgXCLnvo7ooZPlrqRcIjp7XCJpbWFnZVwiOiBcImJnX2FydF9yb29tLnBuZ1wifSxcclxuICAgICAgICBcIuODgOOCpOODi+ODs+OCsFwiOntcImltYWdlXCI6IFwiYmdfZGluaW5nLnBuZ1wifSxcclxufVxyXG4gICAgLy8g44Kt44Oj44Op44Kv44K/44O8U3ByaXRl44KS5L2c5oiQ44GX44Gm6L+U44GZXHJcbiAgICAvLyDkvb/jgYTmlrk6IHNwcml0ZS5zaG93KHNwcml0ZS5zdGF0dXNba2V5XSk7XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlU3ByaXRlKCl7XHJcbiAgICAgICAgbGV0IHNwcml0ZTtcclxuICAgICAgICBsZXQgaW1hZ2VzID0gWydkdW1teUNoYXJhLnBuZyddO1xyXG4gICAgICAgIGxldCBzdGF0dXMgPSB7JycgOiAwfTtcclxuICAgICAgICBrZXlzID0gT2JqZWN0LmtleXMobGlzdCk7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpbWFnZXMucHVzaChsaXN0W2tleXNbaV1dLmltYWdlKTtcclxuICAgICAgICAgICAgc3RhdHVzW2tleXNbaV1dID0gaSArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNwcml0ZSA9IGcuc3ByaXRlKGltYWdlcyk7XHJcbiAgICAgICAgc3ByaXRlLnN0YXR1cyA9IHN0YXR1cztcclxuICAgICAgICByZXR1cm4gc3ByaXRlO1xyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIGNoYXJhY3RvckZhY3Rvcnkge1xyXG4gICAgbGV0IGxpc3QgPSB7XHJcbiAgICAgICAgXCLmrabnlLBcIjp7XCJpbWFnZVwiOiBcInRha2VkYS5wbmdcIn0sXHJcbiAgICAgICAgXCLpiLTmnKhcIjp7XCJpbWFnZVwiOiBcInN1enVraS5wbmdcIn0sXHJcbiAgICAgICAgXCLmtannvo5cIjp7XCJpbWFnZVwiOiBcImhpcm9taS5wbmdcIn1cclxuICAgIH1cclxuICAgIC8vIOOCreODo+ODqeOCr+OCv+ODvFNwcml0ZeOCkuS9nOaIkOOBl+OBpui/lOOBmVxyXG4gICAgLy8g5L2/44GE5pa5OiBzcHJpdGUuc2hvdyhzcHJpdGUuc3RhdHVzW2tleV0pO1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNwcml0ZSgpe1xyXG4gICAgICAgIGxldCBzcHJpdGU7XHJcbiAgICAgICAgbGV0IGltYWdlcyA9IFsnZHVtbXlDaGFyYS5wbmcnXTtcclxuICAgICAgICBsZXQgc3RhdHVzID0geycnIDogMH07XHJcbiAgICAgICAga2V5cyA9IE9iamVjdC5rZXlzKGxpc3QpO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaW1hZ2VzLnB1c2gobGlzdFtrZXlzW2ldXS5pbWFnZSk7XHJcbiAgICAgICAgICAgIHN0YXR1c1trZXlzW2ldXSA9IGkgKyAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzcHJpdGUgPSBnLnNwcml0ZShpbWFnZXMpO1xyXG4gICAgICAgIHNwcml0ZS5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICAgICAgcmV0dXJuIHNwcml0ZTtcclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBjb21tb257XHJcbiAgICBleHBvcnQgbmFtZXNwYWNlIHBhcnRzIHtcclxuICAgICAgICAvLyDjgrvjg7zjg5bjgqbjgqPjg7Pjg4njgqZcclxuICAgICAgICBleHBvcnQgbmFtZXNwYWNlIHNhdmVXaW5kb3cge1xyXG4gICAgICAgICAgICBleHBvcnQgbGV0XHJcbiAgICAgICAgICAgICAgICBib2R5LFxyXG4gICAgICAgICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBjbG9zZUJ1dHRvbixcclxuICAgICAgICAgICAgICAgIHRleHQsXHJcbiAgICAgICAgICAgICAgICB0aW1lLFxyXG4gICAgICAgICAgICAgICAgbWFzayxcclxuICAgICAgICAgICAgICAgIHNsb3RzLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g56K66KqN44OA44Kk44Ki44Ot44KwXHJcbiAgICAgICAgZXhwb3J0IG5hbWVzcGFjZSBjb25maXJtRGlhbG9nIHtcclxuICAgICAgICAgICAgZXhwb3J0IGxldFxyXG4gICAgICAgICAgICAgICAgYm9keSxcclxuICAgICAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b24sXHJcbiAgICAgICAgICAgICAgICB0ZXh0LFxyXG4gICAgICAgICAgICAgICAgbWFzayxcclxuICAgICAgICAgICAgICAgIGdyb3VwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFkvTuODgOOCpOOCouODreOCsFxyXG4gICAgICAgIGV4cG9ydCBuYW1lc3BhY2UgeWVzTm9EaWFsb2cge1xyXG4gICAgICAgICAgICBleHBvcnQgbGV0XHJcbiAgICAgICAgICAgICAgICBib2R5LFxyXG4gICAgICAgICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICAgICAgICB5ZXNCdXR0b24sXHJcbiAgICAgICAgICAgICAgICBub0J1dHRvbixcclxuICAgICAgICAgICAgICAgIHRleHQsXHJcbiAgICAgICAgICAgICAgICBtYXNrLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g6Kit5a6a44OA44Kk44Ki44Ot44KwXHJcbiAgICAgICAgZXhwb3J0IG5hbWVzcGFjZSBjb25maWdXaW5kb3cge1xyXG4gICAgICAgICAgICBleHBvcnQgbGV0XHJcbiAgICAgICAgICAgICAgICBib2R5LFxyXG4gICAgICAgICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBva0J1dHRvbixcclxuICAgICAgICAgICAgICAgIHZhbHVlcyxcclxuICAgICAgICAgICAgICAgIGJhcnMsXHJcbiAgICAgICAgICAgICAgICBjb250cm9scyxcclxuICAgICAgICAgICAgICAgIG1hc2ssXHJcbiAgICAgICAgICAgICAgICBsZWZ0QnV0dG9ucyxcclxuICAgICAgICAgICAgICAgIHJpZ2h0QnV0dG9ucyxcclxuICAgICAgICAgICAgICAgIGdyb3VwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOODleOCp+ODvOODieOCpOODs+eUqOODnuOCueOCr1xyXG4gICAgICAgIGV4cG9ydCBsZXQgZmFkZU1hc2s7XHJcblxyXG4gICAgICAgIC8vIOeUu+mdoumgheebruOBruioreWumlxyXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICBtYWtlU2F2ZVdpbmRvd09iamVjdCgpO1xyXG4gICAgICAgICAgICBtYWtlQ29uZmlybURpYWxvZ09iamVjdCgpO1xyXG4gICAgICAgICAgICBtYWtlWWVzTm9EaWFsb2dPYmplY3QoKTtcclxuICAgICAgICAgICAgbWFrZUNvbmZpZ1dpbmRvd09iamVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDjgrvjg7zjg5bjgqbjgqPjg7Pjg4njgqbooajnpLpcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBzaG93U2F2ZVdpbmRvdyhvblRhcCwgb25DbG9zZSkge1xyXG4gICAgICAgIHNvdW5kcy5wbGF5U2UoJ+ODnOOCv+ODs+aTjeS9nOmfsycpO1xyXG4gICAgICAgIHBhcnRzLnNhdmVXaW5kb3cuZ3JvdXAudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgcGFydHMuc2F2ZVdpbmRvdy50aXRsZS5jb250ZW50ID0gJ+OCu+ODvOODlic7XHJcbiAgICAgICAgZHJhd1NhdmVkYXRhKCk7XHJcbiAgICAgICAgcGFydHMuc2F2ZVdpbmRvdy5jbG9zZUJ1dHRvbi5pbnRlcmFjdCA9IHRydWU7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDQ7IGkrKyl7XHJcbiAgICAgICAgICAgIHBhcnRzLnNhdmVXaW5kb3cuc2xvdHNbaV0uaW50ZXJhY3QgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDjgrnjg63jg4Pjg4jjga7jgr/jg4Pjg5fjgqTjg5njg7Pjg4joqK3lrppcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNDsgaSsrKXtcclxuICAgICAgICAgICAgcGFydHMuc2F2ZVdpbmRvdy5zbG90c1tpXS5pbnRlcmFjdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHBhcnRzLnNhdmVXaW5kb3cuc2xvdHNbaV0uc2xvdCA9IGkrMTtcclxuICAgICAgICAgICAgcGFydHMuc2F2ZVdpbmRvdy5zbG90c1tpXS50YXAgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzbG90JyArIHBhcnRzLnNhdmVXaW5kb3cuc2xvdHNbaV0uc2xvdCArICcgc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA0OyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRzLnNhdmVXaW5kb3cuc2xvdHNbaV0uaW50ZXJhY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBhcnRzLnNhdmVXaW5kb3cuY2xvc2VCdXR0b24uaW50ZXJhY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIG9uVGFwKHBhcnRzLnNhdmVXaW5kb3cuc2xvdHNbaV0uc2xvdCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcocGFydHMuc2F2ZVdpbmRvdy5zbG90c1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOe1guS6huOCpOODmeODs+ODiOioreWumlxyXG4gICAgICAgIHBhcnRzLnNhdmVXaW5kb3cuY2xvc2VCdXR0b24udGFwID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA0OyBpKyspe1xyXG4gICAgICAgICAgICAgICAgcGFydHMuc2F2ZVdpbmRvdy5zbG90c1tpXS5pbnRlcmFjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBhcnRzLnNhdmVXaW5kb3cuY2xvc2VCdXR0b24uaW50ZXJhY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2xvc2VTYXZlV2luZG93KCk7XHJcbiAgICAgICAgICAgIG9uQ2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g44Ot44O844OJ44Km44Kj44Oz44OJ44Km6KGo56S6XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gc2hvd0xvYWRXaW5kb3cob25UYXAsIG9uQ2xvc2UpIHtcclxuICAgICAgICBzb3VuZHMucGxheVNlKCfjg5zjgr/jg7Pmk43kvZzpn7MnKTtcclxuICAgICAgICBwYXJ0cy5zYXZlV2luZG93Lmdyb3VwLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHBhcnRzLnNhdmVXaW5kb3cudGl0bGUuY29udGVudCA9ICfjg63jg7zjg4knO1xyXG4gICAgICAgIGRyYXdTYXZlZGF0YSgpO1xyXG4gICAgICAgIHBhcnRzLnNhdmVXaW5kb3cuY2xvc2VCdXR0b24uaW50ZXJhY3QgPSB0cnVlO1xyXG4gICAgICAgIC8vIOOCueODreODg+ODiOOBruOCv+ODg+ODl+OCpOODmeODs+ODiOioreWumlxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA0OyBpKyspe1xyXG4gICAgICAgICAgICBwYXJ0cy5zYXZlV2luZG93LnNsb3RzW2ldLmludGVyYWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgcGFydHMuc2F2ZVdpbmRvdy5zbG90c1tpXS5zbG90ID0gaSsxO1xyXG4gICAgICAgICAgICBwYXJ0cy5zYXZlV2luZG93LnNsb3RzW2ldLnRhcCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgLy8g44K744O844OW44OH44O844K/44GM5a2Y5Zyo44GX44Gq44GE5aC05ZCI44CB5L2V44KC44GX44Gq44GEXHJcbiAgICAgICAgICAgICAgICBpZihzYXZlZGF0YVV0aWwuZ2V0RGF0YSgpW2krMV0uc2NlbmFyaW8gPT09ICcnKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2xvdCcgKyBwYXJ0cy5zYXZlV2luZG93LnNsb3RzW2ldLnNsb3QgKyAnIHNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0cy5zYXZlV2luZG93LnNsb3RzW2ldLmludGVyYWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwYXJ0cy5zYXZlV2luZG93LmNsb3NlQnV0dG9uLmludGVyYWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBvblRhcChwYXJ0cy5zYXZlV2luZG93LnNsb3RzW2ldLnNsb3QpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDntYLkuobjgqTjg5njg7Pjg4joqK3lrppcclxuICAgICAgICBwYXJ0cy5zYXZlV2luZG93LmNsb3NlQnV0dG9uLnRhcCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzb3VuZHMucGxheVNlKCfjg5zjgr/jg7Pmk43kvZzpn7MnKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDQ7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBwYXJ0cy5zYXZlV2luZG93LnNsb3RzW2ldLmludGVyYWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGFydHMuc2F2ZVdpbmRvdy5jbG9zZUJ1dHRvbi5pbnRlcmFjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjbG9zZVNhdmVXaW5kb3coKTtcclxuICAgICAgICAgICAgb25DbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDjgrvjg7zjg5bjgqbjgqPjg7Pjg4njgqbjga7jgq/jg63jg7zjgrpcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBjbG9zZVNhdmVXaW5kb3coKSB7XHJcbiAgICAgICAgcGFydHMuc2F2ZVdpbmRvdy5jbG9zZUJ1dHRvbi5pbnRlcmFjdCA9IGZhbHNlO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA0OyBpKyspe1xyXG4gICAgICAgICAgICBwYXJ0cy5zYXZlV2luZG93LnNsb3RzW2ldLmludGVyYWN0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhcnRzLnNhdmVXaW5kb3cuZ3JvdXAudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOOCu+ODvOODluODh+ODvOOCv+OBruiqreOBv+i+vOOBv+OBqOihqOekulxyXG4gICAgZnVuY3Rpb24gZHJhd1NhdmVkYXRhKCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gc2F2ZWRhdGFVdGlsLmdldERhdGEoKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHBhcnRzLnNhdmVXaW5kb3cudGV4dFtpXS5jb250ZW50ID0gZGF0YVtpKzFdLnRleHQ7XHJcbiAgICAgICAgICAgIHBhcnRzLnNhdmVXaW5kb3cudGltZVtpXS5jb250ZW50ID0gZGF0YVtpKzFdLnRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOeiuuiqjeODgOOCpOOCouODreOCsOihqOekulxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNob3dDb25maXJtRGlhbG9nKHRpdGxlLCB0ZXh0LCBvbkNsb3NlKSB7XHJcbiAgICAgICAgc291bmRzLnBsYXlTZSgn44Oc44K/44Oz5pON5L2c6Z+zJyk7XHJcbiAgICAgICAgcGFydHMuY29uZmlybURpYWxvZy5ncm91cC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICBwYXJ0cy5jb25maXJtRGlhbG9nLnRpdGxlLmNvbnRlbnQgPSB0aXRsZTtcclxuICAgICAgICBwYXJ0cy5jb25maXJtRGlhbG9nLnRleHQuY29udGVudCA9IHRleHQ7XHJcbiAgICAgICAgcGFydHMuY29uZmlybURpYWxvZy5va0J1dHRvbi5pbnRlcmFjdCA9IHRydWU7XHJcbiAgICAgICAgLy8g57WC5LqG44Kk44OZ44Oz44OI6Kit5a6aXHJcbiAgICAgICAgcGFydHMuY29uZmlybURpYWxvZy5va0J1dHRvbi50YXAgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc291bmRzLnBsYXlTZSgn44Oc44K/44Oz5pON5L2c6Z+zJyk7XHJcbiAgICAgICAgICAgIHBhcnRzLmNvbmZpcm1EaWFsb2cub2tCdXR0b24uaW50ZXJhY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgcGFydHMuY29uZmlybURpYWxvZy5ncm91cC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG9uQ2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gWS9O44OA44Kk44Ki44Ot44Kw6KGo56S6XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gc2hvd1llc05vRGlhbG9nKHRpdGxlLCB0ZXh0LCBvblllcywgb25Obykge1xyXG4gICAgICAgIHNvdW5kcy5wbGF5U2UoJ+ODnOOCv+ODs+aTjeS9nOmfsycpO1xyXG4gICAgICAgIHBhcnRzLnllc05vRGlhbG9nLmdyb3VwLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHBhcnRzLnllc05vRGlhbG9nLnRpdGxlLmNvbnRlbnQgPSB0aXRsZTtcclxuICAgICAgICBwYXJ0cy55ZXNOb0RpYWxvZy50ZXh0LmNvbnRlbnQgPSB0ZXh0O1xyXG4gICAgICAgIHBhcnRzLnllc05vRGlhbG9nLnllc0J1dHRvbi5pbnRlcmFjdCA9IHRydWU7XHJcbiAgICAgICAgcGFydHMueWVzTm9EaWFsb2cubm9CdXR0b24uaW50ZXJhY3QgPSB0cnVlO1xyXG4gICAgICAgIC8vIOe1guS6huOCpOODmeODs+ODiOioreWumlxyXG4gICAgICAgIHBhcnRzLnllc05vRGlhbG9nLnllc0J1dHRvbi50YXAgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc291bmRzLnBsYXlTZSgn44Oc44K/44Oz5pON5L2c6Z+zJyk7XHJcbiAgICAgICAgICAgIHBhcnRzLnllc05vRGlhbG9nLnllc0J1dHRvbi5pbnRlcmFjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBwYXJ0cy55ZXNOb0RpYWxvZy5ub0J1dHRvbi5pbnRlcmFjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBwYXJ0cy55ZXNOb0RpYWxvZy5ncm91cC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG9uWWVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhcnRzLnllc05vRGlhbG9nLm5vQnV0dG9uLnRhcCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzb3VuZHMucGxheVNlKCfjg5zjgr/jg7Pmk43kvZzpn7MnKTtcclxuICAgICAgICAgICAgcGFydHMueWVzTm9EaWFsb2cubm9CdXR0b24uaW50ZXJhY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgcGFydHMueWVzTm9EaWFsb2cubm9CdXR0b24uaW50ZXJhY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgcGFydHMueWVzTm9EaWFsb2cuZ3JvdXAudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBvbk5vKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyDoqK3lrprjg4DjgqTjgqLjg63jgrDooajnpLpcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBzaG93Q29uZmlnV2luZG93KG9uQ2xvc2UpIHtcclxuICAgICAgICBzb3VuZHMucGxheVNlKCfjg5zjgr/jg7Pmk43kvZzpn7MnKTtcclxuICAgICAgICByZWxvYWRDb25maWdQYXJ0cygpO1xyXG4gICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5ncm91cC52aXNpYmxlID0gdHJ1ZTtcclxuLy8gICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy50ZXh0LmNvbnRlbnQgPSB0ZXh0O1xyXG4gICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5va0J1dHRvbi5pbnRlcmFjdCA9IHRydWU7XHJcbiAgICAgICAgLy8g44Oc44K/44Oz5oq85LiL44Kk44OZ44Oz44OI6Kit5a6aXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICBwYXJ0cy5jb25maWdXaW5kb3cubGVmdEJ1dHRvbnNbaV0uaW50ZXJhY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICBwYXJ0cy5jb25maWdXaW5kb3cucmlnaHRCdXR0b25zW2ldLmludGVyYWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8g44Oh44OD44K744O844K444K544OU44O844OJXHJcbiAgICAgICAgICAgIGlmKGkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5sZWZ0QnV0dG9uc1tpXS50YXAgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsID0gY29uZmlnVXRpbC5nZXREYXRhKCdzcGVlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZhbCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnVXRpbC5zZXREYXRhKCdzcGVlZCcsIHZhbCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VuZHMucGxheVNlKCfjg5zjgr/jg7Pmk43kvZzpn7MnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsb2FkQ29uZmlnUGFydHMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwYXJ0cy5jb25maWdXaW5kb3cucmlnaHRCdXR0b25zW2ldLnRhcCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWwgPSBjb25maWdVdGlsLmdldERhdGEoJ3NwZWVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodmFsIDwgNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWdVdGlsLnNldERhdGEoJ3NwZWVkJywgdmFsICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdW5kcy5wbGF5U2UoJ+ODnOOCv+ODs+aTjeS9nOmfsycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxvYWRDb25maWdQYXJ0cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBCR03pn7Pph49cclxuICAgICAgICAgICAgZWxzZSBpZihpID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJ0cy5jb25maWdXaW5kb3cubGVmdEJ1dHRvbnNbaV0udGFwID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbCA9IGNvbmZpZ1V0aWwuZ2V0RGF0YSgnYmdtJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodmFsID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VuZHMucGxheVNlKCfjg5zjgr/jg7Pmk43kvZzpn7MnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnVXRpbC5zZXREYXRhKCdiZ20nLCB2YWwgLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291bmRzLnNldEJnbVZvbHVtZSh2YWwgLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsb2FkQ29uZmlnUGFydHMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwYXJ0cy5jb25maWdXaW5kb3cucmlnaHRCdXR0b25zW2ldLnRhcCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWwgPSBjb25maWdVdGlsLmdldERhdGEoJ2JnbScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZhbCA8IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291bmRzLnBsYXlTZSgn44Oc44K/44Oz5pON5L2c6Z+zJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ1V0aWwuc2V0RGF0YSgnYmdtJywgdmFsICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdW5kcy5zZXRCZ21Wb2x1bWUodmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsb2FkQ29uZmlnUGFydHMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gU0Xpn7Pph49cclxuICAgICAgICAgICAgZWxzZSBpZihpID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJ0cy5jb25maWdXaW5kb3cubGVmdEJ1dHRvbnNbaV0udGFwID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbCA9IGNvbmZpZ1V0aWwuZ2V0RGF0YSgnc2UnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih2YWwgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdW5kcy5wbGF5U2UoJ+ODnOOCv+ODs+aTjeS9nOmfsycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWdVdGlsLnNldERhdGEoJ3NlJywgdmFsIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdW5kcy5zZXRTZVZvbHVtZSh2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxvYWRDb25maWdQYXJ0cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5yaWdodEJ1dHRvbnNbaV0udGFwID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbCA9IGNvbmZpZ1V0aWwuZ2V0RGF0YSgnc2UnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih2YWwgPCA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdW5kcy5wbGF5U2UoJ+ODnOOCv+ODs+aTjeS9nOmfsycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWdVdGlsLnNldERhdGEoJ3NlJywgdmFsICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdW5kcy5zZXRTZVZvbHVtZSh2YWwgKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsb2FkQ29uZmlnUGFydHMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g57WC5LqG44Kk44OZ44Oz44OI6Kit5a6aXHJcbiAgICAgICAgbGV0IGV2ZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNvdW5kcy5wbGF5U2UoJ+ODnOOCv+ODs+aTjeS9nOmfsycpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJ0cy5jb25maWdXaW5kb3cubGVmdEJ1dHRvbnNbaV0uaW50ZXJhY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5yaWdodEJ1dHRvbnNbaV0uaW50ZXJhY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYXJ0cy5jb25maWdXaW5kb3cub2tCdXR0b24uaW50ZXJhY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgcGFydHMuY29uZmlnV2luZG93Lmdyb3VwLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY29uZmlnVXRpbC5zYXZlKCk7XHJcbiAgICAgICAgICAgIG9uQ2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGFydHMuY29uZmlnV2luZG93Lm9rQnV0dG9uLnRhcCA9IGV2ZW50O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyDjgrvjg7zjg5bjgqbjgqPjg7Pjg4njgqbjga7liJ3mnJ/ljJbjgILkuIDluqbjgaDjgZHlkbzjgbPlh7rjgZlcclxuICAgIGZ1bmN0aW9uIG1ha2VTYXZlV2luZG93T2JqZWN0KCkge1xyXG4gICAgICAgIHBhcnRzLnNhdmVXaW5kb3cubWFzayA9IGcucmVjdGFuZ2xlKDY0MCwgOTYwLCBcImJsYWNrXCIpO1xyXG4gICAgICAgIHBhcnRzLnNhdmVXaW5kb3cubWFzay5hbHBoYSA9IDAuMztcclxuICAgICAgICBwYXJ0cy5zYXZlV2luZG93LmJvZHkgPSBnLnNwcml0ZShcImltYWdlcy9zYXZlV2luZG93LnBuZ1wiKTtcclxuICAgICAgICBwYXJ0cy5zYXZlV2luZG93LmJvZHkuc2V0UG9zaXRpb24oNTAsIDEwMCk7XHJcbiAgICAgICAgcGFydHMuc2F2ZVdpbmRvdy50aXRsZSA9IGcudGV4dCgnJywgJzM4cHggbXBsdXMtMWMtcmVndWxhcicsICd3aGl0ZScpO1xyXG4gICAgICAgIHBhcnRzLnNhdmVXaW5kb3cudGl0bGUuc2V0UG9zaXRpb24oODIsIDEyNClcclxuICAgICAgICBwYXJ0cy5zYXZlV2luZG93LmNsb3NlQnV0dG9uID0gZy5yZWN0YW5nbGUoODAsIDcwLCBcIndoaXRlXCIpO1xyXG4gICAgICAgIHBhcnRzLnNhdmVXaW5kb3cuY2xvc2VCdXR0b24uc2V0UG9zaXRpb24oNTAwLCAxMTApO1xyXG4gICAgICAgIHBhcnRzLnNhdmVXaW5kb3cuY2xvc2VCdXR0b24uYWxwaGEgPSAwO1xyXG4gICAgICAgIHBhcnRzLnNhdmVXaW5kb3cuZ3JvdXAuYWRkQ2hpbGQocGFydHMuc2F2ZVdpbmRvdy5tYXNrKTtcclxuICAgICAgICBwYXJ0cy5zYXZlV2luZG93Lmdyb3VwLmFkZENoaWxkKHBhcnRzLnNhdmVXaW5kb3cuYm9keSk7XHJcbiAgICAgICAgcGFydHMuc2F2ZVdpbmRvdy5ncm91cC5hZGRDaGlsZChwYXJ0cy5zYXZlV2luZG93LnRpdGxlKTtcclxuICAgICAgICBwYXJ0cy5zYXZlV2luZG93Lmdyb3VwLmFkZENoaWxkKHBhcnRzLnNhdmVXaW5kb3cuY2xvc2VCdXR0b24pO1xyXG4gICAgICAgIC8vIOOCueODreODg+ODiOOCquODluOCuOOCp+OCr+ODiOS9nOaIkFxyXG4gICAgICAgIHBhcnRzLnNhdmVXaW5kb3cuc2xvdHMgPSBuZXcgQXJyYXkoNCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDQ7IGkrKyl7XHJcbiAgICAgICAgICAgIHBhcnRzLnNhdmVXaW5kb3cuc2xvdHNbaV0gPSBnLnJlY3RhbmdsZSg0ODAsIDE1MCwgXCJncmVlblwiKTtcclxuICAgICAgICAgICAgcGFydHMuc2F2ZVdpbmRvdy5zbG90c1tpXS5zZXRQb3NpdGlvbig4MCwgMjAwICsgaSAqIDE2MCk7XHJcbiAgICAgICAgICAgIHBhcnRzLnNhdmVXaW5kb3cuc2xvdHNbaV0uYWxwaGEgPSAwLjU7XHJcbiAgICAgICAgICAgIHBhcnRzLnNhdmVXaW5kb3cuZ3JvdXAuYWRkQ2hpbGQocGFydHMuc2F2ZVdpbmRvdy5zbG90c1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOODhuOCreOCueODiOOCquODluOCuOOCp+OCr+ODiOS9nOaIkFxyXG4gICAgICAgIHBhcnRzLnNhdmVXaW5kb3cudGV4dCA9IG5ldyBBcnJheSg0KTtcclxuICAgICAgICBwYXJ0cy5zYXZlV2luZG93LnRpbWUgPSBuZXcgQXJyYXkoNCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICBwYXJ0cy5zYXZlV2luZG93LnRleHRbaV0gPSBnLnRleHQoJycsICczMnB4IG1wbHVzLTFjLXJlZ3VsYXInLCAnd2hpdGUnKTtcclxuICAgICAgICAgICAgcGFydHMuc2F2ZVdpbmRvdy50ZXh0W2ldLnNldFBvc2l0aW9uKDE1MiwgMjMwICsgMTYwICogaSk7XHJcbiAgICAgICAgICAgIHBhcnRzLnNhdmVXaW5kb3cuZ3JvdXAuYWRkQ2hpbGQocGFydHMuc2F2ZVdpbmRvdy50ZXh0W2ldKTtcclxuICAgICAgICAgICAgcGFydHMuc2F2ZVdpbmRvdy50aW1lW2ldID0gZy50ZXh0KCcnLCAnMzJweCBtcGx1cy0xYy1yZWd1bGFyJywgJ3doaXRlJyk7XHJcbiAgICAgICAgICAgIHBhcnRzLnNhdmVXaW5kb3cudGltZVtpXS5zZXRQb3NpdGlvbigxOTIsIDI4NSArIDE2MCAqIGkpO1xyXG4gICAgICAgICAgICBwYXJ0cy5zYXZlV2luZG93Lmdyb3VwLmFkZENoaWxkKHBhcnRzLnNhdmVXaW5kb3cudGltZVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhcnRzLnNhdmVXaW5kb3cuZ3JvdXAudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy8g56K66KqN44OA44Kk44Ki44Ot44Kw44Gu5Yid5pyf5YyW44CC5LiA5bqm44Gg44GR5ZG844Gz5Ye644GZXHJcbiAgICBmdW5jdGlvbiBtYWtlQ29uZmlybURpYWxvZ09iamVjdCgpIHtcclxuICAgICAgICBwYXJ0cy5jb25maXJtRGlhbG9nLm1hc2sgPSBnLnJlY3RhbmdsZSg2NDAsIDk2MCwgXCJibGFja1wiKTtcclxuICAgICAgICBwYXJ0cy5jb25maXJtRGlhbG9nLm1hc2suYWxwaGEgPSAwLjM7XHJcbiAgICAgICAgcGFydHMuY29uZmlybURpYWxvZy5ib2R5ID0gZy5zcHJpdGUoXCJpbWFnZXMvY29uZmlybVdpbmRvdy5wbmdcIik7XHJcbiAgICAgICAgcGFydHMuY29uZmlybURpYWxvZy5ib2R5LnNldFBpdm90KDAuNSwgMC41KTtcclxuICAgICAgICBwYXJ0cy5jb25maXJtRGlhbG9nLmJvZHkuc2V0UG9zaXRpb24oMzIwLCA0ODApO1xyXG4gICAgICAgIHBhcnRzLmNvbmZpcm1EaWFsb2cudGl0bGUgPSBnLnRleHQoJycsICczOHB4IG1wbHVzLTFjLXJlZ3VsYXInLCAnd2hpdGUnKTtcclxuICAgICAgICBwYXJ0cy5jb25maXJtRGlhbG9nLnRpdGxlLnNldFBvc2l0aW9uKDEwMiwgMzU0KVxyXG4gICAgICAgIHBhcnRzLmNvbmZpcm1EaWFsb2cudGV4dCA9IGcudGV4dCgnJywgJzMycHggbXBsdXMtMWMtcmVndWxhcicsICd3aGl0ZScpO1xyXG4gICAgICAgIHBhcnRzLmNvbmZpcm1EaWFsb2cudGV4dC5zZXRQb3NpdGlvbigxMDIsIDQyNCk7XHJcbiAgICAgICAgcGFydHMuY29uZmlybURpYWxvZy5ncm91cC5hZGRDaGlsZChwYXJ0cy5jb25maXJtRGlhbG9nLnRleHQpO1xyXG4gICAgICAgIHBhcnRzLmNvbmZpcm1EaWFsb2cub2tCdXR0b24gPSBnLnNwcml0ZShcImJ1dHRvbl9vay5naWZcIik7XHJcbiAgICAgICAgcGFydHMuY29uZmlybURpYWxvZy5va0J1dHRvbi5zZXRQaXZvdCgwLjUsIDAuNSk7XHJcbiAgICAgICAgcGFydHMuY29uZmlybURpYWxvZy5va0J1dHRvbi5zZXRQb3NpdGlvbigzMjAsIDU4MCk7XHJcbiAgICAgICAgcGFydHMuY29uZmlybURpYWxvZy5ncm91cC5hZGRDaGlsZChwYXJ0cy5jb25maXJtRGlhbG9nLm1hc2spO1xyXG4gICAgICAgIHBhcnRzLmNvbmZpcm1EaWFsb2cuZ3JvdXAuYWRkQ2hpbGQocGFydHMuY29uZmlybURpYWxvZy5ib2R5KTtcclxuICAgICAgICBwYXJ0cy5jb25maXJtRGlhbG9nLmdyb3VwLmFkZENoaWxkKHBhcnRzLmNvbmZpcm1EaWFsb2cudGV4dCk7XHJcbiAgICAgICAgcGFydHMuY29uZmlybURpYWxvZy5ncm91cC5hZGRDaGlsZChwYXJ0cy5jb25maXJtRGlhbG9nLnRpdGxlKTtcclxuICAgICAgICBwYXJ0cy5jb25maXJtRGlhbG9nLmdyb3VwLmFkZENoaWxkKHBhcnRzLmNvbmZpcm1EaWFsb2cub2tCdXR0b24pO1xyXG4gICAgICAgIHBhcnRzLmNvbmZpcm1EaWFsb2cuZ3JvdXAudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy8gWS9O44OA44Kk44Ki44Ot44Kw44Gu5Yid5pyf5YyW44CC5LiA5bqm44Gg44GR5ZG844Gz5Ye644GZXHJcbiAgICBmdW5jdGlvbiBtYWtlWWVzTm9EaWFsb2dPYmplY3QoKSB7XHJcbiAgICAgICAgcGFydHMueWVzTm9EaWFsb2cubWFzayA9IGcucmVjdGFuZ2xlKDY0MCwgOTYwLCBcImJsYWNrXCIpO1xyXG4gICAgICAgIHBhcnRzLnllc05vRGlhbG9nLm1hc2suYWxwaGEgPSAwLjM7XHJcbiAgICAgICAgcGFydHMueWVzTm9EaWFsb2cuYm9keSA9IGcuc3ByaXRlKFwiaW1hZ2VzL2NvbmZpcm1XaW5kb3cucG5nXCIpO1xyXG4gICAgICAgIHBhcnRzLnllc05vRGlhbG9nLmJvZHkuc2V0UGl2b3QoMC41LCAwLjUpO1xyXG4gICAgICAgIHBhcnRzLnllc05vRGlhbG9nLmJvZHkuc2V0UG9zaXRpb24oMzIwLCA0ODApO1xyXG4gICAgICAgIHBhcnRzLnllc05vRGlhbG9nLnRpdGxlID0gZy50ZXh0KCcnLCAnMzhweCBtcGx1cy0xYy1yZWd1bGFyJywgJ3doaXRlJyk7XHJcbiAgICAgICAgcGFydHMueWVzTm9EaWFsb2cudGl0bGUuc2V0UG9zaXRpb24oMTAyLCAzNTQpXHJcbiAgICAgICAgcGFydHMueWVzTm9EaWFsb2cudGV4dCA9IGcudGV4dCgnJywgJzMycHggbXBsdXMtMWMtcmVndWxhcicsICd3aGl0ZScpO1xyXG4gICAgICAgIHBhcnRzLnllc05vRGlhbG9nLnRleHQuc2V0UG9zaXRpb24oMTAyLCA0MjQpO1xyXG4gICAgICAgIHBhcnRzLnllc05vRGlhbG9nLmdyb3VwLmFkZENoaWxkKHBhcnRzLnllc05vRGlhbG9nLnRleHQpO1xyXG4gICAgICAgIHBhcnRzLnllc05vRGlhbG9nLnllc0J1dHRvbiA9IGcuc3ByaXRlKFwiYnV0dG9uX3llcy5naWZcIik7XHJcbiAgICAgICAgcGFydHMueWVzTm9EaWFsb2cueWVzQnV0dG9uLnNldFBpdm90KDAuNSwgMC41KTtcclxuICAgICAgICBwYXJ0cy55ZXNOb0RpYWxvZy55ZXNCdXR0b24uc2V0UG9zaXRpb24oMjAwLCA1ODApO1xyXG4gICAgICAgIHBhcnRzLnllc05vRGlhbG9nLm5vQnV0dG9uID0gZy5zcHJpdGUoXCJidXR0b25fbm8uZ2lmXCIpO1xyXG4gICAgICAgIHBhcnRzLnllc05vRGlhbG9nLm5vQnV0dG9uLnNldFBpdm90KDAuNSwgMC41KTtcclxuICAgICAgICBwYXJ0cy55ZXNOb0RpYWxvZy5ub0J1dHRvbi5zZXRQb3NpdGlvbig0NDAsIDU4MCk7XHJcbiAgICAgICAgcGFydHMueWVzTm9EaWFsb2cuZ3JvdXAuYWRkQ2hpbGQocGFydHMueWVzTm9EaWFsb2cubWFzayk7XHJcbiAgICAgICAgcGFydHMueWVzTm9EaWFsb2cuZ3JvdXAuYWRkQ2hpbGQocGFydHMueWVzTm9EaWFsb2cuYm9keSk7XHJcbiAgICAgICAgcGFydHMueWVzTm9EaWFsb2cuZ3JvdXAuYWRkQ2hpbGQocGFydHMueWVzTm9EaWFsb2cudGV4dCk7XHJcbiAgICAgICAgcGFydHMueWVzTm9EaWFsb2cuZ3JvdXAuYWRkQ2hpbGQocGFydHMueWVzTm9EaWFsb2cudGl0bGUpO1xyXG4gICAgICAgIHBhcnRzLnllc05vRGlhbG9nLmdyb3VwLmFkZENoaWxkKHBhcnRzLnllc05vRGlhbG9nLnllc0J1dHRvbik7XHJcbiAgICAgICAgcGFydHMueWVzTm9EaWFsb2cuZ3JvdXAuYWRkQ2hpbGQocGFydHMueWVzTm9EaWFsb2cubm9CdXR0b24pO1xyXG4gICAgICAgIHBhcnRzLnllc05vRGlhbG9nLmdyb3VwLnZpc2libGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vIOioreWumuOCpuOCo+ODs+ODieOCpuOBruWIneacn+WMluOAguS4gOW6puOBoOOBkeWRvOOBs+WHuuOBmVxyXG4gICAgZnVuY3Rpb24gbWFrZUNvbmZpZ1dpbmRvd09iamVjdCgpIHtcclxuICAgICAgICBwYXJ0cy5jb25maWdXaW5kb3cubWFzayA9IGcucmVjdGFuZ2xlKDY0MCwgOTYwLCBcImJsYWNrXCIpO1xyXG4gICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5tYXNrLmFscGhhID0gMC4zO1xyXG4gICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5ib2R5ID0gZy5zcHJpdGUoXCJpbWFnZXMvY29uZmlnV2luZG93LnBuZ1wiKTtcclxuICAgICAgICBwYXJ0cy5jb25maWdXaW5kb3cuYm9keS5zZXRQaXZvdCgwLjUsIDAuNSk7XHJcbiAgICAgICAgcGFydHMuY29uZmlnV2luZG93LmJvZHkuc2V0UG9zaXRpb24oMzIwLCA0ODApO1xyXG4gICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy50aXRsZSA9IGcudGV4dCgn6Kit5a6aJywgJzM4cHggbXBsdXMtMWMtcmVndWxhcicsICd3aGl0ZScpO1xyXG4gICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy50aXRsZS5zZXRQb3NpdGlvbig4MiwgMjI4KVxyXG4gICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5va0J1dHRvbiA9IGcuc3ByaXRlKFwiYnV0dG9uX29rLmdpZlwiKTtcclxuICAgICAgICBwYXJ0cy5jb25maWdXaW5kb3cub2tCdXR0b24uc2V0UGl2b3QoMC41LCAwLjUpO1xyXG4gICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5va0J1dHRvbi5zZXRQb3NpdGlvbigzMjAsIDY5MCk7XHJcbiAgICAgICAgcGFydHMuY29uZmlnV2luZG93Lmdyb3VwLmFkZENoaWxkKHBhcnRzLmNvbmZpZ1dpbmRvdy5tYXNrKTtcclxuICAgICAgICBwYXJ0cy5jb25maWdXaW5kb3cuZ3JvdXAuYWRkQ2hpbGQocGFydHMuY29uZmlnV2luZG93LmJvZHkpO1xyXG4gICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5ncm91cC5hZGRDaGlsZChwYXJ0cy5jb25maWdXaW5kb3cudGl0bGUpO1xyXG4gICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5ncm91cC5hZGRDaGlsZChwYXJ0cy5jb25maWdXaW5kb3cub2tCdXR0b24pO1xyXG4gICAgICAgIC8vIOODhuOCreOCueODiOOCquODluOCuOOCp+OCr+ODiOS9nOaIkFxyXG4gICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy52YWx1ZXMgPSBuZXcgQXJyYXkoNCk7XHJcbiAgICAgICAgcGFydHMuY29uZmlnV2luZG93LmJhcnMgPSBuZXcgQXJyYXkoNCk7XHJcbi8vICAgICAgICBwYXJ0cy5jb25maWdXaW5kb3cuY29udHJvbHMgPSBuZXcgQXJyYXkoNCk7XHJcbiAgICAgICAgcGFydHMuY29uZmlnV2luZG93LmxlZnRCdXR0b25zID0gbmV3IEFycmF5KDQpO1xyXG4gICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5yaWdodEJ1dHRvbnMgPSBuZXcgQXJyYXkoNCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICBwYXJ0cy5jb25maWdXaW5kb3cudmFsdWVzW2ldID0gZy50ZXh0KCc1JywgJzQycHggbXBsdXMtMWMtcmVndWxhcicsICd3aGl0ZScpO1xyXG4gICAgICAgICAgICBwYXJ0cy5jb25maWdXaW5kb3cudmFsdWVzW2ldLnNldFBpdm90KDAuNSwgMC41KTtcclxuICAgICAgICAgICAgcGFydHMuY29uZmlnV2luZG93LnZhbHVlc1tpXS5zZXRQb3NpdGlvbig0NDIsIDMyNSArIDExMCAqIGkpO1xyXG4gICAgICAgICAgICBwYXJ0cy5jb25maWdXaW5kb3cuZ3JvdXAuYWRkQ2hpbGQocGFydHMuY29uZmlnV2luZG93LnZhbHVlc1tpXSk7XHJcbiAgICAgICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5iYXJzW2ldID0gZy5zcHJpdGUoJ2NvbmZpZ19iYXIucG5nJyk7XHJcbiAgICAgICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5iYXJzW2ldLnNldFBpdm90KDAsIDAuNSk7XHJcbiAgICAgICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5iYXJzW2ldLnNldFBvc2l0aW9uKDEyMCwgMzgwICsgMTEwICogaSk7XHJcbiAgICAgICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5ncm91cC5hZGRDaGlsZChwYXJ0cy5jb25maWdXaW5kb3cuYmFyc1tpXSk7XHJcbiAgICAgICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5sZWZ0QnV0dG9uc1tpXSA9IGcuc3ByaXRlKCdjb25maWdfYnV0dG9uX2xlZnQucG5nJyk7XHJcbiAgICAgICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5sZWZ0QnV0dG9uc1tpXS5zZXRQaXZvdCgwLjUsIDAuNSk7XHJcbiAgICAgICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5sZWZ0QnV0dG9uc1tpXS5zZXRQb3NpdGlvbigzNjUsIDMyNSArIDExMCAqIGkpO1xyXG4gICAgICAgICAgICBwYXJ0cy5jb25maWdXaW5kb3cuZ3JvdXAuYWRkQ2hpbGQocGFydHMuY29uZmlnV2luZG93LmxlZnRCdXR0b25zW2ldKTtcclxuICAgICAgICAgICAgcGFydHMuY29uZmlnV2luZG93LnJpZ2h0QnV0dG9uc1tpXSA9IGcuc3ByaXRlKCdjb25maWdfYnV0dG9uX3JpZ2h0LnBuZycpO1xyXG4gICAgICAgICAgICBwYXJ0cy5jb25maWdXaW5kb3cucmlnaHRCdXR0b25zW2ldLnNldFBpdm90KDAuNSwgMC41KTtcclxuICAgICAgICAgICAgcGFydHMuY29uZmlnV2luZG93LnJpZ2h0QnV0dG9uc1tpXS5zZXRQb3NpdGlvbig1MTUsIDMyNSArIDExMCAqIGkpO1xyXG4gICAgICAgICAgICBwYXJ0cy5jb25maWdXaW5kb3cuZ3JvdXAuYWRkQ2hpbGQocGFydHMuY29uZmlnV2luZG93LnJpZ2h0QnV0dG9uc1tpXSk7XHJcbi8vICAgICAgICAgICAgcGFydHMuY29uZmlnV2luZG93LmNvbnRyb2xzW2ldID0gZy5zcHJpdGUoJ2NvbmZpZ19jb250cm9sLnBuZycpO1xyXG4vLyAgICAgICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5jb250cm9sc1tpXS5zZXRQaXZvdCgwLjUsIDAuNSk7XHJcbi8vICAgICAgICAgICAgcGFydHMuY29uZmlnV2luZG93LmNvbnRyb2xzW2ldLnNldFBvc2l0aW9uKDQ4MCwgMzgwICsgMTEwICogaSk7XHJcbi8vICAgICAgICAgICAgcGFydHMuY29uZmlnV2luZG93Lmdyb3VwLmFkZENoaWxkKHBhcnRzLmNvbmZpZ1dpbmRvdy5jb250cm9sc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhcnRzLmNvbmZpZ1dpbmRvdy5ncm91cC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIOioreWumuOBq+WQiOOCj+OBm+OBpuODkOODvOOCkuaPj+eUu+OBmeOCi1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHJlbG9hZENvbmZpZ1BhcnRzKCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgcGFydHMuY29uZmlnV2luZG93LmJhcnNbaV0ud2lkdGggPVxyXG4gICAgICAgICAgICAgICAgNDAwICogKGNvbmZpZ1V0aWwuZ2V0RGF0YShjb25maWdVdGlsLmtleXNbaV0pIC8gNSk7XHJcbi8vICAgICAgICAgICAgcGFydHMuY29uZmlnV2luZG93LmNvbnRyb2xzW2ldLnNldFBvc2l0aW9uKFxyXG4vLyAgICAgICAgICAgICAgICA5MCArIDEwMCAqIChjb25maWdVdGlsLmdldERhdGEoY29uZmlnVXRpbC5rZXlzW2ldKSAtIDEpLCAzODAgKyAxMTAgKiBpXHJcbi8vICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcGFydHMuY29uZmlnV2luZG93LnZhbHVlc1tpXS5jb250ZW50ID0gY29uZmlnVXRpbC5nZXREYXRhKGNvbmZpZ1V0aWwua2V5c1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIGNvbW1vbntcclxuICAgIGV4cG9ydCBsZXQgYmdtO1xyXG4gICAgZXhwb3J0IGxldCBzZTtcclxufSIsIm5hbWVzcGFjZSBjb25maWdVdGlsIHtcclxuICAgIGxldCBkYXRhO1xyXG4gICAgZXhwb3J0IGxldCBrZXlzID0gWydzcGVlZCcsICdiZ20nLCAnc2UnXTtcclxuICAgIGNvbnN0IENPTkZJR0RBVEFfS0VZX05BTUUgPSAnYWR2X2NvbmZpZ2RhdGEnO1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNldHVwKCkge1xyXG4gICAgICAgIC8vIOODh+ODvOOCv+OBruiqreOBv+i+vOOBv1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCB2YWwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShDT05GSUdEQVRBX0tFWV9OQU1FKTtcclxuICAgICAgICAgICAgaWYodmFsID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gbWFrZUluaXREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShDT05GSUdEQVRBX0tFWV9OQU1FLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZih2YWwgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb25maWcgbG9hZCBlcnJvcicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UodmFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29uZmlnZGF0YSBsb2FkZWQgZnJvbSBsb2NhbFN0b3JhZ2UuJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdsb2FkaW5nIGNvbmZpZ2RhdGEgZmFpbGVkLicpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDoqK3lrprjga7lj43mmKBcclxuICAgICAgICBzb3VuZHMuc2V0QmdtVm9sdW1lKGNvbmZpZ1V0aWwuZ2V0RGF0YSgnYmdtJykpO1xyXG4gICAgICAgIHNvdW5kcy5zZXRTZVZvbHVtZShjb25maWdVdGlsLmdldERhdGEoJ3NlJykpO1xyXG4gICAgfTtcclxuICAgIC8vIOODh+ODvOOCv+WPluW+l1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldERhdGEoa2V5OnN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBkYXRhW2tleV07XHJcbiAgICB9XHJcbiAgICAvLyDjg4fjg7zjgr/oqK3lrppcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBzZXREYXRhKGtleTpzdHJpbmcsIHZhbHVlOm51bWJlcikge1xyXG4gICAgICAgIGRhdGFba2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyDjg4fjg7zjgr/jga7kv53lrZhcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBzYXZlKCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKENPTkZJR0RBVEFfS0VZX05BTUUsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDliJ3mnJ/lgKToqK3lrppcclxuICAgIGZ1bmN0aW9uIG1ha2VJbml0RGF0YSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcInNwZWVkXCI6IDMsXHJcbiAgICAgICAgICAgIFwiYmdtXCI6IDMsXHJcbiAgICAgICAgICAgIFwic2VcIjogM1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJsZXQgZyA9IGhleGkoNjQwLCA5NjAsIHNldHVwLCBhc3NldHMsIGxvYWQpO1xyXG5cclxubGV0IGNoYXJhY3RvckNvbmZpZyxcclxuICAgIGJhY2tncm91bmRDb25maWcsXHJcbiAgICBzZXR0aW5ncztcclxuXHJcbmcuYmFja2dyb3VuZENvbG9yID0gMHgwMDAwMDA7XHJcbmcuc2NhbGVUb1dpbmRvdygpO1xyXG5nLnN0YXJ0KCk7XHJcblxyXG4vLyDjg4fjg7zjgr/jg63jg7zjg4nkuK3jga7lh6bnkIZcclxuZnVuY3Rpb24gbG9hZCgpe1xyXG4vLyAgY29uc29sZS5sb2coYGxvYWRpbmc6ICR7Zy5sb2FkaW5nRmlsZX1gKTsgXHJcbi8vICBjb25zb2xlLmxvZyhgcHJvZ3Jlc3M6ICR7Zy5sb2FkaW5nUHJvZ3Jlc3N9YCk7XHJcbiAgICBnLmxvYWRpbmdCYXIoKTtcclxufVxyXG5cclxuLy8g44K744OD44OI44Ki44OD44OX6Zai5pWwXHJcbmZ1bmN0aW9uIHNldHVwKCl7XHJcbiAgICAvLyDpn7Plo7Djg4fjg7zjgr/jga7jgrvjg4Pjg4jjgqLjg4Pjg5dcclxuICAgIHNvdW5kcy5zZXR1cCgpO1xyXG4gICAgY29tbW9uLmJnbSA9IGcuc291bmQoJ3NvdW5kcy9zaWxlbnQubXAzJyk7XHJcbiAgICAvLyDjgrvjg7zjg5bjg4fjg7zjgr/jgIHoqK3lrprjg4fjg7zjgr/jga7jgrvjg4Pjg4jjgqLjg4Pjg5dcclxuICAgIHNhdmVkYXRhVXRpbC5zZXR1cCgpO1xyXG4gICAgY29uZmlnVXRpbC5zZXR1cCgpO1xyXG4gICAgLy8g55S75YOP44Kw44Or44O844OX44Gu5L2c5oiQXHJcbiAgICBtYWtlR3JvdXBzKCk7XHJcbiAgICAvLyBqc29u44OV44Kh44Kk44Or44Gu6Kqt44G/6L6844G/XHJcbiAgICBnZXRKc29uRmlsZXMoKS5kb25lKGZ1bmN0aW9uKCkgeztcclxuICAgICAgICAvLyDlj5blvpfjgZfjgZ/jg4fjg7zjgr/jgpLmoLzntI1cclxuICAgICAgICBzZXR0aW5ncyA9IGFyZ3VtZW50c1swXVswXTsgLy8g6Kit5a6aXHJcbiAgICAgICAgLy8g44K344OK44Oq44Kq44OV44Kh44Kk44Or44Gu6Kqt44G/6L6844G/XHJcbiAgICAgICAgZ2V0U2NlbmFyaW9GaWxlcygpLmRvbmUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIOOCt+ODiuODquOCquOBruOCu+ODg+ODiOOCouODg+ODl1xyXG4gICAgICAgICAgICBzY2VuYXJpb3Muc2V0dXAoYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgLy8g5ZCE55S76Z2i44Gu44K544OG44O844OI44Kq44OW44K444Kn44Kv44OI55Sf5oiQXHJcbiAgICAgICAgICAgIHN0YXRlcy5zZXR1cCgpO1xyXG4gICAgICAgICAgICAvLyDlhbHpgJrpg6jlk4Hjga7jgrvjg4Pjg4jjgqLjg4Pjg5dcclxuICAgICAgICAgICAgY29tbW9uLnBhcnRzLmluaXQoKTsgXHJcbiAgICAgICAgICAgIC8vIOODoeOCpOODs+ODq+ODvOODl+OBruioreWumlxyXG4gICAgICAgICAgICBnLnN0YXRlID0gbG9vcDtcclxuICAgICAgICAgICAgLy8g44Kq44O844OX44OL44Oz44Kw55S76Z2i44Gr56e76KGMXHJcbiAgICAgICAgICAgIHNldFN0YXRlKHN0YXRlcy5vcGVuaW5nU3RhdGUpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG4gICAgLmZhaWwoZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZGF0YSk7XHJcbiAgICB9KTtcclxuICAgIGZ1bmN0aW9uIGdldEpzb25GaWxlcygpIHtcclxuICAgICAgICAvLyDoqK3lrprjg5XjgqHjgqTjg6vjgpLoqq3jgb/ovrzjgoBcclxuICAgICAgICBsZXQgcmVxTGlzdCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwganNvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcmVxTGlzdC5wdXNoKCQuZ2V0SlNPTihqc29uc1tpXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJC53aGVuLmFwcGx5KCQsIHJlcUxpc3QpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0U2NlbmFyaW9GaWxlcygpIHtcclxuICAgICAgICAvLyDoqK3lrprjg5XjgqHjgqTjg6vjgpLoqq3jgb/ovrzjgoBcclxuICAgICAgICBsZXQgcmVxTGlzdCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NlbmFyaW9GaWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICByZXFMaXN0LnB1c2goJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogc2NlbmFyaW9GaWxlc1tpXVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAkLndoZW4uYXBwbHkoJCwgcmVxTGlzdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIOODoeOCpOODs+ODq+ODvOODl1xyXG5mdW5jdGlvbiBsb29wKCkge1xyXG4gICAgc3RhdGVMb29wKCk7XHJcbiAgICBmYWRlTG9vcCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdGF0ZUxvb3AoKXt9XHJcblxyXG4vLyDjgrnjg4bjg7zjg4jjga7oqK3lrppcclxuZnVuY3Rpb24gc2V0U3RhdGUoc3RhdGU6IFN0YXRlKSB7XHJcbiAgICBzdGF0ZS5pbml0KCk7XHJcbiAgICBzdGF0ZUxvb3AgPSBzdGF0ZS5sb29wO1xyXG59XHJcblxyXG4vLyDjg6zjgqTjg6Tjg7zku6Pjgo/jgorjgavjgrDjg6vjg7zjg5fkvZzmiJBcclxuZnVuY3Rpb24gbWFrZUdyb3VwcygpIHtcclxuICAgIG9wZW5pbmcucGFydHMuZ3JvdXAgPSBnLmdyb3VwKCk7XHJcbiAgICB0aXRsZS5wYXJ0cy5ncm91cCA9IGcuZ3JvdXAoKTtcclxuICAgIGFkdi5wYXJ0cy5ncm91cCA9IGcuZ3JvdXAoKTtcclxuICAgIGNvbW1vbi5wYXJ0cy5zYXZlV2luZG93Lmdyb3VwID0gZy5ncm91cCgpO1xyXG4gICAgY29tbW9uLnBhcnRzLmNvbmZpZ1dpbmRvdy5ncm91cCA9IGcuZ3JvdXAoKTtcclxuICAgIGNvbW1vbi5wYXJ0cy5jb25maXJtRGlhbG9nLmdyb3VwID0gZy5ncm91cCgpO1xyXG4gICAgY29tbW9uLnBhcnRzLnllc05vRGlhbG9nLmdyb3VwID0gZy5ncm91cCgpO1xyXG4gICAgLy8g44Oe44K544Kv44KS5LiA55Wq5LiK44Gr572u44GPXHJcbiAgICBjb21tb24ucGFydHMuZmFkZU1hc2sgPSBnLnJlY3RhbmdsZSg2NDAsIDk2MCwgXCJibGFja1wiKTtcclxuICAgIGNvbW1vbi5wYXJ0cy5mYWRlTWFzay5hbHBoYSA9IDA7XHJcbn1cclxuXHJcbi8vIOODleOCp+ODvOODieOCpOODs+OAgeOCouOCpuODiFxyXG5sZXQgZmFkZUluRmxnLCBmYWRlT3V0RmxnLCBmYWRlQ291bnRlciwgZmFkZVRpbWUsIGNiO1xyXG5mdW5jdGlvbiBmYWRlSW4odGltZSkge1xyXG4gICAgZmFkZUluRmxnID0gdHJ1ZTtcclxuICAgIGZhZGVDb3VudGVyID0gMDtcclxuICAgIGZhZGVUaW1lID0gdGltZTtcclxuICAgIGNvbW1vbi5wYXJ0cy5mYWRlTWFzay5hbHBoYSA9IDE7XHJcbn1cclxuZnVuY3Rpb24gZmFkZU91dCh0aW1lLCBvbkVuZCkge1xyXG4gICAgZmFkZU91dEZsZyA9IHRydWU7XHJcbiAgICBmYWRlQ291bnRlciA9IDA7XHJcbiAgICBmYWRlVGltZSA9IHRpbWU7XHJcbiAgICBjYiA9IG9uRW5kO1xyXG4gICAgY29tbW9uLnBhcnRzLmZhZGVNYXNrLmFscGhhID0gMDtcclxufVxyXG5mdW5jdGlvbiBmYWRlTG9vcCgpIHtcclxuICAgIGlmKGZhZGVPdXRGbGcpe1xyXG4gICAgICAgIGZhZGVDb3VudGVyICs9IDE7XHJcbiAgICAgICAgY29tbW9uLnBhcnRzLmZhZGVNYXNrLmFscGhhID0gZmFkZUNvdW50ZXIgLyBmYWRlVGltZTtcclxuICAgICAgICBpZihmYWRlQ291bnRlciA+PSBmYWRlVGltZSkge1xyXG4gICAgICAgICAgICBjb21tb24ucGFydHMuZmFkZU1hc2suYWxwaGEgPSAxO1xyXG4gICAgICAgICAgICBmYWRlT3V0RmxnID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmKGZhZGVJbkZsZykge1xyXG4gICAgICAgIGZhZGVDb3VudGVyICs9IDFcclxuICAgICAgICBjb21tb24ucGFydHMuZmFkZU1hc2suYWxwaGEgPSAxIC0gZmFkZUNvdW50ZXIgLyBmYWRlVGltZTtcclxuICAgICAgICBpZihmYWRlQ291bnRlciA+PSBmYWRlVGltZSkge1xyXG4gICAgICAgICAgICBjb21tb24ucGFydHMuZmFkZU1hc2suYWxwaGEgPSAwO1xyXG4gICAgICAgICAgICBmYWRlSW5GbGcgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwibmFtZXNwYWNlIHNhdmVkYXRhVXRpbCB7XHJcbiAgICBsZXQgZGF0YTtcclxuICAgIGNvbnN0IFNBVkVEQVRBX0tFWV9OQU1FID0gJ2Fkdl9zYXZlZGF0YSc7XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0dXAoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IHZhbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNBVkVEQVRBX0tFWV9OQU1FKTtcclxuICAgICAgICAgICAgaWYodmFsID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gbWFrZUVtcHR5RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU0FWRURBVEFfS0VZX05BTUUsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmKHZhbCA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NhdmUgZXJyb3InKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NhdmVkYXRhIGxvYWRlZCBmcm9tIGxvY2FsU3RvcmFnZS4nKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgfSBjYXRjaChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2dldHRpbmcgc2F2ZWRhdGEgZmFpbGVkLicpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBzYXZlKHNsb3QpIHtcclxuICAgICAgICBsZXQgc2NlbmFyaW9TdHIgPSBhZHYuc2NlbmFyaW9NYW5hZ2VyLmdldEN1cnJlbnRTY2VuYXJpb05hbWUoKTtcclxuICAgICAgICBpZihzY2VuYXJpb1N0ciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzYXZlIGZhaWxlZC4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhW3Nsb3RdLnNjZW5hcmlvID0gc2NlbmFyaW9TdHI7XHJcbiAgICAgICAgZGF0YVtzbG90XS5zZW50ZW5jZSA9IGFkdi5zZW50ZW5jZU51bTtcclxuICAgICAgICBsZXQgdGV4dFN0ciA9IGFkdi5nZXRUb3BTZW50ZW5jZSgpO1xyXG4gICAgICAgIGlmKHRleHRTdHIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc2F2ZSBmYWlsZWQuJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGV4dFN0ci5sZW5ndGggPiAxMCkgdGV4dFN0ciA9IHRleHRTdHIuc3Vic3RyaW5nKDAsMTApICsgJ+KApic7XHJcbiAgICAgICAgZGF0YVtzbG90XS50ZXh0ID0gdGV4dFN0clxyXG4gICAgICAgIGxldCBpc29TdHIgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcbiAgICAgICAgZGF0YVtzbG90XS50aW1lXHJcbiAgICAgICAgID0gaXNvU3RyLnN1YnN0cmluZygwLDEwKSArICcgJyArIGlzb1N0ci5zdWJzdHJpbmcoMTEsMTkpO1xyXG4gICAgICAgIGRhdGFbc2xvdF0uY2hhcmExID0gYWR2LmNoYXJhMVN0cjtcclxuICAgICAgICBkYXRhW3Nsb3RdLmNoYXJhMiA9IGFkdi5jaGFyYTJTdHI7XHJcbiAgICAgICAgZGF0YVtzbG90XS5iYWNrZ3JvdW5kID0gYWR2LmJhY2tncm91bmRTdHI7XHJcbiAgICAgICAgZGF0YVtzbG90XS5iZ20gPSBhZHYuYmdtU3RyO1xyXG4gICAgICAgIGRhdGFbc2xvdF0udGFsa2VyID0gYWR2LnBhcnRzLnRhbGtlci5jb250ZW50O1xyXG4gICAgICAgIGRhdGFbc2xvdF0ubWVzc2FnZXMgPSBuZXcgQXJyYXkoNCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICBkYXRhW3Nsb3RdLm1lc3NhZ2VzW2ldID0gYWR2LnBhcnRzLm1lc3NhZ2VzW2ldLmNvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNBVkVEQVRBX0tFWV9OQU1FLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3NhdmVkIG9uIHNsb3QnICsgc2xvdCArICcuJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZ2V0RGF0YSgpKTtcclxuICAgIH1cclxuICAgIC8vIOOCu+ODvOODluOCpuOCo+ODs+ODieOCpuOBq+ODoeODg+OCu+ODvOOCuOOCkuagvOe0jVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGRyYXdTYXZlZGF0YSgpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi5wYXJ0cy5zYXZlV2luZG93LnRleHRbaV0uY29udGVudCA9IGRhdGFbaSsxXS50ZXh0O1xyXG4gICAgICAgICAgICBjb21tb24ucGFydHMuc2F2ZVdpbmRvdy50aW1lW2ldLmNvbnRlbnQgPSBkYXRhW2krMV0udGltZTtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG4gICAgZnVuY3Rpb24gbWFrZUVtcHR5RGF0YSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcIjFcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwic2NlbmFyaW9cIjogXCJcIixcclxuICAgICAgICAgICAgICBcInNlbnRlbmNlXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi44OH44O844K/44GM44GC44KK44G+44Gb44KTXCIsXHJcbiAgICAgICAgICAgICAgXCJ0aW1lXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgXCJjaGFyYTFcIjogXCJcIixcclxuICAgICAgICAgICAgICBcImNoYXJhMlwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgIFwiYmdtXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgXCJ0YWxrZXJcIjogXCJcIixcclxuICAgICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IFtcIlwiLFwiXCIsXCJcIixcIlwiXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIjJcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwic2NlbmFyaW9cIjogXCJcIixcclxuICAgICAgICAgICAgICBcInNlbnRlbmNlXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi44OH44O844K/44GM44GC44KK44G+44Gb44KTXCIsXHJcbiAgICAgICAgICAgICAgXCJ0aW1lXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgXCJjaGFyYTFcIjogXCJcIixcclxuICAgICAgICAgICAgICBcImNoYXJhMlwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgIFwiYmdtXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgXCJ0YWxrZXJcIjogXCJcIixcclxuICAgICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IFtcIlwiLFwiXCIsXCJcIixcIlwiXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIjNcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwic2NlbmFyaW9cIjogXCJcIixcclxuICAgICAgICAgICAgICBcInNlbnRlbmNlXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi44OH44O844K/44GM44GC44KK44G+44Gb44KTXCIsXHJcbiAgICAgICAgICAgICAgXCJ0aW1lXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgXCJjaGFyYTFcIjogXCJcIixcclxuICAgICAgICAgICAgICBcImNoYXJhMlwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgIFwiYmdtXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgXCJ0YWxrZXJcIjogXCJcIixcclxuICAgICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IFtcIlwiLFwiXCIsXCJcIixcIlwiXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIjRcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwic2NlbmFyaW9cIjogXCJcIixcclxuICAgICAgICAgICAgICBcInNlbnRlbmNlXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi44OH44O844K/44GM44GC44KK44G+44Gb44KTXCIsXHJcbiAgICAgICAgICAgICAgXCJ0aW1lXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgXCJjaGFyYTFcIjogXCJcIixcclxuICAgICAgICAgICAgICBcImNoYXJhMlwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgIFwiYmdtXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgXCJ0YWxrZXJcIjogXCJcIixcclxuICAgICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IFtcIlwiLFwiXCIsXCJcIixcIlwiXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIm5hbWVzcGFjZSBhZHYge1xyXG5cclxuICAgIC8vIOOCt+ODiuODquOCquOCkuiqreOBv+i+vOOCgFxyXG4gICAgZXhwb3J0IGNsYXNzIFNjZW5hcmlvTWFuYWdlciB7XHJcbiAgICAgICAgcHJpdmF0ZSBjdXJyZW50U2NlbmFyaW87XHJcbiAgICAgICAgcHJpdmF0ZSBjdXJyZW50U2NlbmFyaW9OYW1lO1xyXG4gICAgICAgIHByaXZhdGUgY3VycmVudFNlbnRlbmNlO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRTY2VuYXJpbyhuYW1lOnN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuYXJpb05hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuYXJpbyA9IHNjZW5hcmlvcy5saXN0W25hbWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyDmlofnq6DjgpLlj5blvpfjgZnjgotcclxuICAgICAgICBnZXRTZW50ZW5jZShpZCkge1xyXG4gICAgICAgICAgICBpZiAoaWQgPj0gdGhpcy5jdXJyZW50U2NlbmFyaW8ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTZW50ZW5jZSA9ICcnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50U2NlbmFyaW9baWRdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNlbnRlbmNlID0gdGhpcy5jdXJyZW50U2NlbmFyaW9baWRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRTZW50ZW5jZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g54++5Zyo44Gu44K344OK44Oq44Kq5ZCN44KS5Y+W5b6X44GZ44KLXHJcbiAgICAgICAgZ2V0Q3VycmVudFNjZW5hcmlvTmFtZSgpIHsgXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRTY2VuYXJpb05hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOePvuWcqOOBruaWh+eroOOCkuWPluW+l+OBmeOCi1xyXG4gICAgICAgIGdldEN1cnJlbnRTZW50ZW5jZSgpIHsgXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRTZW50ZW5jZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVE9ETyB0b05leHTjg6Hjgr3jg4Pjg4lcclxuICAgICAgICAvLyBUT0RPIOODreOCsOS/neWtmOOAgeWPluW+l+ODoeOCveODg+ODiVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIHNjZW5hcmlvcyB7XHJcbiAgICBleHBvcnQgdmFyIGxpc3QgPSB7fVxyXG4gICAgXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0dXAoYXJncykge1xyXG4gICAgICAgIGxldCBrZXksIHZhbHVlO1xyXG4gICAgICAgIC8vIOOCt+ODiuODquOCquODleOCoeOCpOODq+OBjOS4gOOBpOOBruWgtOWQiOOBqDLjgaTku6XkuIrjga7loLTlkIjjgafmp4vpgKDjgYznlbDjgarjgovjga7jgafjgIHlh6bnkIbjgpLliIbjgZHjgotcclxuICAgICAgICBpZihzY2VuYXJpb0ZpbGVzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICBrZXkgPSBzY2VuYXJpb0ZpbGVzWzBdLnJlcGxhY2UoJ3NjZW5hcmlvcy8nLCAnJykucmVwbGFjZSgnLnR4dCcsICcnKTtcclxuICAgICAgICAgICAgLy8g5pS56KGM44Gn5YiG5Ymy44GX44Gm6YWN5YiX5YyWXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGFyZ3NbMF0uc3BsaXQoL1xcclxcbnxcXHJ8XFxuLyk7XHJcbiAgICAgICAgICAgIGxpc3Rba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzY2VuYXJpb0ZpbGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBzY2VuYXJpb0ZpbGVzW2ldLnJlcGxhY2UoJ3NjZW5hcmlvcy8nLCAnJykucmVwbGFjZSgnLnR4dCcsICcnKTtcclxuICAgICAgICAgICAgICAgIC8vIOaUueihjOOBp+WIhuWJsuOBl+OBpumFjeWIl+WMllxyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gYXJnc1tpXVswXS5zcGxpdCgvXFxyXFxufFxccnxcXG4vKTtcclxuICAgICAgICAgICAgICAgIGxpc3Rba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIHNvdW5kcyB7XHJcbiAgICBleHBvcnQgbGV0IHNlO1xyXG4gICAgZXhwb3J0IGxldCBiZ207XHJcbiAgICBcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBzZXR1cCgpIHtcclxuICAgICAgICBzZSA9IHtcclxuICAgICAgICAgICAgJ+aAquOBl+OBhCc6IGcuc291bmQoJ3NvdW5kcy9zZV9tYW91ZGFtYXNoaWlfb25lcG9pbnQxMy5tcDMnKSxcclxuICAgICAgICAgICAgJ+ODj+ODhuODiic6IGcuc291bmQoJ3NvdW5kcy9zZV9tYW91ZGFtYXNoaWlfb25lcG9pbnQyNS5tcDMnKSxcclxuICAgICAgICAgICAgJ+WRhueEtic6IGcuc291bmQoJ3NvdW5kcy9zZV9tYW91ZGFtYXNoaWlfc3lzdGVtNDEubXAzJyksXHJcbiAgICAgICAgICAgICfjg5Tjgrnjg4jjg6snOiBnLnNvdW5kKCdzb3VuZHMvc2VfbWFvdWRhbWFzaGlpX2JhdHRsZV9ndW4wMS5tcDMnKSxcclxuICAgICAgICAgICAgJ+ODkOODg+OCteODqic6IGcuc291bmQoJ3NvdW5kcy9zZV9tYW91ZGFtYXNoaWlfYmF0dGxlMDEubXAzJyksXHJcbiAgICAgICAgICAgICfjgqvjg7zjgr3jg6vpn7MnOiBnLnNvdW5kKCdzb3VuZHMvYnV0dG9uNjMubXAzJyksXHJcbiAgICAgICAgICAgICfjg5zjgr/jg7Pmk43kvZzpn7MnOiBnLnNvdW5kKCdzb3VuZHMvYnV0dG9uNDAubXAzJyksXHJcbiAgICAgICAgICAgICfjgbLjgonjgoHjgY0nOiBnLnNvdW5kKCdzb3VuZHMvT25tdHAtSW5zcGlyYXRpb24wOC0xLm1wMycpLFxyXG4gICAgICAgICAgICAn5q605omTJzogZy5zb3VuZCgnc291bmRzL3NlX21hb3VkYW1hc2hpaV9iYXR0bGUxNi5tcDMnKSxcclxuICAgICAgICAgICAgJ+autOaJk++8kic6IGcuc291bmQoJ3NvdW5kcy9IaXQwMS0yLm1wMycpLFxyXG4gICAgICAgICAgICAn5omL44KS5Y+p44GPJzogZy5zb3VuZCgnc291bmRzL0NsYXAwMS0xLm1wMycpLFxyXG4gICAgICAgICAgICAn44Kt44Op44Oq44O844OzJzogZy5zb3VuZCgnc291bmRzL1Nob3J0YnJpZGdlMDItMS5tcDMnKSxcclxuICAgICAgICAgICAgJ+OCrOOCv+ODsyc6IGcuc291bmQoJ3NvdW5kcy9kb29yLWNsMDEubXAzJyksXHJcbiAgICAgICAgICAgICfjg4njgqInOiBnLnNvdW5kKCdzb3VuZHMvZG9vci1jbDAyLm1wMycpLFxyXG4gICAgICAgICAgICAn44Ks44O844OzJzogZy5zb3VuZCgnc291bmRzL3NlX21hb3VkYW1hc2hpaV9vbmVwb2ludDA2Lm1wMycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJnbSA9IHtcclxuICAgICAgICAgICAgJ+S4jeepjyc6IGcuc291bmQoJ3NvdW5kcy9nYW1lX21hb3VkYW1hc2hpaV82X2Rhbmdlb24wOV9maXhlZC5tcDMnKSxcclxuICAgICAgICAgICAgJ+Wuieepjyc6IGcuc291bmQoJ3NvdW5kcy9Mb3ZlbHlEYXkubXAzJyksXHJcbiAgICAgICAgICAgICdQdXp6bGUnOiBnLnNvdW5kKCdzb3VuZHMvUHV6emxlLm1wMycpLFxyXG4gICAgICAgICAgICAn44OJ44Kt44Ol44Oh44Oz44K/44Oq44O8JzogZy5zb3VuZCgnc291bmRzL1NvY2lhbF9Eb2N1bWVudGFyeTA0Lm1wMycpLFxyXG4gICAgICAgICAgICAn54Sh6Z+zJzogZy5zb3VuZCgnc291bmRzL3NpbGVudC5tcDMnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgY29tbW9uLmJnbSA9IHNvdW5kcy5iZ21bJ+eEoemfsyddO1xyXG4gICAgICAgIGNvbW1vbi5zZSA9IHNvdW5kcy5iZ21bJ+eEoemfsyddO1xyXG4gICAgfVxyXG4gICAgLy8gYmdt44KS5YaN55SfXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gcGxheUJnbSh0YXJnZXQ6c3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi5iZ20gPSBzb3VuZHMuYmdtW3RhcmdldF07XHJcbiAgICAgICAgICAgIGNvbW1vbi5iZ20ubG9vcCA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbW1vbi5iZ20udm9sdW1lID0gY29uZmlnVXRpbC5nZXREYXRhKCdiZ20nKSAvIDU7XHJcbiAgICAgICAgICAgIGNvbW1vbi5iZ20ucGxheUZyb20oMCk7XHJcbiAgICB9XHJcbiAgICAvLyBiZ23jgpLlgZzmraJcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBzdG9wQmdtKCkge1xyXG4gICAgICAgIGNvbW1vbi5iZ20ucGF1c2UoKTtcclxuICAgIH1cclxuICAgIC8vIGJnbeOBrumfs+mHj+OCkuWkieabtFxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNldEJnbVZvbHVtZSh2YWx1ZTpudW1iZXIpIHtcclxuICAgICAgICBjb21tb24uYmdtLnZvbHVtZSA9IHZhbHVlIC8gNTtcclxuICAgIH1cclxuICAgIC8vIHNl44Gu6Z+z6YeP44KS5aSJ5pu0XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0U2VWb2x1bWUodmFsdWU6bnVtYmVyKSB7XHJcbiAgICAgICAgY29tbW9uLnNlLnZvbHVtZSA9IHZhbHVlIC8gNTtcclxuICAgIH1cclxuICAgIC8vIHNl44KS5YaN55SfXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gcGxheVNlKHRhcmdldDpzdHJpbmcpIHtcclxuICAgICAgICBjb21tb24uc2UgPSBzZVt0YXJnZXRdO1xyXG4gICAgICAgIGNvbW1vbi5zZS52b2x1bWUgPSBjb25maWdVdGlsLmdldERhdGEoJ3NlJykgLyA1O1xyXG4gICAgICAgIGNvbW1vbi5zZS5wbGF5KCk7XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2Ugc3RhdGVzIHtcclxuICAgIGV4cG9ydCBsZXQgYWR2U3RhdGU7XHJcbiAgICBleHBvcnQgbGV0IHRpdGxlU3RhdGU7XHJcbiAgICBleHBvcnQgbGV0IG9wZW5pbmdTdGF0ZTtcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBzZXR1cCgpIHtcclxuICAgICAgICBhZHZTdGF0ZSA9IG5ldyBhZHYuQWR2U3RhdGUoKTtcclxuICAgICAgICB0aXRsZVN0YXRlID0gbmV3IHRpdGxlLlRpdGxlU3RhdGUoKTtcclxuICAgICAgICBvcGVuaW5nU3RhdGUgPSBuZXcgb3BlbmluZy5PcGVuaW5nU3RhdGUoKTtcclxuICAgIH1cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xyXG4gICAgICAgIGluaXQoKTtcclxuICAgICAgICBsb29wKCk7XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgYWR2IHtcclxuICAgIGV4cG9ydCBsZXQgbGluZSxcclxuICAgICAgICBtZXNzYWdlQnVmZmVyLFxyXG4gICAgICAgIGNvdW50ZXIsXHJcbiAgICAgICAgZWZmZWN0Q291bnRlcixcclxuICAgICAgICBlZmZlY3RDb3VudGVyTWF4LFxyXG4gICAgICAgIGN1dGluQ291bnRlcixcclxuICAgICAgICBkcmF3U3RvcHBlZCxcclxuICAgICAgICBuZXh0Q2hhcixcclxuICAgICAgICBuZXh0Q291bnQsXHJcbiAgICAgICAgZW5kcm9sbFBpY3MsXHJcbiAgICAgICAgZW5kcm9sbFBpY3NJbmRleDtcclxuXHJcbiAgICBleHBvcnQgZW51bSBFZmZlY3Qge1xyXG4gICAgICAgIGZsYXNoID0gZmFsc2UsXHJcbiAgICAgICAgc2hha2UgPSBmYWxzZSxcclxuICAgICAgICBjdXRpbiA9IGZhbHNlLFxyXG4gICAgICAgIGVuZHJvbGwgPSBmYWxzZVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0Q2hhcmExKHRhcmdldCkge1xyXG4gICAgICAgIHBhcnRzLmNoYXJhMS5zaG93KHBhcnRzLmNoYXJhMS5zdGF0dXNbdGFyZ2V0XSk7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0Q2hhcmEyKHRhcmdldCkge1xyXG4gICAgICAgIHBhcnRzLmNoYXJhMi5zaG93KHBhcnRzLmNoYXJhMi5zdGF0dXNbdGFyZ2V0XSk7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0QmFja2dyb3VuZCh0YXJnZXQpIHtcclxuICAgICAgICBpZih0YXJnZXQgPT09ICcnKSBwYXJ0cy5iYWNrZ3JvdW5kLnNob3coMCk7XHJcbiAgICAgICAgZWxzZSBwYXJ0cy5iYWNrZ3JvdW5kLnNob3cocGFydHMuYmFja2dyb3VuZC5zdGF0dXNbdGFyZ2V0XSk7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0QmdtKHRhcmdldCkge1xyXG4gICAgICAgIGlmKGNvbW1vbi5iZ20pIHNvdW5kcy5zdG9wQmdtKCk7XHJcbiAgICAgICAgaWYodGFyZ2V0ICE9PSAnJykge1xyXG4gICAgICAgICAgICBzb3VuZHMucGxheUJnbSh0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBzZXRUYWxrZXIodGFyZ2V0KSB7XHJcbiAgICAgICAgcGFydHMudGFsa2VyLmNvbnRlbnQgPSB0YXJnZXQ7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0TWVzc2FnZXModGFyZ2V0KSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICBwYXJ0cy5tZXNzYWdlc1tpXS5jb250ZW50ID0gdGFyZ2V0W2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBBZHZEcmF3ZXIge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOOCsuODvOODoOeuoeeQhuOCr+ODqeOCueOBi+OCieaWh+eroOOCkuWPl+OBkeWPluOCiuOAgeaPj+eUu+OCkumWi+Wni+OBmeOCi1xyXG4gICAgICAgIHN0YXJ0RHJhd2luZyhzdHIpIHtcclxuICAgICAgICAgICAgLy8g44OQ44OD44OV44Kh44Gr44Oh44OD44K744O844K444KS5qC857SN44GZ44KLXHJcbiAgICAgICAgICAgIG1lc3NhZ2VCdWZmZXIgPSBzdHI7XHJcbiAgICAgICAgICAgIC8vIOOCs+ODoeODs+ODiOaWh+OBruWgtOWQiOOAgWZhbHNl44KS6L+U44GX44Gm5YaN6YCB44KS5L6d6aC8XHJcbiAgICAgICAgICAgIGlmKG1lc3NhZ2VCdWZmZXIuc3Vic3RyaW5nKDAsIDEpID09PSAnIycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+WFiOmgreOBq+OCs+ODnuODs+ODieOBjOOBguOCi+WgtOWQiOOAgeWHpueQhuOCkuWun+ihjFxyXG4gICAgICAgICAgICB3aGlsZShtZXNzYWdlQnVmZmVyLmluZGV4T2YoJzwnKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDb21tYW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g44CML+OAjeOBruacieeEoeOBp+OAgeaWh+eroOOBrueorumhnuOCkuWIpOWIpVxyXG4gICAgICAgICAgICBpZiAobWVzc2FnZUJ1ZmZlci5pbmRleE9mKCcvJykgIT09IC0xKSB7IC8vIOS8muipseaWh+OBruWgtOWQiFxyXG4gICAgICAgICAgICAgICAgLy8g44Oh44OD44K744O844K444KS55m66KiA6ICF44Go55m66KiA44Gr5YiG6Zui44GZ44KLXHJcbiAgICAgICAgICAgICAgICBwYXJ0cy50YWxrZXIuY29udGVudCA9IG1lc3NhZ2VCdWZmZXIuc3Vic3RyaW5nKDAsIG1lc3NhZ2VCdWZmZXIuaW5kZXhPZignLycpKTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VCdWZmZXIgPSBtZXNzYWdlQnVmZmVyLnN1YnN0cmluZyhtZXNzYWdlQnVmZmVyLmluZGV4T2YoJy8nKSArIDEsIG1lc3NhZ2VCdWZmZXIubGVuZ3RoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHsgLy8g44Gd44Gu5LuW44Gu5aC05ZCIKOWcsOOBruaWh+OBqOino+mHiClcclxuICAgICAgICAgICAgICAgIC8vIOeZuuiogOiAheOCkuepuuOBq+OBmeOCi1xyXG4gICAgICAgICAgICAgICAgcGFydHMudGFsa2VyLmNvbnRlbnQgPSAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOODoeODg+OCu+ODvOOCuOOBruOCr+ODquOColxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcGFydHMubWVzc2FnZXNbaV0uY29udGVudCA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOODoeODg+OCu+ODvOOCuOaPj+eUu+ihjOOCkuS4gOihjOebruOBq+ioreWumlxyXG4gICAgICAgICAgICBsaW5lID0gMDtcclxuICAgICAgICAgICAgLy8g5o+P55S755So44Kr44Km44Oz44K/44KS5Yid5pyf5YyWXHJcbiAgICAgICAgICAgIGNvdW50ZXIgPSAwO1xyXG4gICAgICAgICAgICBlZmZlY3RDb3VudGVyID0gMDtcclxuICAgICAgICAgICAgLy8g44OV44Op44Kw44KS5Yid5pyf5YyWXHJcbiAgICAgICAgICAgIGRyYXdTdG9wcGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIOOCq+OCpuODs+OCv+ebruaomeaZgumWk+OCkuWIneacn+WMllxyXG4gICAgICAgICAgICBuZXh0Q291bnQgPSAyO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOODoeODg+OCu+ODvOOCuOaPj+eUu+WHpueQhlxyXG4gICAgICAgIC8vIOOCsuODvOODoOeuoeeQhuOCr+ODqeOCueOBruODoeOCpOODs+ODq+ODvOODl+OBi+OCieWRvOOBsOOCjOOCi1xyXG4gICAgICAgIGRyYXdNZXNzYWdlKCkge1xyXG4gICAgICAgICAgICAvLyDjgqvjgqbjg7Pjgr/lh6bnkIZcclxuICAgICAgICAgICAgY291bnRlciArPSAxO1xyXG4gICAgICAgICAgICBkb3tcclxuICAgICAgICAgICAgLy8g5paH5a2X44K544OU44O844OJ5pyA5aSn44Gu5aC05ZCI44CB5by35Yi25paH5a2X6YCB44KKXHJcbiAgICAgICAgICAgIGlmKGNvbmZpZ1V0aWwuZ2V0RGF0YSgnc3BlZWQnKSA9PT0gNSkgZHJhd1N0b3BwZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyDkuIDlrprmmYLplpPjgYzntYzpgY7jgZfjgZ/jgonjgIHjg5Djg4Pjg5XjgqHjgYvjgonkuIDmloflrZfjgZrjgaTjg6Hjg4Pjgrvjg7zjgrjjgavliqDjgYjjgabjgYTjgY9cclxuICAgICAgICAgICAgLy8g44Gf44Gg44GX44CB5by35Yi257WC5LqG44Oi44O844OJ44Gu5aC05ZCI44Gv5YWo5paH5a2X44Gu5Yem55CG44KS6KGM44GGXHJcbiAgICAgICAgICAgIGlmICgoZHJhd1N0b3BwZWQgfHwgY291bnRlciA+PSBuZXh0Q291bnQpICYmIG1lc3NhZ2VCdWZmZXIubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDjg5Djg4Pjg5XjgqHjgYvjgonmrKHjga7kuIDmloflrZfjgpLlj5blvpdcclxuICAgICAgICAgICAgICAgIG5leHRDaGFyID0gbWVzc2FnZUJ1ZmZlci5zdWJzdHJpbmcoMCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRDaGFyID09PSAnXFxcXCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g44OQ44OD44Kv44K544Op44OD44K344Ol44Gu5aC05ZCI44CB54m55q6K6KiY5Y+344Gq44Gu44Gn5qyh44Gu5paH5a2X44Gr5b+c44GY44Gm5Yem55CG44KS6KGM44GGXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRDaGFyID0gbWVzc2FnZUJ1ZmZlci5zdWJzdHJpbmcoMSwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFxcbiDmlLnooYzoqJjlj7dcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRDaGFyID09PSAnbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaUueihjOOCkuihjOOBhijkuIvjga7jg6Hjg4Pjgrvjg7zjgrjjg5zjg4Pjgq/jgrnjgpLmj4/nlLvlr77osaHjgavjgZnjgospXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDnibnmroroqJjlj7fjgpLjg5Djg4Pjg5XjgqHjgYvjgonliYrpmaRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VCdWZmZXIgPSBtZXNzYWdlQnVmZmVyLnN1YnN0cmluZygyLCBtZXNzYWdlQnVmZmVyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlho3luLDlh6bnkIZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd01lc3NhZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dENoYXIgPT09ICc8Jyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOOAjDzjgI3jga7loLTlkIjjgIHjgrPjg57jg7Pjg4njgarjga7jgafliIfjgormipzjgYTjgablh6bnkIbjgpLooYzjgYZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDb21tYW5kKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWGjeW4sOWHpueQhlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdNZXNzYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8g6YCa5bi444Gu5paH5a2X5YiX44Gu5Yem55CGXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOOCq+OCpuODs+OCv+ODquOCu+ODg+ODiFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Oh44OD44K744O844K46L+95YqgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzLm1lc3NhZ2VzW2xpbmVdLmNvbnRlbnQgKz0gbmV4dENoYXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODoeODg+OCu+ODvOOCuOODkOODg+ODleOCoeOBi+OCiei/veWKoOa4iOOBv+aWh+Wtl+OCkuWJiumZpFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlQnVmZmVyID0gbWVzc2FnZUJ1ZmZlci5zdWJzdHJpbmcoMSwgbWVzc2FnZUJ1ZmZlci5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDjg6Hjg4Pjgrvjg7zjgrjjga7mqKrluYXjgYzkuIDlrprlgKTku6XkuIrjga7loLTlkIjjgIHmlLnooYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnRzLm1lc3NhZ2VzW2xpbmVdLndpZHRoID4gNTgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0cy5tZXNzYWdlc1tsaW5lXS5jb250ZW50ID0gcGFydHMubWVzc2FnZXNbbGluZV0uY29udGVudC5zdWJzdHJpbmcoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCwgcGFydHMubWVzc2FnZXNbbGluZV0uY29udGVudC5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzLm1lc3NhZ2VzW2xpbmVdLmNvbnRlbnQgKz0gbmV4dENoYXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5paH5a2X44Gu56iu6aGe44Gr44KI44Gj44Gm44CB5qyh44Gu5paH5a2X44KS6KGo56S644GZ44KL44G+44Gn44Gu6ZaT6ZqU44KS5aSJ44GI44KLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0Q2hhciA9PT0gJ+OAgScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRDb3VudCA9IDQwIC0gY29uZmlnVXRpbC5nZXREYXRhKCdzcGVlZCcpICogODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuZXh0Q2hhciA9PT0gJ+OAgicgfHwgbmV4dENoYXIgPT09ICfigKYnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBuZXh0Q2hhciA9PT0gJ++8nycgfHwgbmV4dENoYXIgPT09ICfvvIEnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0Q291bnQgPSA2MCAtIGNvbmZpZ1V0aWwuZ2V0RGF0YSgnc3BlZWQnKSAqIDEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dENvdW50ID0gOCAtIGNvbmZpZ1V0aWwuZ2V0RGF0YSgnc3BlZWQnKSAqIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gd2hpbGUoZHJhd1N0b3BwZWQgJiYgbWVzc2FnZUJ1ZmZlci5sZW5ndGggIT09IDApXHJcbiAgICAgICAgICAgIC8vIOODkOODg+ODleOCoeOBruWGheWuueOCkuOBmeOBueOBpuihqOekuuOBl+OBn+OCieOAgeW+heapn+ODouODvOODieOBq+enu+ihjOOBmeOCi+OBn+OCgXRydWXjgpLov5TjgZfjgablrozkuobjgpLpgJrnn6XjgZnjgotcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VCdWZmZXIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDmj4/nlLvlrozkuobjgb7jgafjga9mYWxzZeOCkui/lOOBmVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDjgqjjg5Xjgqfjgq/jg4jmj4/nlLvlh6bnkIZcclxuICAgICAgICAvLyDjgrLjg7zjg6DnrqHnkIbjgq/jg6njgrnjga7jg6HjgqTjg7Pjg6vjg7zjg5fjgYvjgonlkbzjgbDjgozjgotcclxuICAgICAgICBkcmF3RWZmZWN0KCkge1xyXG4gICAgICAgICAgICAvLyBUT0RPIOOCqOODleOCp+OCr+ODiOeUqOOBruOCr+ODqeOCueOCkuS9nOOCi1xyXG4gICAgICAgICAgICAvLyDjgqjjg5Xjgqfjgq/jg4jph43opIfmmYLjgIHliY3jga7jgqjjg5Xjgqfjgq/jg4jjgpLntYLkuobjgZXjgZvjgarjgYTjgajjgb7jgZrjgYQo44OV44Op44OD44K344Ol55So44Kq44OW44K444Kn44Kv44OI44GM5q6L44Gj44Gf44KK77yfKVxyXG4gICAgICAgICAgICAvLyDoq5bnkIblkI3jgIHjg5Xjg6njgrDjgIHjg6vjg7zjg5flhoXlh6bnkIbjgIHntYLkuobmmYLlh6bnkIbjgIJcclxuICAgICAgICAgICAgLy8g44Kk44Oz44K544K/44Oz44K544KS5L2c5oiQ44GX44Gm6YWN5YiX44Gr5qC857SN44CCXHJcbiAgICAgICAgICAgIC8vIOOBguOBqOWFqOOCqOODleOCp+OCr+ODiOe1guS6huODoeOCveODg+ODieOCkuS9nOaIkFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8g5oi744KK5YCk5aSJ5pWwIOaPj+eUu+OBmeOCi+OCguOBruOBjOOBquOBhOWgtOWQiOOBr3RydWXjgpLov5TjgZlcclxuICAgICAgICAgICAgbGV0IHJldCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIOODleODqeODg+OCt+ODpVxyXG4gICAgICAgICAgICBpZiAoRWZmZWN0LmZsYXNoKSB7XHJcbiAgICAgICAgICAgICAgICBlZmZlY3RDb3VudGVyICs9IDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWZmZWN0Q291bnRlciA+PSBlZmZlY3RDb3VudGVyTWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFydHMuY29sb3JNYXNrLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBFZmZlY3QuZmxhc2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFydHMuY29sb3JNYXNrLmFscGhhID0gMSAtIE1hdGguYWJzKGVmZmVjdENvdW50ZXIgLSAzKSAvIDM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSAvLyDmjK/li5VcclxuICAgICAgICAgICAgaWYgKEVmZmVjdC5zaGFrZSkge1xyXG4gICAgICAgICAgICAgICAgZWZmZWN0Q291bnRlciArPSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVmZmVjdENvdW50ZXIgPj0gZWZmZWN0Q291bnRlck1heCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRzLmJhY2tncm91bmQueCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFydHMuYmFja2dyb3VuZC55ID0gNjA7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFydHMubWVzc2FnZVdpbmRvdy54ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0cy5tZXNzYWdlV2luZG93LnkgPSA2MDA7XHJcbiAgICAgICAgICAgICAgICAgICAgRWZmZWN0LnNoYWtlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRzLmJhY2tncm91bmQueCA9IDEwIC0gZy5yYW5kb21JbnQoMCwyMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFydHMuYmFja2dyb3VuZC55ID0gNzAgLSBnLnJhbmRvbUludCgwLDIwKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0cy5tZXNzYWdlV2luZG93LnggPSAzIC0gZy5yYW5kb21JbnQoMCwzKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0cy5tZXNzYWdlV2luZG93LnkgPSA2MDMgLSBnLnJhbmRvbUludCgwLDMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g44Kr44OD44OI44Kk44Oz5o+P55S7XHJcbiAgICAgICAgICAgIGlmKEVmZmVjdC5jdXRpbikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRlbGV0ZUZ1bmMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0cy5jdXRpbk1lc3NhZ2UudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRzLmV4dHJhVGFwQXJlYS5pbnRlcmFjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1dGluQ291bnRlciA9IDE4MTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGN1dGluQ291bnRlciArPSAxO1xyXG4gICAgICAgICAgICAgICAgcGFydHMuY3V0aW5NZXNzYWdlV2luZG93LnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8g6KGo56S644Ki44OL44Oh44O844K344On44OzXHJcbiAgICAgICAgICAgICAgICBpZihjdXRpbkNvdW50ZXIgPD0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRzLmN1dGluTWVzc2FnZVdpbmRvdy5zY2FsZS54ID0gY3V0aW5Db3VudGVyIC8gNTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjdXRpbkNvdW50ZXIgPD0gMTUpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0cy5jdXRpbk1lc3NhZ2VXaW5kb3cuc2NhbGUueSA9IDAuMiArIChjdXRpbkNvdW50ZXIgLSA1KSAvIDEwICogMC44O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGN1dGluQ291bnRlciA9PT0gMTYpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDooajnpLrlrozkuobvvIvmtojljrvnlKjjgqTjg5njg7Pjg4jlrprnvqlcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0cy5jdXRpbk1lc3NhZ2VXaW5kb3cuc2NhbGUueCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFydHMuY3V0aW5NZXNzYWdlV2luZG93LnNjYWxlLnkgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRzLmN1dGluTWVzc2FnZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0cy5leHRyYVRhcEFyZWEuaW50ZXJhY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOOCv+ODg+ODl+OBl+OBn+OCieOCpuOCo+ODs+ODieOCpua2iOWOu+OCpOODmeODs+ODiOWun+ihjFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRzLmV4dHJhVGFwQXJlYS50YXAgPSBkZWxldGVGdW5jO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGN1dGluQ291bnRlciA9PT0gMTgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5LiA5a6a5pmC6ZaT57WM6YGO5b6M44KC5raI5Y6744Kk44OZ44Oz44OI5a6f6KGMXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlRnVuYygpO1xyXG4gICAgICAgICAgICAgICAgLy8g5raI5Y6755So44Kk44OZ44Oz44OI5a6f6KGM5b6MXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY3V0aW5Db3VudGVyID4gMTgwICYmIGN1dGluQ291bnRlciA8PSAxODUpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0cy5jdXRpbk1lc3NhZ2VXaW5kb3cuc2NhbGUueSA9IDEgLSAoY3V0aW5Db3VudGVyIC0gMTgwKSAvIDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY3V0aW5Db3VudGVyID4gMTg1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRWZmZWN0LmN1dGluID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFydHMuY3V0aW5NZXNzYWdlV2luZG93LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOOCqOODs+ODieODreODvOODq1xyXG4gICAgICAgICAgICBpZihFZmZlY3QuZW5kcm9sbCkge1xyXG4gICAgICAgICAgICAgICAgaWYoZWZmZWN0Q291bnRlciA9PT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFydHMuYWxsTWFzay52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0cy5hbGxNYXNrLmFscGhhID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBlbmRyb2xsUGljcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy9lbmRyb2xsXzEucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcy9lbmRyb2xsXzIucG5nJ1xyXG4gICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kcm9sbFBpY3NJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlZmZlY3RDb3VudGVyICs9IDE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlZmZlY3RDb3VudGVyKTtcclxuICAgICAgICAgICAgICAgIC8vIOihqOekuuOCouODi+ODoeODvOOCt+ODp+ODs1xyXG4gICAgICAgICAgICAgICAgaWYoZWZmZWN0Q291bnRlciA8PSA2MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOODleOCp+ODvOODieOCouOCpuODiO+8iOaal+i7ou+8iVxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRzLmFsbE1hc2suYWxwaGEgPSBlZmZlY3RDb3VudGVyIC8gNjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoZWZmZWN0Q291bnRlciA9PT0gNjEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDnlLvlg4/jgpLjgZnjgbnjgabooajnpLrjgZfjgZ/jgonntYLkuoZcclxuICAgICAgICAgICAgICAgICAgICBpZihlbmRyb2xsUGljcy5sZW5ndGggPT09IGVuZHJvbGxQaWNzSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydHMuYWxsUGljLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRWZmZWN0LmVuZHJvbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDjg5Xjgqfjg7zjg4njgqTjg7Pplovlp4tcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydHMuYWxsTWFzay5hbHBoYSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzLmFsbFBpYy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydHMuYWxsUGljID0gZy5zcHJpdGUoZW5kcm9sbFBpY3NbZW5kcm9sbFBpY3NJbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0cy5hbGxQaWMuYWxwaGEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihlZmZlY3RDb3VudGVyIDw9IDEyMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOODleOCp+ODvOODieOCpOODs++8iOeUu+WDj+ihqOekuu+8iVxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRzLmFsbFBpYy5hbHBoYSA9IChlZmZlY3RDb3VudGVyIC0gNjApIC8gNjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoZWZmZWN0Q291bnRlciA8PSAzMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDlvoXmqZ9cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihlZmZlY3RDb3VudGVyIDw9IDM2MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOODleOCp+ODvOODieOCouOCpuODiFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRzLmFsbFBpYy5hbHBoYSA9IDEgLSAoZWZmZWN0Q291bnRlciAtIDMwMCkgLyA2MDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihlZmZlY3RDb3VudGVyID09IDM2MSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRzLmFsbFBpYy5hbHBoYSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kcm9sbFBpY3NJbmRleCArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGVmZmVjdENvdW50ZXIgPSA2MDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIOaPj+eUu+OCkuW8t+WItue1guS6hlxyXG4gICAgICAgIGVuZERyYXdpbmcoKSB7XHJcbiAgICAgICAgICAgIGRyYXdTdG9wcGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOODkOODg+ODleOCoeOBruWFiOmgreOBq+OBguOCi+OCs+ODnuODs+ODieOCkuaKveWHuuOAgeWun+ihjOOBmeOCi1xyXG4gICAgICAgIGhhbmRsZUNvbW1hbmQoKXtcclxuICAgICAgICAgICAgLy8g44Ko44Op44O844OB44Kn44OD44KvXHJcbiAgICAgICAgICAgIGlmKG1lc3NhZ2VCdWZmZXIuaW5kZXhPZignPCcpICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdzY2VuYXJpbyBlcnJvcjogXFxcIjxcXFwiIGlzIG5vdCBhdCB0b3Agb2YgYXJnJyk7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlQnVmZmVyID0gbWVzc2FnZUJ1ZmZlci5zdWJzdHJpbmcoMSwgbWVzc2FnZUJ1ZmZlci5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYobWVzc2FnZUJ1ZmZlci5pbmRleE9mKCc+JykgPT09IC0xKSB7IC8vIOOAjD7jgI3jgYzopovjgaTjgYvjgonjgarjgYTloLTlkIjjgIHjgqjjg6njg7xcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3NjZW5hcmlvIGVycm9yOiBcXFwiPlxcXCIgbm90IGZvdW5kJyk7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlQnVmZmVyID0gbWVzc2FnZUJ1ZmZlci5zdWJzdGluZygxLCBtZXNzYWdlQnVmZmVyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g44Kz44Oe44Oz44OJ44KS5oq95Ye644GX44Gm5L+d5oyBXHJcbiAgICAgICAgICAgIHZhciBzdHIgPSBtZXNzYWdlQnVmZmVyLnN1YnN0cmluZygxLCBtZXNzYWdlQnVmZmVyLmluZGV4T2YoJz4nKSk7XHJcbiAgICAgICAgICAgIC8vIOODkOODg+ODleOCoeOBi+OCieOCs+ODnuODs+ODieOCkuWJiumZpFxyXG4gICAgICAgICAgICBtZXNzYWdlQnVmZmVyID0gbWVzc2FnZUJ1ZmZlci5zdWJzdHJpbmcobWVzc2FnZUJ1ZmZlci5pbmRleE9mKCc+JykgKyAxLCBtZXNzYWdlQnVmZmVyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIC8vIOOCs+ODnuODs+ODiemDqCjjgrPjg63jg7PjgojjgorliY0p44Go44K/44O844Ky44OD44OI6YOoKOOCs+ODreODs+OCiOOCiuW+jCnjgavliIbpm6JcclxuICAgICAgICAgICAgdmFyIGNtZDtcclxuICAgICAgICAgICAgdmFyIHRhcmdldDtcclxuICAgICAgICAgICAgaWYoc3RyLmluZGV4T2YoJzonKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGNtZCA9IHN0cjtcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9ICcnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY21kID0gc3RyLnN1YnN0cmluZygwLCBzdHIuaW5kZXhPZignOicpKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9IHN0ci5zdWJzdHJpbmcoc3RyLmluZGV4T2YoJzonKSArIDEsIHN0ci5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXRjaCAoY21kKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICflt6YnOlxyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJhMVN0ciA9IHRhcmdldDtcclxuICAgICAgICAgICAgICAgICAgICBzZXRDaGFyYTEodGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ+WPsyc6XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcmEyU3RyID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIHNldENoYXJhMih0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAn5Yq55p6cJzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ID09PSAn44OV44Op44OD44K344OlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFZmZlY3QuZmxhc2ggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0cy5jb2xvck1hc2sudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVmZmVjdENvdW50ZXJNYXggPSA2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0cy5jb2xvck1hc2sueSA9IDYwO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQgPT09ICfmjK/li5UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVmZmVjdC5zaGFrZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVmZmVjdENvdW50ZXJNYXggPSAxMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGFyZ2V0ICsgJ+WKueaenCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAn6IOM5pmvJzpcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kU3RyID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEJhY2tncm91bmQodGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ+aWh+Wtl+OCq+ODg+ODiOOCpOODsyc6XHJcbiAgICAgICAgICAgICAgICAgICAgRWZmZWN0LmN1dGluID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0cy5jdXRpbk1lc3NhZ2VXaW5kb3cuc2NhbGUueCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFydHMuY3V0aW5NZXNzYWdlV2luZG93LnNjYWxlLnkgPSAwLjI7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFydHMuY3V0aW5NZXNzYWdlV2luZG93LnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRzLmN1dGluTWVzc2FnZS5jb250ZW50ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRzLmN1dGluTWVzc2FnZS5zZXRQb3NpdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgMzIwIC0gcGFydHMuY3V0aW5NZXNzYWdlLndpZHRoIC8gMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgMzI4IC0gcGFydHMuY3V0aW5NZXNzYWdlLmhlaWdodCAvIDJcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRzLmN1dGluTWVzc2FnZVdpbmRvdy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY3V0aW5Db3VudGVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ+mfsyc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdW5kcy5zZVt0YXJnZXRdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignc291bmQgJyArIHRhcmdldCArICcgbm90IGZvdW5kLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdW5kcy5wbGF5U2UodGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICfpn7Pmpb0nOlxyXG4gICAgICAgICAgICAgICAgICAgIGJnbVN0ciA9IHRhcmdldDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VuZHMuc3RvcEJnbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc291bmRzLmJnbVt0YXJnZXRdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignYmdtICcgKyB0YXJnZXQgKyAnIG5vdCBmb3VuZC4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRCZ20odGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICfjgqjjg7Pjg4njg63jg7zjg6snOlxyXG4gICAgICAgICAgICAgICAgICAgIEVmZmVjdC5lbmRyb2xsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ+e1guS6hic6XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0RXZlbnRzQWN0aXZpdHkoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1vbi5zaG93Q29uZmlybURpYWxvZygnVGhhbmsgeW91IGZvciBwbGF5aW5nIScsICfjgr/jgqTjg4jjg6vjgavmiLvjgorjgb7jgZknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ29UaXRsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBhZHYge1xyXG4gICAgZXhwb3J0IGVudW0gTW9kZSB7XHJcbiAgICAgICAgc3RhcnRBZHYsXHJcbiAgICAgICAgc3RhbmRieSxcclxuICAgICAgICBkcmF3LFxyXG4gICAgICAgIGxvYWQsXHJcbiAgICAgICAgc2F2ZVxyXG4gICAgfVxyXG4gICAgLy8g44Oi44O844OJ44Gu6Kit5a6aXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0TW9kZShtb2RlOlN0YXRlKXtcclxuICAgICAgICBjdXJyZW50TW9kZSA9IG1vZGU7XHJcbiAgICAgICAgY3VycmVudE1vZGUuaW5pdCgpO1xyXG4gICAgfTtcclxuICAgIC8vIOODouODvOODieOCquODluOCuOOCp+OCr+ODiOOBrueUn+aIkFxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGluaXRNb2RlKCl7XHJcbiAgICAgICAgTW9kZS5kcmF3ID0gbmV3IERyYXdNb2RlKCk7XHJcbiAgICAgICAgTW9kZS5zdGFuZGJ5ID0gbmV3IFN0YW5kYnlNb2RlKCk7XHJcbiAgICAgICAgTW9kZS5zdGFydEFkdiA9IG5ldyBTdGFydEFkdk1vZGUoKTtcclxuICAgICAgICBNb2RlLmxvYWQgPSBuZXcgTG9hZE1vZGUoKTtcclxuICAgICAgICBNb2RlLnNhdmUgPSBuZXcgU2F2ZU1vZGUoKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIC8vQURW6ZaL5aeL44Oi44O844OJXHJcbiAgICBleHBvcnQgY2xhc3MgU3RhcnRBZHZNb2RlIGltcGxlbWVudHMgU3RhdGUge1xyXG4gICAgICAgIGNvdW50ZXI7XHJcbiAgICAgICAgaW5pdCgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ21vZGU6c3RhcnRBZHYnKTtcclxuICAgICAgICAgICAgLy8g5LiA5a6a5pmC6ZaT44CB44Kk44OZ44Oz44OI44KS55Sf5oiQ44GX44Gq44GEXHJcbiAgICAgICAgICAgIHNldEV2ZW50c0FjdGl2aXR5KGZhbHNlKTtcclxuICAgICAgICAgICAgY291bnRlciA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvb3AoKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXIrKztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY291bnRlcik7XHJcbiAgICAgICAgICAgIGlmKGNvdW50ZXIgPiAxNSkge1xyXG4gICAgICAgICAgICAgICAgLy8g44Kk44OZ44Oz44OI44Gu6Kit5a6aXHJcbiAgICAgICAgICAgICAgICAvLyDlkITjg5zjgr/jg7Pjga7jgr/jg4Pjg5fjgqTjg5njg7Pjg4hcclxuICAgICAgICAgICAgICAgIHNldEV2ZW50c0FjdGl2aXR5KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgLy8g44K/44Kk44OI44Or44G4XHJcbiAgICAgICAgICAgICAgICBwYXJ0cy50aXRsZUJ1dHRvbi50YXAgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRFdmVudHNBY3Rpdml0eShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9uWWVzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvbW1vbi5iZ20pIHNvdW5kcy5zdG9wQmdtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhZGVPdXQoNjAsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFkZUluKDYwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdvVGl0bGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9uTm8gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RXZlbnRzQWN0aXZpdHkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1vbi5zaG93WWVzTm9EaWFsb2coXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICfjgr/jgqTjg4jjg6vjgavmiLvjgosnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAn44K/44Kk44OI44Or44Gr5oi744KK44G+44GZ44CCXFxu44K744O844OW44GX44Gm44GE44Gq44GE44OH44O844K/44GvXFxu5aSx44KP44KM44G+44GZ44CCJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25ZZXMsIG9uTm9cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8g44K744O844OWXHJcbiAgICAgICAgICAgICAgICBwYXJ0cy5zYXZlQnV0dG9uLnRhcCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEV2ZW50c0FjdGl2aXR5KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRNb2RlKE1vZGUuc2F2ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDjg63jg7zjg4lcclxuICAgICAgICAgICAgICAgIHBhcnRzLmxvYWRCdXR0b24udGFwID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0RXZlbnRzQWN0aXZpdHkoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldE1vZGUoTW9kZS5sb2FkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOioreWumlxyXG4gICAgICAgICAgICAgICAgcGFydHMuY29uZmlnQnV0dG9uLnRhcCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOioreWumuODnOOCv+ODs1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEV2ZW50c0FjdGl2aXR5KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb21tb24uc2hvd0NvbmZpZ1dpbmRvdyhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RXZlbnRzQWN0aXZpdHkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDlvoXmqZ/jg6Ljg7zjg4njgbhcclxuICAgICAgICAgICAgICAgIHNldE1vZGUoTW9kZS5zdGFuZGJ5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDmj4/nlLvjg6Ljg7zjg4lcclxuICAgIGV4cG9ydCBjbGFzcyBEcmF3TW9kZSBpbXBsZW1lbnRzIFN0YXRlIHtcclxuICAgICAgICBpbml0KCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbW9kZTpkcmF3aW5nJyk7XHJcbiAgICAgICAgICAgIC8vIOasoeOBruaWh+eroOOCkuWPluW+l+OBl+OAgeaPj+eUu+OCr+ODqeOCueOBq+mAgeOCi1xyXG4gICAgICAgICAgICB2YXIgc2VudGVuY2UgPSBzY2VuYXJpb01hbmFnZXIuZ2V0U2VudGVuY2Uoc2VudGVuY2VOdW0pO1xyXG4gICAgICAgICAgICBpZiAoc2VudGVuY2UgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoIWRyYXdlci5zdGFydERyYXdpbmcoc2VudGVuY2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VudGVuY2VOdW0gKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICBzZW50ZW5jZSA9IHNjZW5hcmlvTWFuYWdlci5nZXRTZW50ZW5jZShzZW50ZW5jZU51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbnRlbmNlID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g55S76Z2i44GM44K/44OD44OX44GV44KM44Gf44KJ44CB44Oh44OD44K744O844K45o+P55S744KS5by35Yi257WC5LqGXHJcbiAgICAgICAgICAgIHBhcnRzLnRhcEFyZWEudGFwID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGFwcGVkIG9uIGRyYXcgbW9kZScpXHJcbiAgICAgICAgICAgICAgICBwYXJ0cy50YXBBcmVhLmludGVyYWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBkcmF3ZXIuZW5kRHJhd2luZygpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsb29wKCkge1xyXG4gICAgICAgICAgICAvLyDjg6Hjg4Pjgrvjg7zjgrjmj4/nlLvlh6bnkIZcclxuICAgICAgICAgICAgaWYgKGRyYXdlci5kcmF3TWVzc2FnZSgpICYgZHJhd2VyLmRyYXdFZmZlY3QoKSkge1xyXG4gICAgICAgICAgICAgICAgLy8g5o+P55S744GM57WC5LqG44GX44Gf5aC05ZCI44CB44K544K/44Oz44OQ44Kk44Oi44O844OJ44Gr56e76KGMXHJcbiAgICAgICAgICAgICAgICBzZW50ZW5jZU51bSArPSAxO1xyXG4gICAgICAgICAgICAgICAgc2V0TW9kZShNb2RlLnN0YW5kYnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOOCueOCv+ODs+ODkOOCpOODouODvOODiVxyXG4gICAgZXhwb3J0IGNsYXNzIFN0YW5kYnlNb2RlIGltcGxlbWVudHMgU3RhdGUge1xyXG4gICAgICAgIGluaXQoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtb2RlOnN0YW5kYnknKTtcclxuICAgICAgICAgICAgY291bnRlciA9IDA7XHJcbiAgICAgICAgICAgIC8vIOOCpOODmeODs+ODiOOBrua0u+aAp+WMllxyXG4gICAgICAgICAgICBzZXRFdmVudHNBY3Rpdml0eSh0cnVlKTtcclxuICAgICAgICAgICAgLy8g55S76Z2i44K/44OD44OX44Kk44OZ44Oz44OI44Gu5L2c5oiQXHJcbiAgICAgICAgICAgIHBhcnRzLnRhcEFyZWEudGFwID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGFwcGVkIG9uIHN0YW5kYnkgbW9kZScpO1xyXG4gICAgICAgICAgICAgICAgc2V0RXZlbnRzQWN0aXZpdHkoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgcGFydHMudGFwQXJlYS5pbnRlcmFjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzb3VuZHMucGxheVNlKCfjgqvjg7zjgr3jg6vpn7MnKTtcclxuICAgICAgICAgICAgICAgIHNldE1vZGUoTW9kZS5kcmF3KTtcclxuICAgICAgICAgICAgICAgIHBhcnRzLm5leHRJY29uLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy8g44Oa44O844K46YCB44KK44Ki44Kk44Kz44Oz44Gu6KGo56S6XHJcbiAgICAgICAgICAgIHBhcnRzLm5leHRJY29uLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBwYXJ0cy5uZXh0SWNvbi5zZXRQb3NpdGlvbig1NzAsODgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9vcCgpIHtcclxuICAgICAgICAgICAgY291bnRlcisrO1xyXG4gICAgICAgICAgICAvLyDkuIDlrprmmYLplpPjgZTjgajjgavjgIHjgqvjgqbjg7Pjgr/jg7zjgpLli5XjgYvjgZlcclxuICAgICAgICAgICAgaWYoY291bnRlciA+PSA2MCkge1xyXG4gICAgICAgICAgICAgICAgcGFydHMubmV4dEljb24uc2V0UG9zaXRpb24oNTcwLDg4MCk7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ZXIgPj0gMzApIHtcclxuICAgICAgICAgICAgICAgIHBhcnRzLm5leHRJY29uLnNldFBvc2l0aW9uKDU3MCw4OTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOOCqOODleOCp+OCr+ODiOaPj+eUu+S4reOBq+OCueOCv+ODs+ODkOOCpOODouODvOODieOBq+OBquOBo+OBn+WgtOWQiOOBruOBn+OCgeOBq+OAgeOCqOODleOCp+OCr+ODiOaPj+eUu+WHpueQhuOCkuihjOOBhlxyXG4gICAgICAgICAgICBkcmF3ZXIuZHJhd0VmZmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8g44K744O844OW44Oi44O844OJXHJcbiAgICBleHBvcnQgY2xhc3MgU2F2ZU1vZGUgaW1wbGVtZW50cyBTdGF0ZXtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHt9XHJcbiAgICAgICAgaW5pdCgpIHtcclxuICAgICAgICAgICAgLy8g44K744O844OW44Km44Kj44Oz44OJ44Km44KS6KGo56S644GV44Gb44KLXHJcbiAgICAgICAgICAgbGV0IG9uVGFwID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIC8vIOOCs+ODvOODq+ODkOODg+OCr+OCkuWumue+qeOBl+OBpuOAgVllc05v44OA44Kk44Ki44Ot44Kw44KS6ZaL44GPXHJcbiAgICAgICAgICAgICAgICBsZXQgb25ZZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBzYXZlZGF0YVV0aWwuc2F2ZShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tbW9uLmNsb3NlU2F2ZVdpbmRvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1vbi5zaG93Q29uZmlybURpYWxvZyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ+OCu+ODvOODluWujOS6hicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICfjgrvjg7zjg5bjgZfjgb7jgZfjgZ8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TW9kZShNb2RlLnN0YW5kYnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBvbk5vID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tbW9uLmNsb3NlU2F2ZVdpbmRvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1vbi5zaG93U2F2ZVdpbmRvdyhvblRhcCwgb25DbG9zZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb21tb24uc2hvd1llc05vRGlhbG9nKFxyXG4gICAgICAgICAgICAgICAgICAgICfjgrvjg7zjg5bnorroqo0nLFxyXG4gICAgICAgICAgICAgICAgICAgICfjgrnjg63jg4Pjg4gnICsgaW5kZXggKyAn44Gr44K744O844OW44GX44G+44GZ44CCXFxu44KI44KN44GX44GE44Gn44GZ44GL77yfJyxcclxuICAgICAgICAgICAgICAgICAgICBvblllcyxcclxuICAgICAgICAgICAgICAgICAgICBvbk5vXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBvbkNsb3NlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRFdmVudHNBY3Rpdml0eSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHNldE1vZGUoTW9kZS5zdGFuZGJ5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDjgqbjgqPjg7Pjg4njgqbooajnpLpcclxuICAgICAgICAgICAgY29tbW9uLnNob3dTYXZlV2luZG93KG9uVGFwLCBvbkNsb3NlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9vcCgpIHt9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIOODreODvOODieODouODvOODiVxyXG4gICAgZXhwb3J0IGNsYXNzIExvYWRNb2RlIGltcGxlbWVudHMgU3RhdGV7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7fVxyXG4gICAgICAgIGluaXQoKSB7XHJcbiAgICAgICAgICAgIC8vIOOCpOODmeODs+ODiOWumue+qVxyXG4gICAgICAgICAgICBsZXQgb25UYXAgPSBmdW5jdGlvbihpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgLy8g44Kz44O844Or44OQ44OD44Kv44KS5a6a576p44GX44Gm44CBWWVzTm/jg4DjgqTjgqLjg63jgrDjgpLplovjgY9cclxuICAgICAgICAgICAgICAgIGxldCBvblllcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEV2ZW50c0FjdGl2aXR5KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBmYWRlT3V0KDYwLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFkZUluKDYwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWR2LnNlbGVjdGVkU2F2ZWRhdGEgPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbW9uLmNsb3NlU2F2ZVdpbmRvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxvYWRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBvbk5vID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tbW9uLmNsb3NlU2F2ZVdpbmRvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1vbi5zaG93TG9hZFdpbmRvdyhvblRhcCwgb25DbG9zZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb21tb24uc2hvd1llc05vRGlhbG9nKFxyXG4gICAgICAgICAgICAgICAgICAgICfjg63jg7zjg4nnorroqo0nLFxyXG4gICAgICAgICAgICAgICAgICAgICfjgrnjg63jg4Pjg4gnICsgaW5kZXggKyAn44KS44Ot44O844OJ44GX44G+44GZ44CCXFxu44KI44KN44GX44GE44Gn44GZ44GL77yfJyxcclxuICAgICAgICAgICAgICAgICAgICBvblllcyxcclxuICAgICAgICAgICAgICAgICAgICBvbk5vXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBvbkNsb3NlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRFdmVudHNBY3Rpdml0eSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHNldE1vZGUoTW9kZS5zdGFuZGJ5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDjgqbjgqPjg7Pjg4njgqbooajnpLpcclxuICAgICAgICAgICAgY29tbW9uLnNob3dMb2FkV2luZG93KG9uVGFwLCBvbkNsb3NlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9vcCgpIHt9XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgYWR2e1xyXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBwYXJ0cyB7XHJcbiAgICAgICAgZXhwb3J0IGxldCBcclxuICAgICAgICAgICAvLyDog4zmma9cclxuICAgICAgICAgICBiYWNrZ3JvdW5kLFxyXG4gICAgICAgICAgIC8vIOODoeODg+OCu+ODvOOCuOOCpuOCo+ODs+ODieOCplxyXG4gICAgICAgICAgIG1lc3NhZ2VXaW5kb3csXHJcbiAgICAgICAgICAgLy8g5aC05omA6KGo56S644Gr5L2/44GG44Kr44OD44OI44Kk44Oz44Oh44OD44K744O844K4XHJcbiAgICAgICAgICAgY3V0aW5NZXNzYWdlV2luZG93LFxyXG4gICAgICAgICAgIGN1dGluTWVzc2FnZSxcclxuICAgICAgICAgICAvLyDjg6Hjg4vjg6Xjg7zjg5Djg7zjgajjg5zjgr/jg7NcclxuICAgICAgICAgICBtZW51QmFyLFxyXG4gICAgICAgICAgIHRpdGxlQnV0dG9uLFxyXG4gICAgICAgICAgIHNhdmVCdXR0b24sXHJcbiAgICAgICAgICAgbG9hZEJ1dHRvbixcclxuICAgICAgICAgICBjb25maWdCdXR0b24sXHJcbiAgICAgICAgICAgLy8g44Oh44OD44K744O844K444Km44Kj44Oz44OJ44Km44Gn44OU44Kz44OU44Kz6KiA44Gj44Gm44KL44Ki44OsXHJcbiAgICAgICAgICAgbmV4dEljb24sXHJcbiAgICAgICAgICAgLy8g44Kt44Oj44Op44Kv44K/44O855S75YOPXHJcbiAgICAgICAgICAgY2hhcmExLFxyXG4gICAgICAgICAgIGNoYXJhMixcclxuICAgICAgICAgICAvLyDmnIDliJ3jgavoqq3ovrzkuK3jgavlh7rjgovjg4bjgq3jgrnjg4hcclxuICAgICAgICAgICBsb2FkaW5nVGV4dCxcclxuICAgICAgICAgICAvLyDjg4bjgq3jgrnjg4jjgqbjgqPjg7Pjg4njgqbnhKHjgYTjg6Hjg4Pjgrvjg7zjgrjvvIvkvJroqbHogIVcclxuICAgICAgICAgICBtZXNzYWdlcyxcclxuICAgICAgICAgICB0YWxrZXIsXHJcbiAgICAgICAgICAgLy8g44Kk44OZ44Oz44OI55m76Yyy55So44Gu55S76Z2i44K/44OD44OX6YOo5YiGXHJcbiAgICAgICAgICAgdGFwQXJlYSxcclxuICAgICAgICAgICBleHRyYVRhcEFyZWEsXHJcbiAgICAgICAgICAgLy8g44Ko44OV44Kn44Kv44OI44Gr5L2/55So44GZ44KL44Oe44K544Kv55So5Zuz5b2iXHJcbiAgICAgICAgICAgY29sb3JNYXNrLFxyXG4gICAgICAgICAgIC8vIOWFqOS9k+ODleOCp+ODvOODieOBq+S9v+eUqOOBmeOCi+ODnuOCueOCr+eUqOWbs+W9olxyXG4gICAgICAgICAgIGFsbE1hc2ssXHJcbiAgICAgICAgICAgLy8g5YWo5L2T6KGo56S655S75YOPXHJcbiAgICAgICAgICAgYWxsUGljLFxyXG4gICAgICAgICAgIC8vIGFkdlBhcnRz5YWo5L2T44Gu44Kw44Or44O844OXXHJcbiAgICAgICAgICAgZ3JvdXA7XHJcblxyXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICAvLyDog4zmma/nlLvlg49cclxuICAgICAgICAgICAgcGFydHMuYmFja2dyb3VuZCA9IGJhY2tncm91bmRGYWN0b3J5LmNyZWF0ZVNwcml0ZSgpO1xyXG4gICAgICAgICAgICBwYXJ0cy5iYWNrZ3JvdW5kLnNldFBvc2l0aW9uKC0xMCwgNTApO1xyXG4gICAgICAgICAgICBwYXJ0cy5iYWNrZ3JvdW5kLnNob3coMCk7XHJcbiAgICAgICAgICAgIHBhcnRzLmdyb3VwLmFkZENoaWxkKHBhcnRzLmJhY2tncm91bmQpO1xyXG4gICAgICAgICAgICAvLyDjg6Hjg4Pjgrvjg7zjgrjjgqbjgqPjg7Pjg4njgqbjgIHjg6Hjg4vjg6Xjg7zjg5Djg7xcclxuICAgICAgICAgICAgcGFydHMubWVzc2FnZVdpbmRvdyA9IGcuc3ByaXRlKFwiaW1hZ2VzL21lc3NhZ2VXaW5kb3cucG5nXCIpO1xyXG4gICAgICAgICAgICBwYXJ0cy5tZXNzYWdlV2luZG93LnNldFBvc2l0aW9uKDAsIDYwMCk7XHJcbiAgICAgICAgICAgIHBhcnRzLmdyb3VwLmFkZENoaWxkKHBhcnRzLm1lc3NhZ2VXaW5kb3cpO1xyXG4gICAgICAgICAgICBwYXJ0cy5tZW51QmFyID0gZy5zcHJpdGUoXCJpbWFnZXMvbWVudUJhci5wbmdcIik7XHJcbiAgICAgICAgICAgIHBhcnRzLm1lbnVCYXIuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgICAgIHBhcnRzLmdyb3VwLmFkZENoaWxkKHBhcnRzLm1lbnVCYXIpO1xyXG4gICAgICAgICAgICAvLyDjg5zjgr/jg7NcclxuICAgICAgICAgICAgcGFydHMudGl0bGVCdXR0b24gPSBnLnNwcml0ZShcImFkdl9idXR0b25fMS5naWZcIik7XHJcbiAgICAgICAgICAgIHBhcnRzLnRpdGxlQnV0dG9uLnNldFBvc2l0aW9uKDgsIDUpO1xyXG4gICAgICAgICAgICBwYXJ0cy5ncm91cC5hZGRDaGlsZChwYXJ0cy50aXRsZUJ1dHRvbik7XHJcbiAgICAgICAgICAgIHBhcnRzLnNhdmVCdXR0b24gPSBnLnNwcml0ZShcImFkdl9idXR0b25fMi5naWZcIik7XHJcbiAgICAgICAgICAgIHBhcnRzLnNhdmVCdXR0b24uc2V0UG9zaXRpb24oMTY2LCA1KTtcclxuICAgICAgICAgICAgcGFydHMuZ3JvdXAuYWRkQ2hpbGQocGFydHMuc2F2ZUJ1dHRvbik7XHJcbiAgICAgICAgICAgIHBhcnRzLmxvYWRCdXR0b24gPSBnLnNwcml0ZShcImFkdl9idXR0b25fMy5naWZcIik7XHJcbiAgICAgICAgICAgIHBhcnRzLmxvYWRCdXR0b24uc2V0UG9zaXRpb24oMzI0LCA1KTtcclxuICAgICAgICAgICAgcGFydHMuZ3JvdXAuYWRkQ2hpbGQocGFydHMubG9hZEJ1dHRvbik7XHJcbiAgICAgICAgICAgIHBhcnRzLmNvbmZpZ0J1dHRvbiA9IGcuc3ByaXRlKFwiYWR2X2J1dHRvbl80LmdpZlwiKTtcclxuICAgICAgICAgICAgcGFydHMuY29uZmlnQnV0dG9uLnNldFBvc2l0aW9uKDQ4MiwgNSk7XHJcbiAgICAgICAgICAgIHBhcnRzLmdyb3VwLmFkZENoaWxkKHBhcnRzLmNvbmZpZ0J1dHRvbik7XHJcbiAgICAgICAgICAgIC8vIOOCreODo+ODqeOCr+OCv+ODvOeUu+WDj1xyXG4gICAgICAgICAgICBwYXJ0cy5jaGFyYTEgPSBjaGFyYWN0b3JGYWN0b3J5LmNyZWF0ZVNwcml0ZSgpO1xyXG4gICAgICAgICAgICBwYXJ0cy5jaGFyYTEuc2V0UG9zaXRpb24oMzAsIDYwKTtcclxuICAgICAgICAgICAgcGFydHMuY2hhcmExLmFscGhhID0gMC45O1xyXG4gICAgICAgICAgICBwYXJ0cy5jaGFyYTEuc2hvdygwKTtcclxuICAgICAgICAgICAgcGFydHMuZ3JvdXAuYWRkQ2hpbGQocGFydHMuY2hhcmExKTtcclxuICAgICAgICAgICAgcGFydHMuY2hhcmEyID0gY2hhcmFjdG9yRmFjdG9yeS5jcmVhdGVTcHJpdGUoKTtcclxuICAgICAgICAgICAgcGFydHMuY2hhcmEyLnNldFBvc2l0aW9uKDM4MCwgNjApO1xyXG4gICAgICAgICAgICBwYXJ0cy5jaGFyYTIuYWxwaGEgPSAwLjk7XHJcbiAgICAgICAgICAgIHBhcnRzLmNoYXJhMi5zaG93KDApO1xyXG4gICAgICAgICAgICBwYXJ0cy5ncm91cC5hZGRDaGlsZChwYXJ0cy5jaGFyYTIpO1xyXG4gICAgICAgICAgICAvLyDjg63jg7zjg4fjgqPjg7PjgrDooajnpLpcclxuICAgICAgICAgICAgcGFydHMubG9hZGluZ1RleHQgPSBnLnRleHQoXCJMT0FESU5HLi4uXCIsIFwiMzhweCBtcGx1cy0xYy1yZWd1bGFyXCIsIFwid2hpdGVcIik7XHJcbiAgICAgICAgICAgIHBhcnRzLmxvYWRpbmdUZXh0LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcGFydHMuZ3JvdXAuYWRkQ2hpbGQocGFydHMubG9hZGluZ1RleHQpO1xyXG4gICAgICAgICAgICAvLyDjgq3jg6Pjg6njgq/jgr/jg7zlkI1cclxuICAgICAgICAgICAgcGFydHMudGFsa2VyID0gZy50ZXh0KCcnLCBcIjQycHggbXBsdXMtMWMtcmVndWxhclwiLCBcIndoaXRlXCIpO1xyXG4gICAgICAgICAgICBwYXJ0cy50YWxrZXIucGFkZGluZyA9IDEwO1xyXG4gICAgICAgICAgICAvLyBUT0RPIOODleOCqeODs+ODiOOBq+OCiOOCiuacgOmBqeOBquWgtOaJgOOBq+mFjee9rlxyXG4gICAgICAgICAgICBwYXJ0cy50YWxrZXIuc2V0UG9zaXRpb24oMzUsIDYyMik7XHJcbiAgICAgICAgICAgIHBhcnRzLmdyb3VwLmFkZENoaWxkKHBhcnRzLnRhbGtlcik7XHJcbiAgICAgICAgICAgIC8vIOODoeODg+OCu+ODvOOCuFxyXG4gICAgICAgICAgICBwYXJ0cy5tZXNzYWdlcyA9IG5ldyBBcnJheSg0KTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHBhcnRzLm1lc3NhZ2VzW2ldID0gZy50ZXh0KCcnLCBcIjMycHggbXBsdXMtMWMtcmVndWxhclwiLCBcIndoaXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgcGFydHMubWVzc2FnZXNbaV0uc2V0UG9zaXRpb24oMzAsIDcwNSArIGkgKiA2MCk7XHJcbiAgICAgICAgICAgICAgICBwYXJ0cy5ncm91cC5hZGRDaGlsZChwYXJ0cy5tZXNzYWdlc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g44Oh44OD44K744O844K444Oc44OD44Kv44K544Gu44Ki44Kk44Kz44OzXHJcbiAgICAgICAgICAgIHBhcnRzLm5leHRJY29uID0gZy50ZXh0KFwi4pa8XCIsIFwiMzJweCBtcGx1cy0xYy1yZWd1bGFyXCIsIFwid2hpdGVcIik7XHJcbiAgICAgICAgICAgIHBhcnRzLm5leHRJY29uLnNldFBvc2l0aW9uKDU3MCw5MDApO1xyXG4gICAgICAgICAgICBwYXJ0cy5uZXh0SWNvbi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHBhcnRzLmdyb3VwLmFkZENoaWxkKHBhcnRzLm5leHRJY29uKTtcclxuICAgICAgICAgICAgLy8g44Kq44O844OQ44O844Os44Kk44Km44Kj44Oz44OJ44KmXHJcbiAgICAgICAgICAgIHBhcnRzLmN1dGluTWVzc2FnZVdpbmRvdyA9IGcuc3ByaXRlKFwiaW1hZ2VzL2N1dGluTWVzc2FnZVdpbmRvdy5wbmdcIik7XHJcbiAgICAgICAgICAgIHBhcnRzLmN1dGluTWVzc2FnZVdpbmRvdy5hbmNob3IueCA9IDAuNTtcclxuICAgICAgICAgICAgcGFydHMuY3V0aW5NZXNzYWdlV2luZG93LmFuY2hvci55ID0gMC41O1xyXG4gICAgICAgICAgICBwYXJ0cy5jdXRpbk1lc3NhZ2VXaW5kb3cuc2V0UG9zaXRpb24oMzIwLCAzMzApO1xyXG4gICAgICAgICAgICBwYXJ0cy5jdXRpbk1lc3NhZ2VXaW5kb3cudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBwYXJ0cy5ncm91cC5hZGRDaGlsZChwYXJ0cy5jdXRpbk1lc3NhZ2VXaW5kb3cpO1xyXG4gICAgICAgICAgICBwYXJ0cy5jdXRpbk1lc3NhZ2UgPSBnLnRleHQoXCJcIiwgXCIzMnB4IG1wbHVzLTFjLXJlZ3VsYXJcIiwgXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgcGFydHMuY3V0aW5NZXNzYWdlLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcGFydHMuZ3JvdXAuYWRkQ2hpbGQocGFydHMuY3V0aW5NZXNzYWdlKTtcclxuICAgICAgICAgICAgLy8g5YWI6YCB44KK55So44Gu44K/44OD44OX44Ko44Oq44KiXHJcbiAgICAgICAgICAgIHBhcnRzLnRhcEFyZWEgPSBnLnJlY3RhbmdsZSg2NDAsIDkwMCwgXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgcGFydHMudGFwQXJlYS5zZXRQb3NpdGlvbigwLDYwKTtcclxuICAgICAgICAgICAgcGFydHMudGFwQXJlYS5hbHBoYSA9IDA7XHJcbiAgICAgICAgICAgIHBhcnRzLmdyb3VwLmFkZENoaWxkKHBhcnRzLnRhcEFyZWEpO1xyXG4gICAgICAgICAgICAvLyDliKXjgqTjg5njg7Pjg4jlrprnvqnnlKjjga7jgr/jg4Pjg5fjgqjjg6rjgqJcclxuICAgICAgICAgICAgcGFydHMuZXh0cmFUYXBBcmVhID0gZy5yZWN0YW5nbGUoNjQwLCA5MDAsIFwid2hpdGVcIik7XHJcbiAgICAgICAgICAgIHBhcnRzLmV4dHJhVGFwQXJlYS5zZXRQb3NpdGlvbigwLDYwKTtcclxuICAgICAgICAgICAgcGFydHMuZXh0cmFUYXBBcmVhLmFscGhhID0gMDtcclxuICAgICAgICAgICAgcGFydHMuZXh0cmFUYXBBcmVhLmludGVyYWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHBhcnRzLmdyb3VwLmFkZENoaWxkKHBhcnRzLmV4dHJhVGFwQXJlYSk7XHJcbiAgICAgICAgICAgIC8vIOOCqOODleOCp+OCr+ODiOeUqOOBruOCq+ODqeODvOODnuOCueOCr1xyXG4gICAgICAgICAgICBwYXJ0cy5jb2xvck1hc2sgPSBnLnJlY3RhbmdsZSg2NDAsIDU0MCwgXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgcGFydHMuY29sb3JNYXNrLmFscGhhID0gMDtcclxuICAgICAgICAgICAgcGFydHMuZ3JvdXAuYWRkQ2hpbGQocGFydHMuY29sb3JNYXNrKTtcclxuICAgICAgICAgICAgLy8g5YWo5L2T55S75YOPXHJcbiAgICAgICAgICAgIHBhcnRzLmFsbFBpYyA9IGcuc3ByaXRlKFwiYmdfYmxhY2sucG5nXCIpO1xyXG4gICAgICAgICAgICBwYXJ0cy5hbGxQaWMuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgICAgIHBhcnRzLmFsbFBpYy5hbHBoYSA9IDA7XHJcbiAgICAgICAgICAgIHBhcnRzLmdyb3VwLmFkZENoaWxkKHBhcnRzLmFsbFBpYyk7XHJcbiAgICAgICAgICAgIC8vIOWFqOS9k+ODnuOCueOCr1xyXG4gICAgICAgICAgICBwYXJ0cy5hbGxNYXNrID0gZy5yZWN0YW5nbGUoNjQwLCA5NjAsIFwiYmxhY2tcIik7XHJcbiAgICAgICAgICAgIHBhcnRzLmFsbE1hc2suc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgICAgIHBhcnRzLmFsbE1hc2suYWxwaGEgPSAwO1xyXG4gICAgICAgICAgICBwYXJ0cy5ncm91cC5hZGRDaGlsZChwYXJ0cy5hbGxNYXNrKTtcclxuICAgICAgICAgICAgLy8g44Kw44Or44O844OX44KS5LiN5Y+v6KaW44GrXHJcbiAgICAgICAgICAgIGFkdi5wYXJ0cy5ncm91cC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIGFkdiB7XG4gICAgZXhwb3J0IGxldCBkcmF3ZXIsXG4gICAgICAgICAgICAgICBzY2VuYXJpb01hbmFnZXIsXG4gICAgICAgICAgICAgICBzZW50ZW5jZU51bSxcbiAgICAgICAgICAgICAgIGN1cnJlbnRNb2RlLFxuICAgICAgICAgICAgICAgc2VsZWN0ZWRTYXZlZGF0YSxcbiAgICAgICAgICAgICAgIC8vIOOCu+ODvOODlueUqOaWh+Wtl+WIl1xuICAgICAgICAgICAgICAgY2hhcmExU3RyLFxuICAgICAgICAgICAgICAgY2hhcmEyU3RyLFxuICAgICAgICAgICAgICAgYmFja2dyb3VuZFN0cixcbiAgICAgICAgICAgICAgIGJnbVN0cjtcblxuICAgIGV4cG9ydCBjbGFzcyBBZHZTdGF0ZSBpbXBsZW1lbnRzIFN0YXRlIHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICAvLyDjg6Ljg7zjg4njga7kvZzmiJBcbiAgICAgICAgICAgIGluaXRNb2RlKCk7XG4gICAgICAgICAgICAvLyBUT0RPIOODouOCuOODpeODvOODq+OBruS9nOaIkCAg5raI44GZXG4gICAgICAgICAgICBkcmF3ZXIgPSBuZXcgQWR2RHJhd2VyKCk7XG4gICAgICAgICAgICBzY2VuYXJpb01hbmFnZXIgPSBuZXcgU2NlbmFyaW9NYW5hZ2VyKCk7XG4gICAgICAgICAgICAvLyDlhbHpgJrmj4/nlLvopoHntKDjga7oqK3lrppcbiAgICAgICAgICAgIHBhcnRzLmluaXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0YXRl6ZaL5aeL5pmC44Gu5Yem55CGXG4gICAgICAgIGluaXQoKSB7XG4gICAgICAgICAgICAvLyDlpInmlbDjga7liJ3mnJ/ljJZcbiAgICAgICAgICAgIGNoYXJhMVN0ciA9ICcnO1xuICAgICAgICAgICAgY2hhcmEyU3RyID0gJyc7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kU3RyID0gJyc7XG4gICAgICAgICAgICBiZ21TdHIgPSAnJztcbiAgICAgICAgICAgIGcuYmFja2dyb3VuZENvbG9yID0gMHgwMDAwMDA7XG4gICAgICAgICAgICAvLyDjg57jgrnjgq/jga7kuI3lj6/oppbljJZcbiAgICAgICAgICAgIHBhcnRzLmFsbE1hc2sudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8g44Kw44Or44O844OX44KS5LiN5Y+v6KaW44GrXG4gICAgICAgICAgICAvLyBBRFbnlLvpnaLooajnpLpcbiAgICAgICAgICAgIHBhcnRzLmdyb3VwLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgLy8g5Yid5pyf5L2N572u44Gu6Kit5a6a44O744K744O844OW44OH44O844K/44Gu44Ot44O844OJXG4gICAgICAgICAgICBpZihzZWxlY3RlZFNhdmVkYXRhID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHNjZW5hcmlvTWFuYWdlci5zZXRTY2VuYXJpbygnYWt1bWFfbm9fbWVpc2hpJyk7XG4gICAgICAgICAgICAgICAgc2VudGVuY2VOdW0gPSAwO1xuICAgICAgICAgICAgICAgIHNldENoYXJhMSgnJyk7XG4gICAgICAgICAgICAgICAgc2V0Q2hhcmEyKCcnKTtcbiAgICAgICAgICAgICAgICBzZXRCYWNrZ3JvdW5kKCcnKTtcbiAgICAgICAgICAgICAgICBzZXRUYWxrZXIoJycpO1xuICAgICAgICAgICAgICAgIHNldE1lc3NhZ2VzKFsnJywnJywnJywnJ10pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHNhdmVkYXRhVXRpbC5nZXREYXRhKCk7XG4gICAgICAgICAgICAgICAgc2NlbmFyaW9NYW5hZ2VyLnNldFNjZW5hcmlvKGRhdGFbc2VsZWN0ZWRTYXZlZGF0YV0uc2NlbmFyaW8pO1xuICAgICAgICAgICAgICAgIHNlbnRlbmNlTnVtID0gZGF0YVtzZWxlY3RlZFNhdmVkYXRhXS5zZW50ZW5jZTtcbiAgICAgICAgICAgICAgICBzZXRDaGFyYTEoZGF0YVtzZWxlY3RlZFNhdmVkYXRhXS5jaGFyYTEpO1xuICAgICAgICAgICAgICAgIHNldENoYXJhMihkYXRhW3NlbGVjdGVkU2F2ZWRhdGFdLmNoYXJhMik7XG4gICAgICAgICAgICAgICAgc2V0QmFja2dyb3VuZChkYXRhW3NlbGVjdGVkU2F2ZWRhdGFdLmJhY2tncm91bmQpO1xuICAgICAgICAgICAgICAgIHNldEJnbShkYXRhW3NlbGVjdGVkU2F2ZWRhdGFdLmJnbSk7XG4gICAgICAgICAgICAgICAgc2V0VGFsa2VyKGRhdGFbc2VsZWN0ZWRTYXZlZGF0YV0udGFsa2VyKTtcbiAgICAgICAgICAgICAgICBzZXRNZXNzYWdlcyhkYXRhW3NlbGVjdGVkU2F2ZWRhdGFdLm1lc3NhZ2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOWIneacn+WMluODouODvOODieOBq+enu+ihjFxuICAgICAgICAgICAgc2V0TW9kZShNb2RlLnN0YXJ0QWR2KTtcbiAgICAgICAgfVxuICAgICAgICBsb29wKCkge1xuICAgICAgICAgICAgY3VycmVudE1vZGUubG9vcCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIOS4gOeVquS4iuOBruODoeODg+OCu+ODvOOCuOOCkuWPluW+l+OBmeOCi+OAguOCu+ODvOODluODh+ODvOOCv+eUqOOAglxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRUb3BTZW50ZW5jZSgpIHtcbiAgICAgICAgcmV0dXJuIHBhcnRzLm1lc3NhZ2VzWzBdLmNvbnRlbnQ7XG4gICAgfVxuICAgIC8vIOOCpOODmeODs+ODiOOBruacieWKueODu+eEoeWKueWMllxuICAgIGV4cG9ydCBmdW5jdGlvbiBzZXRFdmVudHNBY3Rpdml0eShhcmc6Ym9vbGVhbikge1xuICAgICAgICBwYXJ0cy50YXBBcmVhLmludGVyYWN0ID0gYXJnO1xuICAgICAgICBwYXJ0cy50aXRsZUJ1dHRvbi5pbnRlcmFjdCA9IGFyZztcbiAgICAgICAgcGFydHMuc2F2ZUJ1dHRvbi5pbnRlcmFjdCA9IGFyZztcbiAgICAgICAgcGFydHMubG9hZEJ1dHRvbi5pbnRlcmFjdCA9IGFyZztcbiAgICAgICAgcGFydHMuY29uZmlnQnV0dG9uLmludGVyYWN0ID0gYXJnO1xuICAgIH1cbiAgICAvLyDjgr/jgqTjg4jjg6vjgavpgbfnp7tcbiAgICBleHBvcnQgZnVuY3Rpb24gZ29UaXRsZSgpIHtcbiAgICAgICAgc291bmRzLnN0b3BCZ20oKTtcbiAgICAgICAgYWR2LnBhcnRzLmdyb3VwLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgc2V0U3RhdGUoc3RhdGVzLnRpdGxlU3RhdGUpO1xuICAgIH1cbiAgICAvLyDjgrnjg4bjg7zjg4jlho3oqq3jgb/ovrzjgb9cbiAgICBleHBvcnQgZnVuY3Rpb24gcmVsb2FkU3RhdGUoKSB7XG4gICAgICAgIHNvdW5kcy5zdG9wQmdtKCk7XG4gICAgICAgIGFkdi5wYXJ0cy5ncm91cC52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHNldFN0YXRlKHN0YXRlcy5hZHZTdGF0ZSk7XG4gICAgfVxufSIsIm5hbWVzcGFjZSBvcGVuaW5nIHtcbiAgICBleHBvcnQgbGV0IGN1cnJlbnRNb2RlO1xuICAgIGV4cG9ydCBlbnVtIE1vZGUge1xuICAgICAgICAgICAgICAgIHN0YXJ0LFxuICAgICAgICAgICAgICAgIHN0YW5kYnlcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0TW9kZShhcmc6IFN0YXRlKXtcbiAgICAgICAgY3VycmVudE1vZGUgPSBhcmc7XG4gICAgICAgIGN1cnJlbnRNb2RlLmluaXQoKTtcbiAgICB9O1xuXG4gICAgLy8g44Oi44O844OJ44Gu5L2c5oiQ44CB5Yid5pyf5YyWXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGluaXRNb2RlKCkge1xuICAgICAgICBNb2RlLnN0YW5kYnkgPSBuZXcgU3RhbmRieU1vZGUoKTtcbiAgICAgICAgTW9kZS5zdGFydCA9IG5ldyBTdGFydE1vZGUoKTtcbiAgICAgICAgY3VycmVudE1vZGUgPSBNb2RlLnN0YXJ0O1xuICAgIH1cblxuICAgIC8vIOOCueOCv+ODs+ODkOOCpFxuICAgIGV4cG9ydCBjbGFzcyBTdGFuZGJ5TW9kZSBpbXBsZW1lbnRzIFN0YXRle1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHt9XG4gICAgICAgIGNvdW50ZXI7XG4gICAgICAgIGluaXQoKSB7XG4gICAgICAgICAgICBjb3VudGVyID0gMDtcbiAgICAgICAgfVxuICAgICAgICBsb29wKCkge1xuICAgICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgICAgaWYoY291bnRlciA+IDYwKSB7XG4gICAgICAgICAgICAgICAgcGFydHMuY2F1dGlvbi5pbnRlcmFjdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcGFydHMuY2F1dGlvbi50YXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydHMuY2F1dGlvbi5pbnRlcmFjdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0cy5ncm91cC52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNldFN0YXRlKHN0YXRlcy50aXRsZVN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDplovlp4tcbiAgICBleHBvcnQgY2xhc3MgU3RhcnRNb2RlIGltcGxlbWVudHMgU3RhdGV7XG4gICAgICAgIGNvdW50ZXI7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge31cbiAgICAgICAgaW5pdCgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdGFydCBhZHYgbW9kZScpO1xuICAgICAgICAgICAgLy8g44Kk44OZ44Oz44OI56aB5q2iXG4gICAgICAgICAgICBnLnBvaW50ZXIudGFwID0gbnVsbDtcbiAgICAgICAgICAgIC8vIOODleOCp+ODvOODieOCpOODs+mWi+Wni1xuICAgICAgICAgICAgZmFkZUluKDYwKTtcbiAgICAgICAgICAgIHNldE1vZGUoTW9kZS5zdGFuZGJ5KTtcbiAgICAgICAgfVxuICAgICAgICBsb29wKCkge1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBvcGVuaW5nIHtcclxuICAgIGV4cG9ydCBuYW1lc3BhY2UgcGFydHMge1xyXG4gICAgICAgIGV4cG9ydCBsZXRcclxuICAgICAgICAgICAgLy8g5rOo5oSP5pu444GNXHJcbiAgICAgICAgICAgIGNhdXRpb24sXHJcbiAgICAgICAgICAgIC8vIOOCsOODq+ODvOODl1xyXG4gICAgICAgICAgICBncm91cFxyXG5cclxuICAgICAgICAvLyDnlLvpnaLpoIXnm67jga7oqK3lrppcclxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgcGFydHMuY2F1dGlvbiA9IGcuc3ByaXRlKFwiaW1hZ2VzL2NhdXRpb24ucG5nXCIpO1xyXG4gICAgICAgICAgICBwYXJ0cy5jYXV0aW9uLnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgICAgICBwYXJ0cy5ncm91cC5hZGRDaGlsZChwYXJ0cy5jYXV0aW9uKTtcclxuICAgICAgICAgICAgcGFydHMuZ3JvdXAudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIG9wZW5pbmcge1xuICAgIGV4cG9ydCBjbGFzcyBPcGVuaW5nU3RhdGUgaW1wbGVtZW50cyBTdGF0ZSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgLy8g44Oi44O844OJ44Gu5L2c5oiQ44CB5Yid5pyf5YyWXG4gICAgICAgICAgICBpbml0TW9kZSgpO1xuICAgICAgICB9XG4gICAgICAgIGluaXQoKSB7XG4gICAgICAgICAgICAvLyDnlLvpnaLpoIXnm67jga7kvZzmiJBcbiAgICAgICAgICAgIHBhcnRzLmluaXQoKTtcbiAgICAgICAgICAgIC8vIOODouODvOODieioreWumlxuICAgICAgICAgICAgc2V0TW9kZShNb2RlLnN0YXJ0KTtcbiAgICAgICAgfVxuICAgICAgICBsb29wKCkge1xuICAgICAgICAgICAgY3VycmVudE1vZGUubG9vcCgpO1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSB0aXRsZSB7XG4gICAgZXhwb3J0IGxldCBjdXJyZW50TW9kZTtcbiAgICBleHBvcnQgZW51bSBNb2RlIHtcbiAgICAgICAgICAgICAgICBzdGFuZGJ5LFxuICAgICAgICAgICAgICAgIGxvYWQsXG4gICAgICAgICAgICAgICAgc3RhcnRBZHZcbiAgICB9XG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNldE1vZGUoYXJnOiBTdGF0ZSl7XG4gICAgICAgIGN1cnJlbnRNb2RlID0gYXJnO1xuICAgICAgICBjdXJyZW50TW9kZS5pbml0KCk7XG4gICAgfTtcblxuICAgIC8vIOODouODvOODieOBruS9nOaIkOOAgeWIneacn+WMllxuICAgIGV4cG9ydCBmdW5jdGlvbiBpbml0TW9kZSgpIHtcbiAgICAgICAgTW9kZS5zdGFuZGJ5ID0gbmV3IFN0YW5kYnlNb2RlKCk7XG4gICAgICAgIE1vZGUuc3RhcnRBZHYgPSBuZXcgU3RhcnRBZHZNb2RlKCk7XG4gICAgICAgIE1vZGUubG9hZCA9IG5ldyBMb2FkTW9kZSgpO1xuICAgICAgICBjdXJyZW50TW9kZSA9IE1vZGUuc3RhbmRieTtcbiAgICB9XG4gICAgZXhwb3J0IGNsYXNzIFN0YW5kYnlNb2RlIGltcGxlbWVudHMgU3RhdGV7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge31cbiAgICAgICAgaW5pdCgpIHtcbiAgICAgICAgICAgIC8vIOeUu+mdouihqOekulxuICAgICAgICAgICAgcGFydHMuZ3JvdXAudmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAvLyDvvIrvvIrvvIrvvIrvvIrjgqTjg5njg7Pjg4jjga7oqK3lrppcbiAgICAgICAgICAgIC8vIOOCueOCv+ODvOODiOODnOOCv+ODs1xuICAgICAgICAgICAgcGFydHMuc3RhcnRCdXR0b24uaW50ZXJhY3QgPSB0cnVlO1xuICAgICAgICAgICAgaWYoIXBhcnRzLnN0YXJ0QnV0dG9uLnRhcCkgcGFydHMuc3RhcnRCdXR0b24udGFwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2V0RXZlbnRzQWN0aXZpdHkoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGFkdi5zZWxlY3RlZFNhdmVkYXRhID0gLTE7XG4gICAgICAgICAgICAgICAgc2V0TW9kZShNb2RlLnN0YXJ0QWR2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOODreODvOODieODnOOCv+ODs1xuICAgICAgICAgICAgcGFydHMubG9hZEJ1dHRvbi5pbnRlcmFjdCA9IHRydWU7XG4gICAgICAgICAgICBpZighcGFydHMubG9hZEJ1dHRvbi50YXApIHBhcnRzLmxvYWRCdXR0b24udGFwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2V0RXZlbnRzQWN0aXZpdHkoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNldE1vZGUoTW9kZS5sb2FkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOioreWumuODnOOCv+ODs1xuICAgICAgICAgICAgcGFydHMuY29uZmlnQnV0dG9uLmludGVyYWN0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmKCFwYXJ0cy5jb25maWdCdXR0b24udGFwKSBwYXJ0cy5jb25maWdCdXR0b24udGFwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2V0RXZlbnRzQWN0aXZpdHkoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGNvbW1vbi5zaG93Q29uZmlnV2luZG93KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzZXRFdmVudHNBY3Rpdml0eSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsb29wKCkge31cbiAgICB9XG5cbiAgICAvLyDjgaTjgaXjgY3jgYvjgolcbiAgICBleHBvcnQgY2xhc3MgTG9hZE1vZGUgaW1wbGVtZW50cyBTdGF0ZXtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7fVxuICAgICAgICBpbml0KCkge1xuICAgICAgICAgICAgLy8g44Kk44OZ44Oz44OI5a6a576pXG4gICAgICAgICAgICBsZXQgb25UYXAgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgICAgIC8vIOOCs+ODvOODq+ODkOODg+OCr+OCkuWumue+qeOBl+OBpuOAgVllc05v44OA44Kk44Ki44Ot44Kw44KS6ZaL44GPXG4gICAgICAgICAgICAgICAgbGV0IG9uWWVzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkdi5zZWxlY3RlZFNhdmVkYXRhID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRzLnN0YXJ0QnV0dG9uLmludGVyYWN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRzLmxvYWRCdXR0b24uaW50ZXJhY3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgc2V0TW9kZShNb2RlLnN0YXJ0QWR2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IG9uTm8gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tbW9uLmNsb3NlU2F2ZVdpbmRvdygpO1xuICAgICAgICAgICAgICAgICAgICBjb21tb24uc2hvd0xvYWRXaW5kb3cob25UYXAsIG9uQ2xvc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb21tb24uc2hvd1llc05vRGlhbG9nKFxuICAgICAgICAgICAgICAgICAgICAn44Ot44O844OJ56K66KqNJyxcbiAgICAgICAgICAgICAgICAgICAgJ+OCueODreODg+ODiCcgKyBpbmRleCArICfjgpLjg63jg7zjg4njgZfjgb7jgZnjgIJcXG7jgojjgo3jgZfjgYTjgafjgZnjgYvvvJ8nLFxuICAgICAgICAgICAgICAgICAgICBvblllcyxcbiAgICAgICAgICAgICAgICAgICAgb25Ob1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgb25DbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNldE1vZGUoTW9kZS5zdGFuZGJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOOCpuOCo+ODs+ODieOCpuihqOekulxuICAgICAgICAgICAgY29tbW9uLnNob3dMb2FkV2luZG93KG9uVGFwLCBvbkNsb3NlKTtcbiAgICAgICAgfVxuICAgICAgICBsb29wKCkge31cbiAgICB9XG5cbiAgICAvLyBBRFbnlLvpnaLplovlp4tcbiAgICBleHBvcnQgY2xhc3MgU3RhcnRBZHZNb2RlIGltcGxlbWVudHMgU3RhdGV7XG4gICAgICAgIGNvdW50ZXI7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge31cbiAgICAgICAgaW5pdCgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdGFydCBhZHYgbW9kZScpO1xuICAgICAgICAgICAgLy8g44Kk44OZ44Oz44OI56aB5q2iXG4gICAgICAgICAgICBnLnBvaW50ZXIudGFwID0gbnVsbDtcbiAgICAgICAgICAgIC8vIOODleOCp+ODvOODieOCouOCpuODiOmWi+Wni1xuICAgICAgICAgICAgZmFkZU91dCg2MCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8g44OV44Kn44O844OJ44Ki44Km44OI5a6M5LqG5b6M44CB44OV44Kn44O844OJ44Kk44Oz44KS5ZG844Gz5Ye644GX44CBQURW55S76Z2i44Gr6YG356e7XG4gICAgICAgICAgICAgICAgcGFydHMuZ3JvdXAudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbW1vbi5jbG9zZVNhdmVXaW5kb3coKTtcbiAgICAgICAgICAgICAgICBmYWRlSW4oNjApO1xuICAgICAgICAgICAgICAgIHNldFN0YXRlKHN0YXRlcy5hZHZTdGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBsb29wKCkge1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSB0aXRsZXtcclxuICAgIGV4cG9ydCBuYW1lc3BhY2UgcGFydHMge1xyXG4gICAgICAgIGV4cG9ydCBsZXRcclxuICAgICAgICAgICAgLy8g44K/44Kk44OI44Or55S75YOPXHJcbiAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICAvLyDjg5zjgr/jg7PnvqRcclxuICAgICAgICAgICAgc3RhcnRCdXR0b24sIGxvYWRCdXR0b24sIGNvbmZpZ0J1dHRvbixcclxuICAgICAgICAgICAgLy8g44Kw44Or44O844OXXHJcbiAgICAgICAgICAgIGdyb3VwLFxyXG4gICAgICAgICAgICAvLyDnlLvlg4/jgb7jgajjgoFcclxuICAgICAgICAgICAgc3ByaXRlcztcclxuXHJcbiAgICAgICAgLy8g55S76Z2i6aCF55uu44Gu6Kit5a6aXHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XHJcbi8vICAgICAgICAgICAgcGFydHMudGl0bGUgPSBnLnRleHQoJ+aCqumtlOOBruWQjeWIuicsICc1NnB4IG1wbHVzLTFjLXJlZ3VsYXInLCAnd2hpdGUnKTtcclxuLy8gICAgICAgICAgICBwYXJ0cy50aXRsZS5zZXRQb3NpdGlvbigoNjQwIC0gcGFydHMudGl0bGUud2lkdGgpIC8gMiAsMjUwKTtcclxuICAgICAgICAgICAgcGFydHMudGl0bGUgPSBnLnNwcml0ZShcImltYWdlcy90aXRsZS5wbmdcIik7XHJcbiAgICAgICAgICAgIHBhcnRzLnRpdGxlLnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgICAgICBwYXJ0cy5zdGFydEJ1dHRvbiA9IGcuc3ByaXRlKFwidGl0bGVfYnV0dG9uXzEuZ2lmXCIpO1xyXG4gICAgICAgICAgICBwYXJ0cy5zdGFydEJ1dHRvbi5zZXRQb3NpdGlvbigoNjQwIC0gcGFydHMuc3RhcnRCdXR0b24ud2lkdGgpIC8gMiAsNDgwKTtcclxuICAgICAgICAgICAgcGFydHMubG9hZEJ1dHRvbiA9IGcuc3ByaXRlKFwidGl0bGVfYnV0dG9uXzIuZ2lmXCIpO1xyXG4gICAgICAgICAgICBwYXJ0cy5sb2FkQnV0dG9uLnNldFBvc2l0aW9uKCg2NDAgLSBwYXJ0cy5sb2FkQnV0dG9uLndpZHRoKSAvIDIgLDYwMCk7XHJcbiAgICAgICAgICAgIHBhcnRzLmNvbmZpZ0J1dHRvbiA9IGcuc3ByaXRlKFwidGl0bGVfYnV0dG9uXzMuZ2lmXCIpO1xyXG4gICAgICAgICAgICBwYXJ0cy5jb25maWdCdXR0b24uc2V0UG9zaXRpb24oKDY0MCAtIHBhcnRzLmNvbmZpZ0J1dHRvbi53aWR0aCkgLyAyICw3MjApO1xyXG4gICAgICAgICAgICBwYXJ0cy5ncm91cC5hZGRDaGlsZChwYXJ0cy50aXRsZSk7XHJcbiAgICAgICAgICAgIHBhcnRzLmdyb3VwLmFkZENoaWxkKHBhcnRzLnN0YXJ0QnV0dG9uKTtcclxuICAgICAgICAgICAgcGFydHMuZ3JvdXAuYWRkQ2hpbGQocGFydHMubG9hZEJ1dHRvbik7XHJcbiAgICAgICAgICAgIHBhcnRzLmdyb3VwLmFkZENoaWxkKHBhcnRzLmNvbmZpZ0J1dHRvbik7XHJcbiAgICAgICAgICAgIHBhcnRzLnNwcml0ZXMgPSBbXTtcclxuICAgICAgICAgICAgcGFydHMuc3ByaXRlcy5wdXNoKHBhcnRzLmdyb3VwKTtcclxuICAgICAgICAgICAgcGFydHMuZ3JvdXAudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAvLyBCR03jga7lho3nlJ9cclxuICAgICAgICAgIC8vICAgIGxldCBtdXNpYyA9IGcuc291bmQoXCJzb3VuZHMvYmdtX21hb3VkYW1hc2hpaV9hY291c3RpYzA3Lm9nZ1wiKTtcclxuICAgICAgICAgIC8vICAgIG11c2ljLmxvb3AgPSB0cnVlO1xyXG4gICAgICAgICAgLy8gICAgbXVzaWMucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSB0aXRsZSB7XG4gICAgZXhwb3J0IGNsYXNzIFRpdGxlU3RhdGUgaW1wbGVtZW50cyBTdGF0ZSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgLy8g44Oi44O844OJ44Gu5L2c5oiQ44CB5Yid5pyf5YyWXG4gICAgICAgICAgICBpbml0TW9kZSgpO1xuICAgICAgICB9XG4gICAgICAgIGluaXQoKSB7XG4gICAgICAgICAgICAvLyDnlLvpnaLpoIXnm67jga7kvZzmiJBcbiAgICAgICAgICAgIHBhcnRzLmluaXQoKTtcbiAgICAgICAgICAgIC8vIOODouODvOODieioreWumlxuICAgICAgICAgICAgc2V0TW9kZShNb2RlLnN0YW5kYnkpO1xuICAgICAgICB9XG4gICAgICAgIGxvb3AoKSB7XG4gICAgICAgICAgICBjdXJyZW50TW9kZS5sb29wKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNldEV2ZW50c0FjdGl2aXR5KGFyZzpib29sZWFuKSB7XG4gICAgICAgIHBhcnRzLnN0YXJ0QnV0dG9uLmludGVyYWN0ID0gYXJnO1xuICAgICAgICBwYXJ0cy5sb2FkQnV0dG9uLmludGVyYWN0ID0gYXJnO1xuICAgICAgICBwYXJ0cy5jb25maWdCdXR0b24uaW50ZXJhY3QgPSBhcmc7XG4gICAgfVxufSJdfQ==
