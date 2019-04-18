// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {isString, isArray, isNull} from 'util';
// import * as cb from 'clipboardy';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "vsc-ttt" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.dottt', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World!');

		//
		// vsc-ttt
		//

		let editor = vscode.window.activeTextEditor;
		if (!editor) {return;}
		do_ttt(editor);
	});

	context.subscriptions.push(disposable);

	// let disposable1 = vscode.commands.registerCommand('extension.tttOnClipboard', () => {
	// 	let code = cb.readSync();
	// 	let text = decodeMix(code);
	// 	// vscode.window.showInformationMessage(`${code} → ${text}`);
	// 	cb.writeSync(text);
	// });

	// context.subscriptions.push(disposable1);

	disposable = vscode.commands.registerCommand('extension.tttOnClipboard', () => {
		vscode.env.clipboard.readText().then((code) => {
			let text = decodeMix(code);
			vscode.env.clipboard.writeText(text);
			// vscode.window.showInformationMessage(`${code} → ${text}`);
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

//
// vsc-ttt
//

const keys: string = "1234567890qwertyuiopasdfghjkl;zxcvbnm,./";
const delimiter: string = ":";

const table = 
  [
	// 1
	[
	  null, null, null, null, null, null, null, null, null, null,
	  "ヲ", "ゥ", "ヴ", "ヂ", "ヅ", "簡", "承", "快", "包", "唱",
	  "ぱ", "ぴ", "ぷ", "ぺ", "ぽ", "朱", "陣", "眼", "執", "岳",
	  "ぁ", "ぃ", "ぅ", "ぇ", "ぉ", "欲", "迫", "留", "替", "還"
	],
	// 2
	[
	  null, null, null, null, null, null, null, null, null, null,
	  "哀", "逢", "宛", "囲", "庵", "徴", "章", "否", "納", "暮",
	  "慰", "為", "陰", "隠", "胃", "遅", "鶴", "繁", "紹", "刑",
	  null, null, null, null, null, "巣", "災", "列", "沼", "更"
	],
	// 3
	[
	  null, null, null, null, null, null, null, null, null, null,
	  "暇", "牙", "壊", "較", "寒", "触", "候", "歯", "頼", "憲",
	  "我", "掛", "敢", "甘", "患", "甲", "鹿", "誌", "夢", "弱",
	  "瓦", null, null, null, null, "茂", "恋", "刻", "?", "占"
	],
	// 4
	[
	  null, null,
	  // 43
	  [
		// 431
		[
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null,
		  null, "鄙", null, null, null, "蛛", null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null
		],
		// 432
		[
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, "甦"
		],
		// 433
		[
		  null, null, null, null, null, null, null, null, null, null,
		  "瑕", "鴉", null, null, "賽", null, null, null, null, null,
		  null, null, "瞰", "嵌", null, "匣", null, null, "儚", null,
		  "礫", null, null, null, null, "藪", null, "哭", "？", null
		],
		// 434
		[
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, "遽", null, null, null, null, null, "寃",
		  null, null, null, null, null, null, null, "聘", null, "靄",
		  null, null, null, null, null, null, null, null, null, "筐"
		],
		// 435
		[
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, "辟", "痺", null, null, null, null, null, null,
		  null, null, null, null, null, null, null, "悸", null, null,
		  null, null, null, null, null, null, null, null, null, null
		],
		// 436
		[
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null,
		  "櫻", null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null
		],
		// 437
		[
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null,
		  "漱", null, null, null, null, null, "皺", null, null, null,
		  null, null, null, "訝", "疇", null, null, null, null, null
		],
		// 438
		[
		  null, null, null, null, null, null, null, null, null, null,
		  "痰", null, null, null, "焉", "輻", null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, "熾", null, null, null, null, null, null, null
		],
		// 439
		[
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, "蟲",
		  null, null, "佛", null, null, "眈", null, null, null, null,
		  null, null, null, null, "翳", null, null, null, null, null
		],
		// 430
		[
		  null, null, null, null, null, null, null, null, null, null,
		  null, "舊", null, "絋", null, "饅", null, null, "痒", null,
		  null, null, null, null, null, "杞", null, "祀", "爬", null,
		  null, null, null, null, "靡", null, null, null, null, null
		],
		// 43q
		[
		  null, null, "隗", null, null, null, null, null, null, null,
		  null, null, null, "颯", null, null, null, null, "癪", null,
		  null, null, null, null, null, null, null, "峙", "佇", null,
		  null, null, null, "讀", null, "孵", "檻", null, "揄", null
		],
		// 43w
		[
		  null, null, "墟", null, null, null, null, "躊", null, null,
		  null, null, "懺", "偕", null, "凭", null, null, "逞", null,
		  null, null, null, null, null, "疼", null, "躓", null, null,
		  null, null, null, null, null, null, null, null, null, null
		],
		// 43e
		[
		  null, null, "鋏", null, null, "躇", null, null, null, null,
		  null, null, "魎", null, "莉", null, null, null, null, null,
		  null, null, null, null, "廣", null, "媚", null, null, null,
		  null, null, null, null, null, null, null, null, null, null
		],
		// 43r
		[
		  null, "渕", null, null, null, null, null, "澹", null, null,
		  null, "釉", null, null, null, null, null, null, null, null,
		  null, "彿", null, null, null, null, "膀", null, null, null,
		  "橙", null, null, null, null, null, "燵", null, null, null
		],
		// 43t
		[
		  null, null, null, null, null, null, null, "炒", null, null,
		  null, null, "！", null, "揶", null, null, null, null, null,
		  null, null, null, "螢", null, "僭", null, "條", null, null,
		  "褪", null, null, null, null, null, null, null, null, null
		],
		// 43y
		[
		  null, null, null, null, null, null, null, null, null, "爛",
		  null, null, null, "珈", null, null, null, null, "檬", null,
		  "鍮", null, "謳", "嗚", null, null, null, null, null, "麒",
		  null, null, "薔", null, null, null, null, null, null, null
		],
		// 43u
		[
		  "竟", null, null, null, null, null, "彗", null, "孕", "朧",
		  "徊", null, null, null, null, null, null, null, null, null,
		  null, "薇", "４", "琥", null, null, null, null, "罠", null,
		  null, "靱", null, "癇", null, "翅", null, null, null, null
		],
		// 43i
		[
		  null, null, null, "軋", null, null, "晰", null, "茹", null,
		  null, "區", null, null, null, null, null, "雉", null, null,
		  "魍", null, "）", "６", null, null, null, null, null, null,
		  null, null, null, null, null, "涸", null, "奢", null, null
		],
		// 43o
		[
		  "毯", null, null, "惠", null, null, "韆", null, null, "鑪",
		  "嶌", null, "揉", "撥", null, null, null, null, null, null,
		  null, "贄", "卍", "學", null, "繹", null, null, null, null,
		  null, null, "經", null, "絨", null, null, null, null, null
		],
		// 43p
		[
		  null, null, null, null, null, null, null, null, null, null,
		  null, "沐", null, null, null, "譚", null, null, null, null,
		  "掟", null, null, "朦", null, null, null, "嬌", null, "罹",
		  "仄", "黎", null, null, "乖", null, null, null, null, null
		],
		// 43a
		[
		  null, null, "綺", null, null, null, null, null, "稟", null,
		  null, null, "餡", null, null, null, null, null, null, "蛉",
		  null, "咤", null, null, null, null, null, null, null, null,
		  null, null, null, "餉", null, null, null, null, null, null
		],
		// 43s
		[
		  null, null, null, null, null, "嘔", null, null, null, null,
		  null, "凰", null, null, "珀", "聲", null, "鑽", null, null,
		  null, null, "埃", null, null, null, null, "嗜", null, null,
		  null, null, null, "俯", null, null, null, null, null, null
		],
		// 43d
		[
		  null, null, null, null, null, null, null, null, null, "焙",
		  null, null, "抒", "棘", null, null, null, null, null, null,
		  null, null, "闊", null, "咥", null, "幇", null, null, null,
		  null, null, null, null, null, null, null, "囮", null, null
		],
		// 43f
		[
		  null, null, null, null, null, null, null, null, null, null,
		  "鵺", null, null, null, null, null, "昴", null, null, "愕",
		  null, "聚", null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, "騙", "榮", null, "址"
		],
		// 43g
		[
		  null, null, null, null, null, "亞", null, "謗", null, "笏",
		  null, "應", null, "攪", "毬", null, "藝", null, null, null,
		  "眞", null, "滲", null, "椒", null, null, "諍", "曰", "澁",
		  null, null, null, null, null, null, null, null, null, "瞠"
		],
		// 43h
		[
		  null, null, "熙", null, null, null, "竄", null, null, null,
		  null, null, "７", null, null, "躾", "蹙", null, null, null,
		  "３", null, null, null, null, null, "翹", "頽", null, null,
		  "徨", "誦", null, null, null, null, null, null, null, null
		],
		// 43j
		[
		  null, null, null, null, null, null, null, null, null, null,
		  "隕", null, null, null, "櫟", null, null, null, "壜", null,
		  null, "栞", null, null, null, null, "鐵", null, "戌", "蠅",
		  null, null, "菻", null, null, null, null, null, null, null
		],
		// 43k
		[
		  null, "蜩", null, null, null, null, null, null, null, null,
		  null, "几", "（", null, "８", "穽", null, null, null, "顰",
		  null, null, null, "０", null, "冰", null, null, "誅", null,
		  "圓", null, "―", "９", "會", null, "裔", null, null, null
		],
		// 43l
		[
		  null, "閾", "咎", "灌", null, null, null, null, null, null,
		  null, null, null, "國", null, null, null, null, "菫", null,
		  null, "弌", "５", null, "舐", "籐", null, null, "泄", null,
		  null, null, null, null, null, null, null, null, null, null
		],
		// 43;
		[
		  null, null, null, null, null, null, null, null, null, null,
		  "檸", null, "斂", null, null, null, null, "谺", null, null,
		  "縷", "姜", "１", "２", null, null, null, null, "憫", null,
		  null, null, null, null, null, null, "狡", null, "躰", null
		],
		// 43z
		[
		  null, null, null, null, null, "噤", "絣", "砒", null, null,
		  null, null, "樅", null, "苺", null, null, null, "戮", null,
		  "琲", null, null, null, null, null, "橇", null, null, null,
		  null, "拌", "齊", null, null, null, null, null, null, null
		],
		// 43x
		[
		  null, null, null, null, null, "逍", null, null, null, null,
		  "棗", null, "猾", null, null, null, null, null, null, null,
		  null, "柩", null, "澤", null, null, null, "淺", null, null,
		  null, null, null, null, null, null, "茉", "祓", null, null
		],
		// 43c
		[
		  null, null, null, null, null, null, null, null, "渾", null,
		  null, null, null, null, null, null, null, null, null, "鞦",
		  null, null, "簒", "暈", null, null, "呻", null, null, null,
		  "證", null, null, null, null, "瞼", null, "冪", null, "蝸"
		],
		// 43v
		[
		  null, null, null, null, null, "鉤", null, null, null, "徘",
		  null, null, null, "紆", null, null, null, "腱", null, "翡",
		  "敲", "棹", "絆", "蜻", null, null, null, "烙", "贅", "膠",
		  "頷", null, null, null, null, null, null, null, null, null
		],
		// 43b
		[
		  null, null, null, null, null, null, null, "屏", null, null,
		  null, null, "寥", null, null, "屁", "櫂", "蠍", null, null,
		  null, "捏", null, null, null, "繚", null, null, "翔", null,
		  "％", null, "煌", null, null, "瀾", null, null, "游", "單"
		],
		// 43n
		[
		  "憑", null, null, null, null, null, null, null, null, null,
		  null, "苻", null, null, null, null, "遙", null, "囁", null,
		  null, null, null, "貶", null, null, null, null, "瑙", null,
		  "濱", null, "胚", "矮", null, null, null, "欒", null, null
		],
		// 43m
		[
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, "肛", null, null, null, null, null, null, null,
		  null, null, "儘", null, null, null, null, null, null, null,
		  null, null, null, "訛", "賣", null, null, null, "檜", null
		],
		// 43,
		[
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, "埓", null, null, null,
		  null, "萬", null, null, null, null, null, "燻", "踵", null,
		  null, "瑪", null, null, null, null, "～", null, "拗", null
		],
		// 43.
		[
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, "炬", null, "唸", null, null,
		  null, "彷", "壺", null, null, "苹", null, null, null, null,
		  null, null, null, "眩", null, null, "呟", null, null, "芻"
		],
		// 43/
		[
		  null, null, null, null, "辯", null, null, null, null, null,
		  "轢", null, "睨", null, null, null, null, "慟", null, "邊",
		  "魑", null, null, null, null, "樂", null, null, null, "胱",
		  null, null, null, null, null, null, null, null, null, null
		]
	  ],
	  null, null, null, null, null, null, null,
	  "啓", "掲", "携", "劇", "賢", "宗", "途", "筆", "逃", "勉",
	  "兼", "嫌", "顕", "牽", "厳", "致", "貨", "招", "卸", "雲",
	  null, null, null, null, null, "述", "脳", "豆", "辞", "箱"
	],
	// 5
	[
	  null, null, null, null, null, null, null, null, null, null,
	  "把", "伐", "避", "卑", "藩", "植", "複", "里", "寝", "罪",
	  "菱", "紐", "描", "憤", "弊", "汎", "絡", "季", "阿", "窓",
	  null, null, null, null, null, "朗", "老", "看", "献", "矢"
	],
	// 6
	[
	  null, null, null, null, null, null, null, null, null, null,
	  "酸", "貿", "攻", "盤", "汽", null, null, null, null, null,
	  "桜", "典", "採", "君", "犯", null, null, null, null, null,
	  "呼", "紀", "房", "去", "秒", null, null, null, null, null
	],
	// 7
	[
	  null, null, null, null, null, null, null, null, null, null,
	  "昼", "捜", "焼", "帯", "換", "索", "冊", "皿", "賛", null,
	  "瀬", "博", "謡", "純", "余", "衰", "趨", "垂", "粋", "寸",
	  "幅", "破", "績", "疑", "範", null, null, null, null, null
	],
	// 8
	[
	  null, null, null, null, null, null, null, null, null, null,
	  "炭", "異", "闘", "易", "延", "射", "需", "輯", "瞬", "盾",
	  "鳥", "筋", "希", "副", "堀", "滋", "湿", "甚", null, "瞳",
	  "歓", "郡", "識", "ぢ", "核", null, null, null, null, null
	],
	// 9
	[
	  null, null, null, null, null, null, null, null, null, null,
	  "稲", "隣", "奈", "速", "雪", "濁", "詑", "蓄", "貯", "虫",
	  "催", "忠", "仏", "盟", "肩", "沈", "添", "徹", "爪", "陶",
	  "功", "抗", "属", "綿", "影", null, null, null, null, null
	],
	// 0
	[
	  null, null, null, null, null, null, null, null, null, null,
	  "湯", "旧", "夕", "拡", "互", "慢", "迷", "戻", "羊", null,
	  "障", "乳", "察", "標", "療", "己", "已", "巳", "巴", null,
	  "盗", "幡", "衣", "離", "麻", null, null, null, null, null
	],
	// q
	[
	  "ヮ", "丑", "鬼", "孤", "奉", "湖", "端", "刷", "震", "弘",
	  "果", "概", "武", "風", "細", "害", "撃", "浴", "積", "故",
	  "収", "若", "指", "ぎ", "思", "病", "常", "寺", "停", "河",
	  "徳", "械", "帝", "読", "族", "帰", "監", "竹", "ゅ", "志"
	],
	// w
	[
	  "ヰ", "臼", "虚", "誇", "某", "礼", "飾", "寿", "扱", "痛",
	  "告", "買", "残", "階", "古", "賃", "折", "秀", "程", "鉱",
	  "際", "雄", "氏", "格", "術", "終", "張", "質", "領", "置",
	  "渡", "刊", "始", "鈴", "丁", "庁", "寄", "注", "修", "抜"
	],
	// e
	[
	  "ヱ", "宴", "狭", "黄", "貌", "著", "郵", "順", "片", "票",
	  "策", "詳", "両", "能", "利", "整", "追", "糸", "断", "提",
	  "太", "査", "丸", "次", "広", "起", "薬", "づ", "容", "供",
	  "守", "訪", "了", "恐", "未", "昨", "裁", "介", "究", "航"
	],
	// r
	[
	  "ヵ", "縁", "脅", "后", "卜", "移", "塩", "危", "札", "訴",
	  "首", "由", "在", "論", "ペ", "軽", "隊", "春", "低", "児",
	  "園", "ふ", "続", "習", "門", "路", "防", "港", "玉", "試",
	  "登", "融", "極", "督", "才", "跡", "達", "具", "答", "層"
	],
	// t
	[
	  "ヶ", "曳", "驚", "耕", null, "郷", "群", "砂", "乞", "遺",
	  "農", "死", "!", "増", "ゃ", "評", "角", "幸", "減", "敷",
	  "船", "賞", "ェ", "火", "聞", "越", "得", "条", "右", "席",
	  "退", "雨", "熱", "況", "返", "ゲ", "芝", "失", "養", "深"
	],
	// y
	[
	  "請", "尚", "舎", "布", "姿", null, null, "庶", null, "欄",
	  "歩", "キ", "や", "コ", "ナ", "佐", "接", "記", "モ", "無",
	  "中", "わ", "う", "あ", "本", "む", "ケ", "話", "べ", "期",
	  "店", "全", "バ", "後", "問", "洗", "響", "司", "復", "担"
	],
	// u
	[
	  "境", "賀", "喜", "苦", "絶", null, "星", "粧", "乃", "龍",
	  "回", "せ", "出", "山", "金", "法", "備", "朝", "資", "石",
	  "ス", "ラ", "4", "こ", "さ", "南", "式", "座", "民", "ゾ",
	  "持", "じ", "部", "間", "ム", "羽", "忘", "迎", "並", "陸"
	],
	// i
	[
	  "系", "岸", "幹", "圧", "密", null, "析", "丈", "如", "略",
	  "務", "区", "タ", "者", "マ", "数", "最", "知", "士", "屋",
	  "も", "東", ")", "6", "ら", "原", "戦", "線", "ソ", "歳",
	  "町", "自", "六", "場", "七", "個", "討", "華", "浦", "巻"
	],
	// o
	[
	  "探", "責", "丘", "恵", "秘", null, "遷", "称", "尼", "慮",
	  "島", "百", "手", "発", "和", "郎", "急", "ワ", "費", "解",
	  "お", "生", "十", "学", "高", "駅", "関", "ダ", "点", "強",
	  "所", "議", "経", "ニ", "住", "医", "史", "許", "ユ", "競"
	],
	// p
	[
	  "象", "漁", "糖", "固", "押", null, "宣", "蒸", "帳", "累",
	  "開", "木", "保", "立", "女", "談", "験", "送", "ィ", "募",
	  "定", "ろ", "リ", "月", "シ", "物", "男", "橋", "遇", "係",
	  "ほ", "明", "動", "産", "北", "静", "環", "補", "冷", "護"
	],
	// a
	[
	  "ゎ", "於", "奇", "巧", null, "償", "紅", "舗", "輪", "則",
	  "報", "音", "案", "横", "崎", "服", "変", "限", "逆", "令",
	  "種", "宅", "料", "受", "英", "勢", "輸", "基", "足", "婦",
	  "件", "宮", "局", "向", "割", "億", "色", "左", "ぬ", "根"
	],
	// s
	[
	  "ゐ", "汚", "既", "克", null, "欧", "傷", "充", "倒", "存",
	  "紙", "王", "曲", "興", "白", "声", "審", "研", "企", "違",
	  "岡", "熟", "土", "予", "ボ", "必", "形", "好", "草", "段",
	  "友", "伊", "頭", "府", "ぶ", "録", "貸", "態", "展", "様"
	],
	// d
	[
	  "ゑ", "乙", "菊", "懇", null, "努", "豪", "喫", "操", "倍",
	  "館", "放", "情", "刺", "ぐ", "任", "改", "労", "精", "装",
	  "結", "待", "活", "切", "加", "講", "助", "味", "築", "衛",
	  "卒", "求", "配", "富", "番", "赤", "販", "花", "警", "独"
	],
	// f
	[
	  null, "穏", "却", "困", null, "底", "維", "腕", "柄", "牛",
	  "夜", "々", "引", "側", "官", "検", "昇", "統", "ざ", "然",
	  "進", "取", "ね", "育", "室", "愛",
	  // fj
	  [
		// fj1
		[
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null
		],
		// fj2
		[
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null
		],
		// fj3
		[
		  null, null, null, null, null, null, null, null, null, null,
		  "Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ",
		  "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ",
		  "Φ", "Χ", "Ψ", "Ω", null, null, null, null, null, null
		],
		// fj4
		[
		  null, null, null, null, null, null, null, null, null, null,
		  "Ａ", "Ｂ", "Ｃ", "Ｄ", "Ｅ", "Ｆ", "Ｇ", "Ｈ", "Ｉ", "Ｊ",
		  "Ｋ", "Ｌ", "Ｍ", "Ｎ", "Ｏ", "Ｐ", "Ｑ", "Ｒ", "Ｓ", "Ｔ",
		  "Ｕ", "Ｖ", "Ｗ", "Ｘ", "Ｙ", "Ｚ", null, null, null, null
		],
		// fj5
		[
		  "Э", "Ю", "Я", null, null, null, null, null, null, null,
		  "А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И",
		  "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т",
		  "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь"
		],
		// fj6
		[
		  "э", "ю", "я", null, null, null, null, null, null, null,
		  "а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и",
		  "й", "к", "л", "м", "н", "о", "п", "р", "с", "т",
		  "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь"
		],
		// fj7
		[
		  null, null, null, null, null, null, null, null, null, null,
		  "ａ", "ｂ", "ｃ", "ｄ", "ｅ", "ｆ", "ｇ", "ｈ", "ｉ", "ｊ",
		  "ｋ", "ｌ", "ｍ", "ｎ", "ｏ", "ｐ", "ｑ", "ｒ", "ｓ", "ｔ",
		  "ｕ", "ｖ", "ｗ", "ｘ", "ｙ", "ｚ", null, null, null, null
		],
		// fj8
		[
		  null, null, null, null, null, null, null, null, null, null,
		  "α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ",
		  "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ",
		  "φ", "χ", "ψ", "ω", null, null, null, null, null, null
		],
		// fj9
		[
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null
		],
		// fj0
		[
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null
		],
		// fjq
		[
		  null, null, null, null, null, "肱", "腔", "膏", "砿", "閤",
		  "叡", "餌", "荏", "云", "噂", "鴻", "劫", "壕", "濠", "轟",
		  "穎", "盈", "瑛", "洩", "嬰", "麹", "鵠", "漉", "甑", "忽",
		  "奄", "堰", "厭", "榎", "頴", "惚", "狛", "此", "坤", "梱"
		],
		// fjw
		[
		  null, null, null, null, null, "梧", "檎", "瑚", "醐", "鯉",
		  "窺", "鵜", "卯", "迂", "烏", "佼", "倖", "勾", "喉", "垢",
		  "蔚", "欝", "唄", "嘘", "碓", "宏", "巷", "庚", "昂", "晃",
		  "閏", "瓜", "厩", "姥", "鰻", "杭", "梗", "浩", "糠", "紘"
		],
		// fje
		[
		  null, null, null, null, null, "捲", "硯", "鍵", "鹸", "絃",
		  "郁", "亥", "謂", "萎", "畏", "舷", "諺", "乎", "姑", "狐",
		  "允", "鰯", "茨", "溢", "磯", "糊", "袴", "股", "胡", "菰",
		  "吋", "蔭", "胤", "淫", "咽", "虎", "跨", "鈷", "伍", "吾"
		],
		// fjr
		[
		  null, null, null, null, null, "袈", "祁", "圭", "珪", "慧",
		  "鮎", "綾", "絢", "飴", "虻", "桂", "畦", "稽", "繋", "罫",
		  "闇", "按", "袷", "粟", "或", "荊", "詣", "頚", "戟", "隙",
		  "椅", "惟", "夷", "杏", "鞍", "桁", "訣", "倦", "喧", "拳"
		],
		// fjt
		[
		  null, null, null, null, null, "矩", "躯", "駈", "駒", "喰",
		  "葵", "姶", "挨", "娃", "唖", "寓", "串", "櫛", "釧", "屑",
		  "葦", "旭", "渥", "穐", "茜", "窟", "沓", "轡", "窪", "熊",
		  "姐", "斡", "梓", "鯵", "芦", "隈", "粂", "栗", "鍬", "卦"
		],
		// fjy
		[
		  "庇", "匪", "蕃", "磐", "挽", null, null, null, null, null,
		  "簸", "樋", "誹", "緋", "斐", "蒼", "鎗", "捉", "袖", "其",
		  "柊", "眉", "琵", "毘", "枇", "揃", "遜", "汰", "唾", "柁",
		  "肘", "膝", "髭", "疋", "稗", "舵", "楕", "陀", "騨", "堆"
		],
		// fju
		[
		  "媛", "桧", "逼", "畢", "弼", null, null, null, null, null,
		  "廟", "豹", "瓢", "彪", "謬", "岱", "戴", "腿", "苔", "黛",
		  "鰭", "蛭", "蒜", "鋲", "錨", "鯛", "醍", "鷹", "瀧", "啄",
		  "冨", "埠", "瀕", "斌", "彬", "托", "琢", "鐸", "茸", "凧"
		],
		// fji
		[
		  "葡", "撫", "阜", "芙", "斧", null, null, null, null, null,
		  "淵", "蕗", "葺", "楓", "蕪", "蛸", "只", "叩", "辰", "巽",
		  "焚", "扮", "吻", "鮒", "弗", "竪", "辿", "狸", "鱈", "樽",
		  "碧", "僻", "頁", "蔽", "糞", "坦", "旦", "歎", "湛", "箪"
		],
		// fjo
		[
		  "娩", "篇", "箆", "蔑", "瞥", null, null, null, null, null,
		  "輔", "甫", "圃", "鋪", "鞭", "綻", "耽", "蛋", "檀", "弛",
		  "庖", "峯", "呆", "菩", "戊", "智", "蜘", "馳", "筑", "註",
		  "蓬", "萌", "烹", "朋", "捧", "酎", "樗", "瀦", "猪", "苧"
		],
		// fjp
		[
		  "鉾", "鵬", "鳳", "鋒", "蜂", null, null, null, null, null,
		  "釦", "穆", "睦", "頬", "吠", "凋", "喋", "寵", "帖", "暢",
		  "哩", "昧", "幌", "殆", "勃", "牒", "蝶", "諜", "銚", "捗",
		  "鱒", "柾", "鮪", "枕", "槙", "椎", "槌", "鎚", "栂", "掴"
		],
		// fja
		[
		  null, null, null, null, null, "蒐", "讐", "蹴", "酋", "什",
		  "鰹", "葛", "恰", "鰍", "梶", "戎", "夙", "峻", "竣", "舜",
		  "兜", "鞄", "樺", "椛", "叶", "駿", "楯", "淳", "醇", "曙",
		  "噛", "鎌", "釜", "蒲", "竃", "渚", "薯", "藷", "恕", "鋤"
		],
		// fjs
		[
		  null, null, null, null, null, "叱", "嫉", "悉", "蔀", "篠",
		  "柿", "蛙", "馨", "浬", "骸", "偲", "柴", "屡", "蕊", "縞",
		  "撹", "廓", "劃", "鈎", "蛎", "紗", "杓", "灼", "錫", "惹",
		  "橿", "樫", "笠", "顎", "赫", "腫", "呪", "綬", "洲", "繍"
		],
		// fjd
		[
		  null, null, null, null, null, "燦", "珊", "纂", "讃", "餐",
		  "恢", "廻", "駕", "蛾", "臥", "斬", "仔", "屍", "孜", "斯",
		  "凱", "蟹", "芥", "晦", "魁", "獅", "爾", "痔", "而", "蒔",
		  "鎧", "蓋", "碍", "崖", "咳", "汐", "鴫", "竺", "宍", "雫"
		],
		// fjf
		[
		  null, null, null, null, null, "埼", "碕", "鷺", "咋", "朔",
		  "嘉", "伽", "俺", "牡", "桶", "柵", "窄", "鮭", "笹", "匙",
		  "蝦", "茄", "苛", "禾", "珂", "拶", null, "薩", "皐", "鯖",
		  "峨", "俄", "霞", "迦", "嘩", "捌", "錆", "鮫", "晒", "撒"
		],
		// fjg
		[
		  null, null, null, null, null, "痕", "艮", "些", "叉", "嵯",
		  "艶", "燕", "焔", "掩", "怨", "沙", "瑳", "裟", "坐", "挫",
		  "旺", "甥", "鴛", "薗", "苑", "哉", "塞", "采", "犀", "砦",
		  "臆", "荻", "鴎", "鴬", "襖", "冴", "阪", "堺", "榊", "肴"
		],
		// fjh
		[
		  "迄", "沫", "俣", "亦", "桝", null, null, null, null, null,
		  "蜜", "箕", "蔓", "麿", "侭", "槻", "佃", "柘", "辻", "蔦",
		  "牟", "粍", "稔", "蓑", "湊", "綴", "鍔", "椿", "潰", "壷",
		  "牝", "姪", "冥", "椋", "鵡", "嬬", "紬", "吊", "剃", "悌"
		],
		// fjj
		[
		  "孟", "摸", "麺", "緬", "棉", null, null, null, null, null,
		  "餅", "勿", "杢", "儲", "蒙", "挺", "梯", "汀", "碇", "禎",
		  "悶", "貰", "籾", null, "尤", "諦", "蹄", "鄭", "釘", "鼎",
		  "弥", "耶", "爺", "冶", "也", "擢", "鏑", "溺", "轍", "填"
		],
		// fjk
		[
		  "佑", "愈", "鑓", "薮", "靖", null, null, null, null, null,
		  "涌", "湧", "柚", "揖", "宥", "纏", "甜", "貼", "顛", "澱",
		  "傭", "輿", "邑", "祐", "猷", "兎", "堵", "妬", "屠", "杜",
		  "蓉", "耀", "熔", "楊", "妖", "菟", "賭", "鍍", "砥", "砺"
		],
		// fjl
		[
		  "螺", "淀", "沃", "慾", "遥", null, null, null, null, null,
		  "蘭", "藍", "嵐", "洛", "莱", "塘", "套", "宕", "嶋", "梼",
		  "葎", "裡", "璃", "梨", "李", "淘", "涛", "燈", "祷", "董",
		  "侶", "琉", "溜", "劉", "掠", "蕩", "鐙", "憧", "撞", "萄"
		],
		// fj;
		[
		  "稜", "瞭", "梁", "凌", "亮", null, null, null, null, null,
		  "琳", "燐", "淋", "遼", "諒", "鴇", "涜", "禿", "栃", "橡",
		  "嶺", "伶", "瑠", "麟", "鱗", "椴", "鳶", "苫", "寅", "酉",
		  "漣", "憐", "苓", "玲", "怜", "瀞", "噸", "惇", "敦", "沌"
		],
		// fjz
		[
		  null, null, null, null, null, "岨", "曾", "曽", "楚", "狙",
		  "僅", "粁", "桐", "尭", "饗", "疏", "蘇", "遡", "叢", "爽",
		  "禽", "欽", "欣", "錦", "巾", "宋", "匝", "惣", "掻", "槍",
		  "玖", "狗", "倶", "衿", "芹", "漕", "痩", "糟", "綜", "聡"
		],
		// fjx
		[
		  null, null, null, null, null, "脊", "蹟", "碩", "蝉", "尖",
		  "禦", "鋸", "渠", "笈", "灸", "撰", "栴", "煎", "煽", "穿",
		  "匡", "兇", "僑", "侠", "亨", "箭", "羨", "腺", "舛", "詮",
		  "蕎", "怯", "彊", "喬", "卿", "賎", "閃", "膳", "糎", "噌"
		],
		// fjc
		[
		  null, null, null, null, null, "諏", "厨", "逗", "翠", "錐",
		  "誼", "蟻", "祇", "妓", "亀", "瑞", "嵩", "雛", "椙", "菅",
		  "橘", "桔", "吃", "鞠", "掬", "頗", "雀", "裾", "摺", "凄",
		  "汲", "仇", "黍", "杵", "砧", "棲", "栖", "醒", "脆", "戚"
		],
		// fjv
		[
		  null, null, null, null, null, "丞", "擾", "杖", "穣", "埴",
		  "玩", "巌", "舘", "韓", "諌", "拭", "燭", "蝕", "尻", "晋",
		  "伎", "雁", "贋", "翫", "癌", "榛", "疹", "秦", "芯", "塵",
		  "徽", "稀", "畿", "毅", "嬉", "壬", "腎", "訊", "靭", "笥"
		],
		// fjb
		[
		  null, null, null, null, null, "哨", "嘗", "妾", "娼", "庄",
		  "粥", "萱", "茅", "栢", "鴨", "廠", "捷", "昌", "梢", "樟",
		  "桓", "柑", "姦", "侃", "苅", "樵", "湘", "菖", "蒋", "蕉",
		  "莞", "翰", "竿", "潅", "澗", "裳", "醤", "鉦", "鍾", "鞘"
		],
		// fjn
		[
		  "呂", "蓮", "聯", "簾", "煉", null, null, null, null, null,
		  "弄", "婁", "賂", "櫓", "魯", "遁", "頓", "呑", "那", "乍",
		  "聾", "篭", "狼", "牢", "榔", "凪", "薙", "謎", "灘", "捺",
		  "倭", "肋", "禄", "麓", "蝋", "鍋", "楢", "馴", "畷", "楠"
		],
		// fjm
		[
		  "亘", "亙", "鷲", "脇", "歪", null, null, null, null, null,
		  "椀", "蕨", "藁", "詫", "鰐", "汝", "迩", "匂", "賑", "虹",
		  "哺", "刹", "傲", "丼", "碗", "廿", "韮", "濡", "禰", "祢",
		  "彙", "毀", "嘲", "嗅", "喩", "葱", "捻", "撚", "廼", "埜"
		],
		// fj,
		[
		  "拉", "憬", "慄", "惧", "恣", null, null, null, null, null,
		  "璧", "鬱", "楷", "曖", "摯", "嚢", "膿", "覗", "蚤", "播",
		  "羞", "緻", "籠", "箋", "瘍", "杷", "琶", "罵", "芭", "盃",
		  "辣", "踪", "貪", "諧", "訃", "牌", "楳", "煤", "狽", "這"
		],
		// fj.
		[
		  null, null, null, null, "錮", null, null, null, null, null,
		  null, null, null, null, null, "蝿", "秤", "矧", "萩", "剥",
		  null, null, null, null, null, "柏", "箔", "粕", "曝", "莫",
		  null, null, null, null, null, "駁", "函", "硲", "箸", "肇"
		],
		// fj/
		[
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, "筈", "櫨", "畠", "溌", "醗",
		  null, null, null, null, null, "筏", "鳩", "噺", "塙", "蛤",
		  null, null, null, null, null, "隼", "叛", "斑", "氾", "釆"
		]
	  ],
	  "宝", "観", "額",
	  "初", "技", "黒", "直", "望", "想", "編", "栄", "型", "止"
	],
	// g
	[
	  null, null, "享", "昏", null, "亜", "脱", "暴", "魚", "釈",
	  "位", "応", "職", "覚", "球", "豊", "芸", "役", "印", "確",
	  "真", "科", "参", "池", "少", "管", "流", "争", "言", "渋",
	  "慣", "写", "院", "倉", "元", "消", "仕", "ザ", "誰", "堂"
	],
	// h
	[
	  "盛", "益", "康", "邦", "衆", null, "鼠", null, null, null,
	  "給", "分", "7", "き", "上", "美", "宿", "セ", "神", "優",
	  "3", "ー", "い", "。", "で", "要", "連", "デ", "車", "主",
	  "行", "通", "だ", "新", "事", "支", "先", "調", "組", "銀"
	],
	// j
	[
	  "革", "援", "徒", "舞", "節", null, "曹", null, null, null,
	  "員", "よ", "か", "っ", "く", "題", "制", "運", "び", "公",
	  "と", "し", "、",
	  // jf
	  [
		// jf1
		[
		  null, null, null, null, "！", "１", null, null, null, null,
		  null, null, null, null, null, null, null, "┯", null, null,
		  null, null, null, null, null, "┠", null, null, "┿", "┨",
		  null, null, null, null, null, null, null, "┷", null, null
		],
		// jf2
		[
		  null, null, null, null, "＠", "２", null, null, null, null,
		  null, null, null, null, null, "┏", null, "┳", null, "┓",
		  null, null, null, null, null, "┣", "┃", "━", "╋", "┫",
		  null, null, null, null, null, "┗", null, "┻", null, "┛"
		],
		// jf3
		[
		  null, null, null, null, "＃", "３", null, null, null, null,
		  null, null, null, null, null, "┌", null, "┬", null, "┐",
		  null, null, null, null, null, "├", "│", "─", "┼", "┤",
		  null, null, null, null, null, "└", null, "┴", null, "┘"
		],
		// jf4
		[
		  null, null, null, null, "＄", "４", null, null, null, null,
		  null, null, null, null, null, null, null, "┰", null, null,
		  null, null, null, null, null, "┝", null, null, "╂", "┥",
		  null, null, null, null, null, null, null, "┸", null, null
		],
		// jf5
		[
		  null, null, null, null, "％", "５", null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null
		],
		// jf6
		[
		  null, null, null, null, "＾", "６", null, null, null, null,
		  "￣", "＾", "｀", "゜", null, null, null, null, null, null,
		  "＿", "¨", "´", "゛", null, null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null
		],
		// jf7
		[
		  null, null, null, null, "＆", "７", null, null, null, null,
		  "℃", "″", "′", "°", "Å", null, null, null, null, null,
		  "£", "¢", "＄", "￥", "‰", null, null, null, null, null,
		  null, null, null, null, null, null, null, null, null, null
		],
		// jf8
		[
		  null, null, null, null, "＊", "８", null, null, null, null,
		  "＜", "≦", "≧", "＞", "≠", null, null, null, null, null,
		  "−", "÷", "×", "＋", "＝", null, null, null, null, null,
		  "≪", "≒", "≡", "≫", "±", null, null, null, null, null
		],
		// jf9
		[
		  null, null, null, null, "（", "９", null, null, null, null,
		  "√", "♀", "♂", "∴", "∞", null, null, null, null, null,
		  "⌒", "⊥", "∠", "∵", "∽", null, null, null, null, null,
		  "∬", "∫", "∇", "∂", "∝", null, null, null, null, null
		],
		// jf0
		[
		  null, null, null, null, "）", "０", null, null, null, null,
		  "⊂", "⊆", "⊇", "⊃", "⇒", null, null, null, null, null,
		  "∈", "∋", "∩", "∪", "⇔", null, null, null, null, null,
		  "∃", "∀", "∧", "∨", "¬", null, null, null, null, null
		],
		// jfq
		[
		  null, null, "Θ", null, "Ｑ", "ｑ", null, "θ", null, null,
		  "冠", "乾", "刈", "且", "轄", "焦", "症", "礁", "祥", "肖",
		  "寛", "堪", "喚", "勧", "勘", "衝", "訟", "詔", "鐘", "冗",
		  "緩", "汗", "款", "棺", "憾", "剰", "壌", "嬢", "浄", "畳"
		],
		// jfw
		[
		  null, null, "Ω", null, "Ｗ", "ｗ", null, "ω", null, null,
		  "嚇", "垣", "該", "涯", "慨", "巡", "遵", "緒", "叙", "徐",
		  "隔", "郭", "穫", "獲", "殻", "匠", "升", "召", "奨", "宵",
		  "褐", "滑", "渇", "括", "喝", "床", "彰", "抄", "掌", "晶"
		],
		// jfe
		[
		  null, null, "Ε", null, "Ｅ", "ｅ", null, "ε", null, null,
		  "蚊", "菓", "箇", "稼", "禍", "醜", "柔", "汁", "獣", "銃",
		  "悔", "怪", "塊", "餓", "雅", "叔", "淑", "粛", "塾", "俊",
		  "劾", "皆", "拐", "戒", "懐", "准", "循", "旬", "殉", "潤"
		],
		// jfr
		[
		  null, null, "Ρ", null, "Ｒ", "ｒ", null, "ρ", null, null,
		  "猿", "煙", "炎", "閲", "謁", "勺", "爵", "酌", "寂", "殊",
		  "沖", "翁", "殴", "凹", "鉛", "狩", "珠", "趣", "儒", "囚",
		  "架", "寡", "嫁", "佳", "憶", "愁", "臭", "舟", "襲", "酬"
		],
		// jft
		[
		  null, null, "Τ", null, "Ｔ", "ｔ", null, "τ", null, null,
		  "緯", "尉", "威", "偉", "握", "諮", "賜", "雌", "侍", "慈",
		  "韻", "姻", "芋", "逸", "壱", "璽", "軸", "漆", "疾", "赦",
		  "悦", "疫", "鋭", "詠", "渦", "斜", "煮", "遮", "蛇", "邪"
		],
		// jfy
		[
		  null, null, "Ψ", null, "Ｙ", "ｙ", null, "ψ", null, null,
		  "沿", "液", "泳", "飲", "暗", "泥", "摘", "滴", "哲", "撤",
		  "荷", "歌", "仮", "恩", "往", "迭", "殿", "吐", "塗", "斗",
		  "閣", "貝", "絵", "灰", "芽", "奴", "怒", "凍", "唐", "塔"
		],
		// jfu
		[
		  null, null, "Υ", null, "Ｕ", "ｕ", null, "υ", null, null,
		  "弓", "吸", "貴", "旗", "机", "悼", "搭", "桃", "棟", "痘",
		  "訓", "鏡", "胸", "泣", "救", "筒", "到", "謄", "踏", "透",
		  "穴", "潔", "敬", "径", "兄", "騰", "洞", "胴", "峠", "匿"
		],
		// jfi
		[
		  null, null, "Ι", null, "Ｉ", "ｉ", null, "ι", null, null,
		  "穀", "鋼", "皇", "孝", "犬", "篤", "凸", "屯", "豚", "曇",
		  "枝", "姉", "蚕", "菜", "祭", "鈍", "縄", "軟", "弐", "尿",
		  "似", "飼", "詩", "詞", "至", "妊", "忍", "寧", "猫", "粘"
		],
		// jfo
		[
		  null, null, "Ο", null, "Ｏ", "ｏ", null, "ο", null, null,
		  "拾", "尺", "謝", "捨", "磁", "悩", "濃", "覇", "婆", "廃",
		  "署", "暑", "縮", "祝", "縦", "排", "杯", "輩", "培", "媒",
		  "臣", "森", "城", "松", "昭", "賠", "陪", "伯", "拍", "泊"
		],
		// jfp
		[
		  null, null, "Π", null, "Ｐ", "ｐ", null, "π", null, null,
		  "舌", "誠", "聖", "晴", "仁", "舶", "薄", "漠", "縛", "肌",
		  "像", "祖", "銭", "染", "泉", "鉢", "髪", "罰", "閥", "伴",
		  "損", "孫", "束", "息", "臓", "帆", "搬", "畔", "煩", "頒"
		],
		// jfa
		[
		  null, null, "Α", null, "Ａ", "ａ", null, "α", null, null,
		  "憩", "契", "傾", "薫", "勲", "措", "疎", "租", "粗", "阻",
		  "鶏", "蛍", "茎", "継", "渓", "僧", "双", "喪", "壮", "掃",
		  "圏", "剣", "倹", "傑", "鯨", "挿", "槽", "燥", "荘", "葬"
		],
		// jfs
		[
		  null, null, "Σ", null, "Ｓ", "ｓ", null, "σ", null, null,
		  "吟", "謹", "襟", "菌", "琴", "拙", "摂", "窃", "仙", "扇",
		  "隅", "偶", "虞", "愚", "駆", "栓", "潜", "旋", "薦", "践",
		  "桑", "繰", "靴", "掘", "屈", "銑", "漸", "禅", "繕", "塑"
		],
		// jfd
		[
		  null, null, "Δ", null, "Ｄ", "ｄ", null, "δ", null, null,
		  "凶", "距", "拠", "拒", "糾", "枢", "据", "澄", "畝", "是",
		  "狂", "挟", "恭", "峡", "叫", "姓", "征", "牲", "誓", "逝",
		  "斤", "暁", "凝", "仰", "矯", "斉", "隻", "惜", "斥", "籍"
		],
		// jff
		[
		  null, null, "Φ", null, "Ｆ", "ｆ", null, "φ", null, null,
		  "儀", "偽", "騎", "飢", "輝", "尋", "尽", "迅", "酢", "吹",
		  "犠", "欺", "擬", "戯", "宜", "帥", null, "炊", "睡", "遂",
		  "窮", "朽", "虐", "脚", "詰", "酔", "錘", "随", "髄", "崇"
		],
		// jfg
		[
		  null, null, "Γ", null, "Ｇ", "ｇ", null, "γ", null, null,
		  "鑑", "貫", "艦", "肝", "缶", "醸", "錠", "嘱", "殖", "辱",
		  "幾", "岐", "頑", "陥", "閑", "侵", "唇", "娠", "慎", "浸",
		  "軌", "祈", "棄", "棋", "忌", "紳", "薪", "診", "辛", "刃"
		],
		// jfh
		[
		  null, null, "Η", null, "Ｈ", "ｈ", null, "η", null, null,
		  "兆", "柱", "宙", "暖", "誕", "蛮", "妃", "扉", "披", "泌",
		  "弟", "頂", "腸", "．", "潮", "疲", "碑", "罷", "微", "匹",
		  "灯", "刀", "冬", "笛", "敵", "姫", "漂", "苗", "浜", "賓"
		],
		// jfj
		[
		  null, null, null, null, "Ｊ", "ｊ", null, null, null, null,
		  "燃", "届", "毒", "銅", "童", "頻", "敏", "瓶", "怖", "扶",
		  "拝", "俳", "，", null, "馬", "浮", "符", "腐", "膚", "譜",
		  "畑", "麦", "梅", "』", "肺", "賦", "赴", "附", "侮", "封"
		],
		// jfk
		[
		  null, null, "Κ", null, "Ｋ", "ｋ", null, "κ", null, null,
		  "肥", "悲", "晩", "飯", "班", "伏", "覆", "沸", "噴", "墳",
		  "腹", "貧", "氷", "俵", "鼻", "紛", "雰", "丙", "塀", "幣",
		  "墓", "陛", "閉", "粉", "奮", "壁", "癖", "偏", "遍", "穂"
		],
		// jfl
		[
		  null, null, "Λ", null, "Ｌ", "ｌ", null, "λ", null, null,
		  "幕", "妹", "牧", "棒", "亡", "慕", "簿", "倣", "俸", "峰",
		  "勇", "油", "鳴", "…", "脈", "崩", "抱", "泡", "砲", "縫",
		  "覧", "卵", "翌", "幼", "預", "胞", "芳", "褒", "飽", "乏"
		],
		// jf;
		[
		  null, null, null, null, "：", "；", null, null, null, null,
		  "零", "隷", "林", "緑", "律", "傍", "剖", "坊", "妨", "帽",
		  "劣", "暦", "齢", "麗", "霊", "忙", "冒", "紡", "肪", "膨",
		  "炉", "錬", "廉", "裂", "烈", "謀", "僕", "墨", "撲", "朴"
		],
		// jfz
		[
		  null, null, "Ζ", null, "Ｚ", "ｚ", null, "ζ", null, null,
		  "傘", "擦", "撮", "錯", "搾", "漬", "坪", "釣", "亭", "偵",
		  "嗣", "伺", "暫", "桟", "惨", "貞", "呈", "堤", "廷", "抵",
		  "脂", "肢", "紫", "祉", "旨", "締", "艇", "訂", "逓", "邸"
		],
		// jfx
		[
		  null, null, "Ξ", null, "Ｘ", "ｘ", null, "ξ", null, null,
		  "鎖", "詐", "唆", "魂", "紺", "弔", "彫", "懲", "挑", "眺",
		  "砕", "栽", "彩", "宰", "債", "聴", "脹", "超", "跳", "勅",
		  "削", "咲", "剤", "載", "斎", "朕", "珍", "鎮", "陳", "墜"
		],
		// jfc
		[
		  null, null, "Χ", null, "Ｃ", "ｃ", null, "χ", null, null,
		  "酵", "郊", "購", "貢", "衡", "胆", "鍛", "壇", "弾", "恥",
		  "獄", "酷", "拷", "剛", "項", "痴", "稚", "畜", "逐", "秩",
		  "昆", "恨", "婚", "墾", "腰", "窒", "嫡", "抽", "衷", "鋳"
		],
		// jfv
		[
		  null, null, null, null, "Ｖ", "ｖ", null, null, null, null,
		  "孔", "坑", "侯", "碁", "悟", "泰", "滞", "胎", "逮", "滝",
		  "洪", "控", "拘", "慌", "恒", "卓", "拓", "濯", "託", "諾",
		  "肯", "絞", "稿", "硬", "溝", "但", "奪", "棚", "嘆", "淡"
		],
		// jfb
		[
		  null, null, "Β", null, "Ｂ", "ｂ", null, "β", null, null,
		  "遣", "軒", "謙", "懸", "堅", "藻", "遭", "霜", "騒", "憎",
		  "枯", "弧", "玄", "弦", "幻", "贈", "促", "俗", "賊", "堕",
		  "娯", "呉", "鼓", "顧", "雇", "妥", "惰", "駄", "耐", "怠"
		],
		// jfn
		[
		  null, null, "Ν", null, "Ｎ", "ｎ", null, "ν", null, null,
		  "漏", "浪", "楼", "廊", "露", "没", "奔", "翻", "凡", "盆",
		  null, "湾", "枠", "惑", "賄", "摩", "磨", "魔", "埋", "膜",
		  null, null, null, null, null, "抹", "繭", "漫", "魅", "岬"
		],
		// jfm
		[
		  null, null, "Μ", null, "Ｍ", "ｍ", null, "μ", null, null,
		  "；", "：", "‥", "｜", "‖", "妙", "眠", "矛", "霧", "婿",
		  "〆", "仝", "〃", "／", "＼", "娘", "銘", "滅", "妄", "猛",
		  "ヾ", "ヽ", "ゞ", "ゝ", "‐", "盲", "網", "耗", "黙", "紋"
		],
		// jf,
		[
		  "［", "｛", "｝", "］", "＜", "，", null, null, null, null,
		  "〔", "【", "】", "〕", null, "匁", "厄", "躍", "柳", "愉",
		  "《", "〈", "〉", "》", "『", "癒", "諭", "唯", "幽", "悠",
		  "“", "‘", "’", "”", null, "憂", "猶", "裕", "誘", "誉"
		],
		// jf.
		[
		  "＃", "＆", "＊", "＠", "＞", "．", null, null, null, null,
		  "♪", "♭", "♯", "†", "‡", "庸", "揚", "揺", "擁", "溶",
		  "☆", "△", "□", "○", "◯", "窯", "踊", "抑", "翼", "羅",
		  "　", "▽", "◇", "◎", null, "裸", "雷", "酪", "濫", "吏"
		],
		// jf/
		[
		  null, null, null, null, "？", "／", null, null, null, null,
		  "←", "↓", "↑", "→", "¶", "痢", "硫", "粒", "隆", "虜",
		  "★", "▲", "■", "●", "§", "僚", "涼", "猟", "糧", "陵",
		  "〓", "▼", "◆", "※", "〒", "倫", "厘", "塁", "涙", "励"
		]
	  ],
	  "は", "設", "鉄", "現", "成", "映",
	  "ド", "カ", "り", "」", "田", "協", "多", "混", "選", "以"
	],
	// k
	[
	  "突", "周", "景", "雑", "杉", null, "奏", null, null, null,
	  "ど", "ル", "(", "日", "8", "井", "集", "ツ", "打", "品",
	  "〇", "た", "の", "0", "に", "水", "教", "エ", "天", "書",
	  "円", "社", "—", "9", "会", "用", "商", "ポ", "党", "ヌ"
	],
	// l
	[
	  "温", "域", "処", "漢", "肉", null, "尊", null, null, null,
	  "代", "千", "ト", "国", "え", "洋", "安", "特", "勤", "語",
	  "て", "一", "5", "・", "な", "藤", "力", "他", "世", "可",
	  "小", "野", "め", "子", "前", "表", "ハ", "決", "択", "営"
	],
	// ;
	[
	  "捕", "荒", "ぜ", "緊", "除", ";", null, null, null, null,
	  "レ", "ア", "れ", "二", "年", "実", "画", "谷", "ャ", "演",
	  "る", "が", "1", "2", "を", "有", "ベ", "度", "文", "へ",
	  "ジ", "同", "大", "五", "そ", "正", "交", "ミ", "体", "治"
	],
	// z
	[
	  null, null, null, null, null, "禁", "絹", "批", "就", "綱",
	  "欠", "財", "従", "適", "母", "爆", "陽", "ァ", "殺", "券",
	  "ヒ", "及", "投", "込", "転", "素", "毛", "等", "板", "伝",
	  "ヨ", "判", "済", "説", "休", "図", "之", "州", "例", "字"
	],
	// x
	[
	  null, null, null, null, null, "硝", "被", "慶", "駐", "潟",
	  "夏", "針", "骨", "類", "奥", "仲", "構", "導", "負", "悪",
	  "江", "久", "義", "沢", "空", "兵", "永", "浅", "客", "庭",
	  "誤", "規", "吉", "週", "省", "挙", "末", "払", "満", "材"
	],
	// c
	[
	  null, null, null, null, null, "樹", "源", "渉", "揮", "創",
	  "彼", "裏", "厚", "御", "因", "茶", "旅", "認", "何", "秋",
	  "別", "蔵", "算", "軍", "性", "専", "申", "頃", "師", "課",
	  "証", "感", "ゆ", "号", "央", "険", "ぼ", "乗", "津", "過"
	],
	// v
	[
	  null, null, null, null, null, "句", "願", "竜", "丹", "背",
	  "妻", "居", "顔", "宇", "酒", "率", "施", "健", "履", "非",
	  "考", "早", "半", "青", "使", "親", "袋", "落", "税", "着",
	  "含", "値", "器", "葉", "福", "ゼ", "街", "庫", "準", "諸"
	],
	// b
	[
	  null, null, null, null, null, "礎", "臨", "併", "鮮", "皮",
	  "善", "差", "量", "推", "伸", "比", "曜", "尾", "般", "便",
	  "権", "造", "県", "清", "級", "寮", "良", "命", "飛", "坂",
	  "%", "ギ", "照", "派", "毎", "波", "免", "状", "遊", "単"
	],
	// n
	[
	  "依", "織", "譲", "激", "測", null, null, null, null, null,
	  "相", "付", "内", "九", "サ", "昔", "遠", "序", "耳", "示",
	  "ッ", "ロ", "ん", "け", "業", "ホ", "私", "村", "ノ", "近",
	  "海", "当", "不", "委", "気", "ヤ", "再", "団", "戸", "身"
	],
	// m
	[
	  "繊", "父", "ヘ", "干", "血", null, null, null, null, null,
	  "家", "プ", "工", "名", "建", "短", "ォ", "振", "授", "即",
	  "人", "ク", "ま", "イ", "時", "共", "ゴ", "ガ", "完", "外",
	  "道", "理", "合", "化", "売", "心", "ネ", "計", "ひ", "ピ"
	],
	// ,
	[
	  "借", "枚", "模", "彦", "散", ",", null, null, null, null,
	  "的", "ば", "八", "川", "パ", "岩", "将", "練", "版", "難",
	  "三", "万", "ン", "す", "「", "ブ", "来", "製", "重", "米",
	  "ず", "メ", "面", "ビ", "下", "界", "〜", "夫", "ょ", "勝"
	],
	// .
	[
	  "須", "乱", "降", "均", "笑", ".", null, null, null, null,
	  "対", "ュ", "テ", "機", "第", "巨", "ぞ", "念", "効", "普",
	  "京", "方", "つ", "電", "長", "平", "信", "校", "約", "ョ",
	  "西", "ウ", "政", "目", "都", "意", "口", "食", "価", "反"
	],
	// /
	[
	  "訳", "香", "走", "又", "弁", "/", null, null, null, null,
	  "歴", "作", "見", "チ", "入", "敗", "塚", "働", "視", "辺",
	  "ち", "フ", "四", "地", "み", "楽", "午", "ご", "各", "光",
	  "げ", "グ", "オ", "市", "株", "今", "台", "総", "与", "ズ"
	]
  ]
;

function decode(src: string) {
	let code = src.split('');
	let t: any = table;
	let dst = "";
	let rem = "";
	for (let ch of code) {
		rem += ch;
		let k = keys.indexOf(ch);
		if (k < 0) {
			t = table;
			dst += ch;
			rem = "";
		} else {
			if (!isArray(t) || t.length <= k) {
				t = table;
				dst += ch;
				rem = "";
				continue;
			}
			t = t[k];
			if (isString(t)) {
				dst += t;
				rem = "";
				t = table;
			} else if (isNull(t)) {
				t = table;
			}
		}
	}
	return [dst, rem];
}

function decode_string(src: string) {
	return decode(src)[0];
}

function do_ttt(editor: vscode.TextEditor) {
	let selection = editor.selection;
	let row = selection.active.line;
	let bol = new vscode.Position(row, 0);
	let range = new vscode.Range(bol, selection.end);
	let src = editor.document.getText(range);
	//
	let srccode = src.split('');
	let ch = "";
	let tail = "";
	let body = "";
	let head = "";
	let delimitered = false;
	let i = srccode.length - 1;
	while (0 <= i) {
		ch = srccode[i];
		if (keys.includes(ch)) {break;}
		tail = ch + tail;
		i -= 1;
	}
	while (0 <= i) {
		ch = srccode[i];
		if (!keys.includes(ch)) {break;}
		body = ch + body;
		i -= 1;
	}
	if (ch === delimiter) {
		delimitered = true;
		i -= 1;
	}
	while (0 <= i) {
		ch = srccode[i];
		head = ch + head;
		i -= 1;
	}
	//
	let end = selection.end.translate(0, -tail.length);
	let beg = end.translate(0, -body.length);
	if (delimitered) {
		beg = beg.translate(0, -1);
	}
	range = new vscode.Range(beg, end);
	let decoded = decode_string(body);
	editor.edit((editorEdit) => {
		editorEdit.replace(range, '');
		editorEdit.insert(range.start, decoded);
	});
}

function decodeMix1(str: string) {
	let ret0 = "";
	let ret1 = "";
	let isCode = false;
	while (str.match(/^(.*?)(:*)(:)(.*)$/)) {
			let [left, sep, conv, right] = [RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$4];
			ret0 += (isCode ? left : decode(left).join("")) + sep;
			ret1 += (isCode ? decode(left).join("") : left) + sep;
			str = right;
			isCode = !isCode;
	}
	ret0 += isCode ? str : decode(str).join("");
	ret1 += isCode ? decode(str).join("") : str;
	// return ret0;
	return str === "" ? ret0 : ret1;
}

function decodeMix2(str: string) {
	let ret = "";
	let [left, sep, conv, right] = ["", "", ":", ""];
	while (str.match(/^(.*?)([:@]*)([:@])(.*)$/)) {
			[left, sep, conv, right] = [RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$4];
			ret += (conv === ":" ? left : decode(left).join("")) + sep;
			str = right;
	}
	ret += conv === ":" ? decode(str).join("") : str;
	return ret;
}

function decodeMix(str: string) {
	// return decodeMix1(str);
	return decodeMix2(str);
}
