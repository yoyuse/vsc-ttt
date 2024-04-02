import * as vscode from 'vscode';
import { reduce } from './tcaux';
import { getConfiguration } from './utils';

type tableElement = string | tableElementArray;
interface tableElementArray extends Array<tableElement> { }

interface ReverseTable {
    [name: string]: number[][];
}

export class Ttt {
    public table: tableElement = [];
    public reverseTable: ReverseTable = {};
    readonly ttw = `
刋刔刎刧刪刮刳剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨辧劬劭劼劵勁勍勗勞勣勦飭勠勳
勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙
叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨
咫哂咤咾咼哘哥哦唏唔哽哮哭哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喇喨
嗚嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘸噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈
囎囑囓囗囮囹圀囿圄圉圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔
埒埓堊埖埣堋堙堝塲堡塢塋塰塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼
壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜
娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰
孳孵學斈孺宀它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓屐屏孱
屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋
嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵
并幺麼广庠廁廂廈廐廏廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎
弯彑彖彗彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠怙怐怩怎怱怛怕怫
怦怏怺恚恁恪恷恟恊恆恍恃恤恂恬恫恙悁悍悃悚悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕
愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇
憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛戞戡截戮戰戲戳
扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛挌拮拱挧挂挈拯拵捐
挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摶摎攪撕
撓撥撩撈撼據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效
敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞
晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼曄暸曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸
朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲
桎梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍棔棧棕椶椒椄棗棣
椥棹棠棯椨椪椚椣椡棆楹楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃
榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐
檍檠檄檢檣檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡
歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯麾氈氓气氛氤氣汞汕汢汪沂沍
沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙
涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎
渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌漾漓滷澆潺潸澁澀
潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰
瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔
燎燠燬燧燵燼燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢
狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲
琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞瓊瓏瓔珱瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬
甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞
痾痿痼瘁痰痺痲痳瘋瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰癲癶癸發皀皃皈皋
皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾
睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋
`;
    readonly ttb = `
磔碾碼磅磊磬磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣
稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰窶竅竄窿邃竇竊竍竏竕竓
站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚
箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤
籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆紂紜紕紊絅絋紮紲
紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緲緡縅縊縣
縡縒縱縟縉縋縢繆繦縻縵縹繃縷縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖
纎纛纜缸缺罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羝羚羣羯羲羹羮羶羸譱翅翆翊
翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚
肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓
膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟
艤艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙茵茴茖茲茱荀茹荐
荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸
蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕
蔔蓼蕀蕣蕘蕈蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺
蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉
蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯
蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍
袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞襦襤襭襪襯襴
襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅
誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏
譎證譖譛譚譫譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘
戝貭貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌
跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊蹇蹉蹌蹐蹈蹙蹤蹠蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑
躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗
轜轢轣轤辜辟辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸遏遐遑遒逎遉逾遖遘
遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯
醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷
鋩錏鋺鍄錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵
鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙閠閨閧閭閼閻閹閾闊濶闃闍闌
闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍
襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋
鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰顱顴顳颪颯颱颶飄
飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮
駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦
髯髫髮髴髱髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊
鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧
鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸
鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠
黥黨黯黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠堯槇遙瑤凜熙
`;
    readonly ttl = `
**********佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅
**********伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴僉僊傳僂僖僞僥
**********ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ******
**********ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ****
ЭЮЯ*******АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬ
эюя*******абвгдеёжзийклмнопрстуфхцчшщъыь
**********ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ****
**********αβγδεζηθικλμνξοπρστυφχψω******
**********僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘
**********册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭凰凵凾刄
*****肱腔膏砿閤叡餌荏云噂鴻劫壕濠轟穎盈瑛洩嬰麹鵠漉甑忽奄堰厭榎頴惚狛此坤梱
*****梧檎瑚醐鯉窺鵜卯迂烏佼倖勾喉垢蔚欝唄嘘碓宏巷庚昂晃閏瓜厩姥鰻杭梗浩糠紘
*****捲硯鍵鹸絃郁亥謂萎畏舷諺乎姑狐允鰯茨溢磯糊袴股胡菰吋蔭胤淫咽虎跨鈷伍吾
*****袈祁圭珪慧鮎綾絢飴虻桂畦稽繋罫闇按袷粟或荊詣頚戟隙椅惟夷杏鞍桁訣倦喧拳
*****矩躯駈駒喰葵姶挨娃唖寓串櫛釧屑葦旭渥穐茜窟沓轡窪熊姐斡梓鯵芦隈粂栗鍬卦
庇匪蕃磐挽*****簸樋誹緋斐蒼鎗捉袖其柊眉琵毘枇揃遜汰唾柁肘膝髭疋稗舵楕陀騨堆
媛桧逼畢弼*****廟豹瓢彪謬岱戴腿苔黛鰭蛭蒜鋲錨鯛醍鷹瀧啄冨埠瀕斌彬托琢鐸茸凧
葡撫阜芙斧*****淵蕗葺楓蕪蛸只叩辰巽焚扮吻鮒弗竪辿狸鱈樽碧僻頁蔽糞坦旦歎湛箪
娩篇箆蔑瞥*****輔甫圃鋪鞭綻耽蛋檀弛庖峯呆菩戊智蜘馳筑註蓬萌烹朋捧酎樗瀦猪苧
鉾鵬鳳鋒蜂*****釦穆睦頬吠凋喋寵帖暢哩昧幌殆勃牒蝶諜銚捗鱒柾鮪枕槙椎槌鎚栂掴
*****蒐讐蹴酋什鰹葛恰鰍梶戎夙峻竣舜兜鞄樺椛叶駿楯淳醇曙噛鎌釜蒲竃渚薯藷恕鋤
*****叱嫉悉蔀篠柿蛙馨浬骸偲柴屡蕊縞撹廓劃鈎蛎紗杓灼錫惹橿樫笠顎赫腫呪綬洲繍
*****燦珊纂讃餐恢廻駕蛾臥斬仔屍孜斯凱蟹芥晦魁獅爾痔而蒔鎧蓋碍崖咳汐鴫竺宍雫
*****埼碕鷺咋朔嘉伽俺牡桶柵窄鮭笹匙蝦茄苛禾珂拶$薩皐鯖峨俄霞迦嘩捌錆鮫晒撒
*****痕艮些叉嵯艶燕焔掩怨沙瑳裟坐挫旺甥鴛薗苑哉塞采犀砦臆荻鴎鴬襖冴阪堺榊肴
迄沫俣亦桝*****蜜箕蔓麿侭槻佃柘辻蔦牟粍稔蓑湊綴鍔椿潰壷牝姪冥椋鵡嬬紬吊剃悌
孟摸麺緬棉*****餅勿杢儲蒙挺梯汀碇禎悶貰籾*尤諦蹄鄭釘鼎弥耶爺冶也擢鏑溺轍填
佑愈鑓薮靖*****涌湧柚揖宥纏甜貼顛澱傭輿邑祐猷兎堵妬屠杜蓉耀熔楊妖菟賭鍍砥砺
螺淀沃慾遥*****蘭藍嵐洛莱塘套宕嶋梼葎裡璃梨李淘涛燈祷董侶琉溜劉掠蕩鐙憧撞萄
稜瞭梁凌亮*****琳燐淋遼諒鴇涜禿栃橡嶺伶瑠麟鱗椴鳶苫寅酉漣憐苓玲怜瀞噸惇敦沌
*****岨曾曽楚狙僅粁桐尭饗疏蘇遡叢爽禽欽欣錦巾宋匝惣掻槍玖狗倶衿芹漕痩糟綜聡
*****脊蹟碩蝉尖禦鋸渠笈灸撰栴煎煽穿匡兇僑侠亨箭羨腺舛詮蕎怯彊喬卿賎閃膳糎噌
*****諏厨逗翠錐誼蟻祇妓亀瑞嵩雛椙菅橘桔吃鞠掬頗雀裾摺凄汲仇黍杵砧棲栖醒脆戚
*****丞擾杖穣埴玩巌舘韓諌拭燭蝕尻晋伎雁贋翫癌榛疹秦芯塵徽稀畿毅嬉壬腎訊靭笥
*****哨嘗妾娼庄粥萱茅栢鴨廠捷昌梢樟桓柑姦侃苅樵湘菖蒋蕉莞翰竿潅澗裳醤鉦鍾鞘
呂蓮聯簾煉*****弄婁賂櫓魯遁頓呑那乍聾篭狼牢榔凪薙謎灘捺倭肋禄麓蝋鍋楢馴畷楠
亘亙鷲脇歪*****椀蕨藁詫鰐汝迩匂賑虹哺刹傲丼碗廿韮濡禰祢彙毀嘲嗅喩葱捻撚廼埜
拉憬慄惧恣*****璧鬱楷曖摯嚢膿覗蚤播羞緻籠箋瘍杷琶罵芭盃辣踪貪諧訃牌楳煤狽這
弌丐丕个錮*****丱丶丿乂乖蝿秤矧萩剥乘亂亅豫亊柏箔粕曝莫舒弍于亞亟駁函硲箸肇
亠亢亰亳亶*****从仍仄仆仂筈櫨畠溌醗仗仞仭仟价筏鳩噺塙蛤伉佚估佛佝隼叛斑氾釆
`;
    readonly ttr = `
*****************┯*******┠**┿┨*******┷**
***************┏*┳*┓*****┣┃━╋┫*****┗*┻*┛
***************┌*┬*┐*****├│─┼┤*****└*┴*┘
*****************┰*******┝**╂┥*******┸**
****************************************
**********￣＾｀゜******＿¨´゛****************
**********℃″′°Å*****£¢＄￥‰***************
**********＜≦≧＞≠*****−÷×＋＝*****≪≒≡≫±*****
**********√♀♂∴∞*****⌒⊥∠∵∽*****∬∫∇∂∝*****
**********⊂⊆⊇⊃⇒*****∈∋∩∪⇔*****∃∀∧∨¬*****
**********冠乾刈且轄焦症礁祥肖寛堪喚勧勘衝訟詔鐘冗緩汗款棺憾剰壌嬢浄畳
**********嚇垣該涯慨巡遵緒叙徐隔郭穫獲殻匠升召奨宵褐滑渇括喝床彰抄掌晶
**********蚊菓箇稼禍醜柔汁獣銃悔怪塊餓雅叔淑粛塾俊劾皆拐戒懐准循旬殉潤
**********猿煙炎閲謁勺爵酌寂殊沖翁殴凹鉛狩珠趣儒囚架寡嫁佳憶愁臭舟襲酬
**********緯尉威偉握諮賜雌侍慈韻姻芋逸壱璽軸漆疾赦悦疫鋭詠渦斜煮遮蛇邪
**********沿液泳飲暗泥摘滴哲撤荷歌仮恩往迭殿吐塗斗閣貝絵灰芽奴怒凍唐塔
**********弓吸貴旗机悼搭桃棟痘訓鏡胸泣救筒到謄踏透穴潔敬径兄騰洞胴峠匿
**********穀鋼皇孝犬篤凸屯豚曇枝姉蚕菜祭鈍縄軟弐尿似飼詩詞至妊忍寧猫粘
**********拾尺謝捨磁悩濃覇婆廃署暑縮祝縦排杯輩培媒臣森城松昭賠陪伯拍泊
**********舌誠聖晴仁舶薄漠縛肌像祖銭染泉鉢髪罰閥伴損孫束息臓帆搬畔煩頒
**********憩契傾薫勲措疎租粗阻鶏蛍茎継渓僧双喪壮掃圏剣倹傑鯨挿槽燥荘葬
**********吟謹襟菌琴拙摂窃仙扇隅偶虞愚駆栓潜旋薦践桑繰靴掘屈銑漸禅繕塑
**********凶距拠拒糾枢据澄畝是狂挟恭峡叫姓征牲誓逝斤暁凝仰矯斉隻惜斥籍
**********儀偽騎飢輝尋尽迅酢吹犠欺擬戯宜帥*炊睡遂窮朽虐脚詰酔錘随髄崇
**********鑑貫艦肝缶醸錠嘱殖辱幾岐頑陥閑侵唇娠慎浸軌祈棄棋忌紳薪診辛刃
**********兆柱宙暖誕蛮妃扉披泌弟頂腸．潮疲碑罷微匹灯刀冬笛敵姫漂苗浜賓
**********燃届毒銅童頻敏瓶怖扶拝俳，&馬浮符腐膚譜畑麦梅』肺賦赴附侮封
**********肥悲晩飯班伏覆沸噴墳腹貧氷俵鼻紛雰丙塀幣墓陛閉粉奮壁癖偏遍穂
**********幕妹牧棒亡慕簿倣俸峰勇油鳴…脈崩抱泡砲縫覧卵翌幼預胞芳褒飽乏
**********零隷林緑律傍剖坊妨帽劣暦齢麗霊忙冒紡肪膨炉錬廉裂烈謀僕墨撲朴
**********傘擦撮錯搾漬坪釣亭偵嗣伺暫桟惨貞呈堤廷抵脂肢紫祉旨締艇訂逓邸
**********鎖詐唆魂紺弔彫懲挑眺砕栽彩宰債聴脹超跳勅削咲剤載斎朕珍鎮陳墜
**********酵郊購貢衡胆鍛壇弾恥獄酷拷剛項痴稚畜逐秩昆恨婚墾腰窒嫡抽衷鋳
**********孔坑侯碁悟泰滞胎逮滝洪控拘慌恒卓拓濯託諾肯絞稿硬溝但奪棚嘆淡
**********遣軒謙懸堅藻遭霜騒憎枯弧玄弦幻贈促俗賊堕娯呉鼓顧雇妥惰駄耐怠
**********漏浪楼廊露没奔翻凡盆*湾枠惑賄摩磨魔埋膜*****抹繭漫魅岬
**********；：‥｜‖妙眠矛霧婿〆仝〃／＼娘銘滅妄猛ヾヽゞゝ‐盲網耗黙紋
［｛｝］******〔【】〕*匁厄躍柳愉《〈〉》『癒諭唯幽悠“‘’”*憂猶裕誘誉
＃＆＊＠******♪♭♯†‡庸揚揺擁溶☆△□○◯窯踊抑翼羅　▽◇◎*裸雷酪濫吏
**********←↓↑→¶痢硫粒隆虜★▲■●§僚涼猟糧陵〓▼◆※〒倫厘塁涙励
`;
    readonly ttc = `
**********ヲゥヴヂヅ簡承快包唱ぱぴぷぺぽ朱陣眼執岳ぁぃぅぇぉ欲迫留替還
**********哀逢宛囲庵徴章否納暮慰為陰隠胃遅鶴繁紹刑*****巣災列沼更
**********暇牙壊較寒触候歯頼憲我掛敢甘患甲鹿誌夢弱瓦****茂恋刻?占
**☆*******啓掲携劇賢宗途筆逃勉兼嫌顕牽厳致貨招卸雲*****述脳豆辞箱
**********把伐避卑藩植複里寝罪菱紐描憤弊汎絡季阿窓*****朗老看献矢
**********酸貿攻盤汽*****桜典採君犯*****呼紀房去秒*****
*******★**昼捜焼帯換索冊皿賛*瀬博謡純余衰趨垂粋寸幅破績疑範*****
**********炭異闘易延射需輯瞬盾鳥筋希副堀滋湿甚*瞳歓郡識ぢ核*****
**********稲隣奈速雪濁詑蓄貯虫催忠仏盟肩沈添徹爪陶功抗属綿影*****
**********湯旧夕拡互慢迷戻羊*障乳察標療己已巳巴*盗幡衣離麻*****
ヮ丑鬼孤奉湖端刷震弘果概武風細害撃浴積故収若指ぎ思病常寺停河徳械帝読族帰監竹ゅ志
ヰ臼虚誇某礼飾寿扱痛告買残階古賃折秀程鉱際雄氏格術終張質領置渡刊始鈴丁庁寄注修抜
ヱ宴狭黄貌著郵順片票策詳両能利整追糸断提太査丸次広起薬づ容供守訪了恐未昨裁介究航
ヵ縁脅后卜移塩危札訴首由在論ペ軽隊春低児園ふ続習門路防港玉試登融極督才跡達具答層
ヶ曳驚耕*郷群砂乞遺農死!増ゃ評角幸減敷船賞ェ火聞越得条右席退雨熱況返ゲ芝失養深
請尚舎布姿**庶*欄歩キやコナ佐接記モ無中わうあ本むケ話べ期店全バ後問洗響司復担
境賀喜苦絶*星粧乃龍回せ出山金法備朝資石スラ4こさ南式座民ゾ持じ部間ム羽忘迎並陸
系岸幹圧密*析丈如略務区タ者マ数最知士屋も東)6ら原戦線ソ歳町自六場七個討華浦巻
探責丘恵秘*遷称尼慮島百手発和郎急ワ費解お生十学高駅関ダ点強所議経ニ住医史許ユ競
象漁糖固押*宣蒸帳累開木保立女談験送ィ募定ろリ月シ物男橋遇係ほ明動産北静環補冷護
ゎ於奇巧*償紅舗輪則報音案横崎服変限逆令種宅料受英勢輸基足婦件宮局向割億色左ぬ根
ゐ汚既克*欧傷充倒存紙王曲興白声審研企違岡熟土予ボ必形好草段友伊頭府ぶ録貸態展様
ゑ乙菊懇*努豪喫操倍館放情刺ぐ任改労精装結待活切加講助味築衛卒求配富番赤販花警独
*穏却困*底維腕柄牛夜々引側官検昇統ざ然進取ね育室愛▽宝観額初技黒直望想編栄型止
**享昏*亜脱暴魚釈位応職覚球豊芸役印確真科参池少管流争言渋慣写院倉元消仕ザ誰堂
盛益康邦衆*鼠***給分7き上美宿セ神優3ーい。で要連デ車主行通だ新事支先調組銀
革援徒舞節*曹***員よかっく題制運び公とし、▲は設鉄現成映ドカり」田協多混選以
突周景雑杉*奏***どル(日8井集ツ打品〇たの0に水教エ天書円社—9会用商ポ党ヌ
温域処漢肉*尊***代千ト国え洋安特勤語て一5・な藤力他世可小野め子前表ハ決択営
捕荒ぜ緊除*****レアれ二年実画谷ャ演るが12を有ベ度文へジ同大五そ正交ミ体治
*****禁絹批就綱欠財従適母爆陽ァ殺券ヒ及投込転素毛等板伝ヨ判済説休図之州例字
*****硝被慶駐潟夏針骨類奥仲構導負悪江久義沢空兵永浅客庭誤規吉週省挙末払満材
*****樹源渉揮創彼裏厚御因茶旅認何秋別蔵算軍性専申頃師課証感ゆ号央険ぼ乗津過
*****句願竜丹背妻居顔宇酒率施健履非考早半青使親袋落税着含値器葉福ゼ街庫準諸
*****礎臨併鮮皮善差量推伸比曜尾般便権造県清級寮良命飛坂%ギ照派毎波免状遊単
依織譲激測*****相付内九サ昔遠序耳示ッロんけ業ホ私村ノ近海当不委気ヤ再団戸身
繊父ヘ干血*****家プ工名建短ォ振授即人クまイ時共ゴガ完外道理合化売心ネ計ひピ
借枚模彦散*****的ば八川パ岩将練版難三万ンす「ブ来製重米ずメ面ビ下界〜夫ょ勝
須乱降均笑*****対ュテ機第巨ぞ念効普京方つ電長平信校約ョ西ウ政目都意口食価反
訳香走又弁*****歴作見チ入敗塚働視辺ちフ四地み楽午ご各光げグオ市株今台総与ズ
`;

    private makeSubtable(ttx: string, fn: (ch: string) => tableElement): tableElement {
        return ttx.replace(/^\n|\n$/, "").split(/\n/).map((s) => s.split("").map(fn));
    }

    private makeTable() {
        let ttwtable = this.makeSubtable(this.ttw, (ch) => { return ch === "*" ? "" : ch; });
        let ttbtable = this.makeSubtable(this.ttb, (ch) => { return ch === "*" ? "" : ch; });
        let ttltable = this.makeSubtable(this.ttl, (ch) => { return ch === "*" ? "" : ch === "$" ? "@m" : ch; });
        let ttrtable = this.makeSubtable(this.ttr, (ch) => { return ch === "*" ? "" : ch === "&" ? "@b" : ch; });
        let ttttable = this.makeSubtable(this.ttc, (ch) => {
            switch (ch) {
                case "*": return "";
                case "☆": return ttwtable;
                case "★": return ttbtable;
                case "▽": return ttltable;
                case "▲": return ttrtable;
                default: return ch;
            }
        });
        this.table = ttttable;
    }

    private getDelimiter(): string {
        const delimiterColon = ":";
        let tttDelimiter: string = getConfiguration().get<string>('tttDelimiter', delimiterColon);
        if (tttDelimiter === "") { tttDelimiter = delimiterColon; } // XXX
        return tttDelimiter;
    }

    private getKeys(): string {
        const keysQWERTY = "1234567890qwertyuiopasdfghjkl;zxcvbnm,./";
        const keysDvorak = "1234567890',.pyfgcrlaoeuidhtns;qjkxbmwvz";
        const tttKeyboard = getConfiguration().get<string>('tttKeyboard');
        let keys: string = keysQWERTY;
        if (tttKeyboard === 'QWERTY') {
            return keysQWERTY;
        } else if (tttKeyboard === 'Dvorak') {
            return keysDvorak;
        } else if (tttKeyboard === 'Custom') {
            const keys = getConfiguration().get<string>('tttKeys', keysQWERTY);
            if (keys.length === 40) {
                return keys;
            } else {
                vscode.window.showWarningMessage(`Invalid custom keys; Using QWERTY keys`);
                return keysQWERTY;
            }
        }
        return keys;
    }

    private optCharset(s: string): string {
        return s.replace(/[\]\^\-\\]/g, '\\$&'); // XXX
    }

    private regexpQuote(s: string): string {
        return s.replace(/[.\\+*?\[\^\]$(){}|]/g, '\\$&'); // XXX
    }

    private makePattern(): RegExp {
        const keys = this.getKeys();
        const delimiter = this.getDelimiter();
        return new RegExp(`(.*?)(${this.regexpQuote(delimiter)}?([${this.optCharset(keys)}]+))([^${this.optCharset(keys)}]*)$`);
    }

    constructor() {
        this.makeTable();
        this.makeReverseTable(this.table, []);
    }

    public decode(str: string): [string, string] {
        const keys = this.getKeys();
        let t: tableElement = this.table;
        let dst = "";
        let rem = "";
        for (let ch of str.split("")) {
            rem += ch;
            let k = keys.indexOf(ch);
            if (k < 0) {
                t = this.table;
                dst += ch;
                rem = "";
            } else {
                t = t[k];
                if (typeof t === "string") {
                    dst += t;
                    rem = "";
                    t = this.table;
                } else if (!Array.isArray(t)) {
                    t = this.table;
                }
            }
        }
        return [dst, rem];
    }

    public decodeString(str: string): string {
        return this.decode(str)[0];
    }

    public async doTttSub(selection: vscode.Selection, editor: vscode.TextEditor): Promise<vscode.Range> {
        const selectionStart = selection.start;
        let range = new vscode.Range(selection.start, selection.end);
        let str = editor.document.getText(range);
        if (selection.isEmpty) {
            const row = selection.active.line;
            const bol = new vscode.Position(row, 0);
            const left = editor.document.getText(new vscode.Range(bol, selection.end));
            const m = this.makePattern().exec(left);
            if (!m) { return new vscode.Range(selection.start, selection.end); }
            const [_, src, body, tail] = [m[1], m[2], m[3], m[4]];
            str = body;
            const start = selectionStart.translate(0, -(src + tail).length);
            const end = start.translate(0, src.length);
            range = new vscode.Range(start, end);
        }
        let dst = this.decodeString(str);
        dst = await reduce(dst);
        await editor.edit((editorEdit) => {
            editorEdit.replace(range, "");
            editorEdit.insert(range.start, dst);
        });
        return new vscode.Range(range.start, range.start.translate(0, dst.length));
    }

    public async doTtt(editor: vscode.TextEditor) {
        for (const selection of editor.selections) {
            await this.doTttSub(selection, editor)
        }
    }

    // public decodeMix(str: string): string {
    public async decodeMix(str: string): Promise<string> {
        let dst = "";
        let [left, sep, conv, right] = ["", "", ":", ""];
        let m;
        while ((m = /^(.*?)([:@]*)([:@])(.*)$/.exec(str)) !== null) {
            [left, sep, conv, right] = [m[1], m[2], m[3], m[4]];
            // TCAUX
            // dst += (conv === ":" ? left : this.decode(left).join("")) + sep;
            dst += (conv === ":" ? left : await reduce(this.decode(left).join(""))) + sep;
            str = right;
        }
        // TCAUX
        // dst += conv === ":" ? this.decode(str).join("") : str;
        dst += conv === ":" ? await reduce(this.decode(str).join("")) : str;
        return dst;
    }

    // クリップボードを利用して選択範囲を変換する。選択範囲がなければ全体を変換する
    public async doTttViaClipboard(): Promise<void> {
        // クリップボードの内容をバックアップ
        let backup = await vscode.env.clipboard.readText();
        // 選択範囲の有無チェックのためクリップボードを空にする
        await vscode.env.clipboard.writeText('');
        // 選択範囲があるときはそれをコピー、なければ全選択してコピー
        await vscode.commands.executeCommand('editor.action.clipboardCopyAction');
        let code = await vscode.env.clipboard.readText();
        if (code === '') {
            await vscode.commands.executeCommand('editor.action.selectAll');
            await vscode.commands.executeCommand('editor.action.clipboardCopyAction');
            code = await vscode.env.clipboard.readText();
        }
        // クリップボードにバックアップを戻す
        await vscode.env.clipboard.writeText(backup);
        // コピーした内容を変換しクリップボードに格納
        // TCAUX
        // let text = this.decodeMix(code);
        let text = await this.decodeMix(code);
        await vscode.env.clipboard.writeText(text);
        // クリップボードから貼り付け
        await vscode.commands.executeCommand('editor.action.clipboardPasteAction');
        // クリップボードにバックアップを戻す
        await vscode.env.clipboard.writeText(backup);
    }

    public makeReverseTable(table: tableElement, prefix: number[] = []): ReverseTable {
        const keys = this.getKeys();
        const chars = keys.split("");
        for (let k = 0; k < chars.length; k++) {
            let tbl = table[k];
            let code = prefix.concat([k]);
            if (Array.isArray(tbl)) {
                this.makeReverseTable(tbl, code);
            } else if (typeof tbl === "string" && tbl !== "") {
                if (!this.reverseTable[tbl]) { this.reverseTable[tbl] = new Array<number[]>(); }
                this.reverseTable[tbl].push(code);
            }
        }
        return this.reverseTable
    }

    public rev(char: string): string[] {
        const keys = this.getKeys();
        return this.reverseTable[char].map((code: number[]): string => {
            return code.map((k: number): string => { return keys[k]; }).join("");
        });
    }

    public codeHelpCh(ch: string, certain: string = ""): string {
        let codes = this.rev(ch);
        if (0 <= certain.indexOf(ch)) { return ch; }
        return `${ch}${codes ? codes.map((code) => `<${code}>`).join("") : "<-->"}`
    }

    public codeHelpString(str: string, certain: string = ""): string {
        return str.split("").map((ch) => this.codeHelpCh(ch, certain)).join("")
    }
}
