import type { SpellInfo } from "../types";

export const SPELLS: SpellInfo[] = [
  {
    name: "Dominion",
    range: "Near",
    class: "Priest",
    tier: 5,
    duration: { type: "Round", amt: 10 },
    desc: "Mighty beings come to your aid. The beings must have a combined total of 16 levels or less. Chaotic PCs summon demons/devils, and lawful or neutral PCs summon angels. The beings act of free will to aid you on your turn. After 10 rounds, they return to their realms. You cannot cast this spell again until you complete penance.",
    l10n: {
      name: "支配",
      desc: "強大的存在前來助你一臂之力。這些存在的等級總和必須在 16 等或以下。混沌陣營的角色召喚惡魔/魔鬼，守序或中立陣營的角色召喚天使。這些存在會依自由意志在你的回合協助你。10 輪後，祂們回歸原本的領域。在你完成贖罪之前無法再次施展此法術。"
    }
  },
  {
    name: "Charm Person",
    range: "Near",
    class: "Wizard",
    tier: 1,
    desc: "You magically beguile one humanoid of LV 2 or less within near range, who regards you as a friend for the duration.The spell ends if you or your allies do anything harmful to the target.The target knows it was magically charmed after the spell ends.Roll 1d8 to determine amount of days effective",
    duration: { type: "Day", roll: { numDice: 1, diceType: "d8" } },
    l10n: {
      name: "魅惑人類",
      desc: "你用魔法迷惑近距離內一名等級 2 以下的人形生物，持續時間內視你為朋友。若你或盟友傷害目標，法術立即結束。法術結束後目標會知道自己曾被魔法魅惑。擲 1d8 決定持續天數。"
    }
  },
  {
    name: "Fabricate",
    range: "Near",
    class: "Wizard",
    tier: 3,
    duration: { type: "Round", amt: 10 },
    desc: "This spell can't target creatures. You turn a tree-sized collection of raw materials into a finished work. For example, you convert a pile of bricks or rocks into a bridge. The finished work converts back to raw materials when the spell ends.",
    l10n: {
      name: "鬼斧神工",
      desc: "此法術不能以生物為目標。你將一堆樹木大小的原料轉化為成品。例如，將一堆磚塊或岩石變成一座橋。法術結束時，成品會變回原料。"
    }
  },
  {
    name: "Fireball",
    range: "Far",
    class: "Wizard",
    tier: 3,
    duration: { type: "Instant", amt: 0 },
    desc: "You hurl a small flame that erupts into a fiery blast. All creatures in a near-sized cube around where the flame lands take 4d6 damage.",
    l10n: {
      name: "火球術",
      desc: "你擲出一小團火焰，引發劇烈爆炸。火焰落點周圍近距離立方體內的所有生物受到 4d6 傷害。"
    }
  },
  {
    name: "Command",
    range: "Far",
    class: "Priest",
    tier: 3,
    duration: { type: "Focus", amt: 0 },
    desc: "You issue a verbal command to one creature in range who can understand you. The command must be one word, such as “kneel.” The target obeys the command for as long as you focus. If your command is ever directly harmful to the creature, it may make a Charisma check vs. your last spellcasting check. On a success, the spell ends.",
    l10n: {
      name: "命令",
      desc: "你對範圍內一個能理解你的生物下達口頭命令。命令必須是一個詞，例如「跪下」。只要你維持專注，目標就會服從命令。若你的命令會直接傷害該生物，它可以進行魅力檢定對抗你最後的施法檢定。若成功，法術結束。"
    }
  },
  {
    name: "Commune",
    range: "Self",
    class: "Priest",
    tier: 4,
    duration: { type: "Instant", amt: 0 },
    desc: 'You seek your god\'s counsel. Ask the GM up to three yes or no questions. The GM truthfully answers "yes" or "no" to each. If you cast this spell more than once in 24 hours, treat a failed spellcasting check for it as a critical failure, instead.',
    l10n: {
      name: "通神",
      desc: "你尋求神祇的建議。向 GM 詢問最多三個是非題。GM 會如實回答「是」或「否」。若你在 24 小時內施展此法術超過一次，失敗的施法檢定將視為大失敗。"
    }
  },
  {
    name: "Confusion",
    range: "Near",
    class: "Wizard",
    tier: 4,
    duration: { type: "Focus", amt: 0 },
    desc: "You mesmerize one creature you can see in range. The target can't take actions, and it moves in a random direction on its turn. If the target is LV 9+, it may make a WIS check vs. your last spellcasting check at the start of its turn to end the spell.",
    l10n: {
      name: "困惑術",
      desc: "你催眠範圍內一個可見的生物。目標無法採取行動，並在回合中往隨機方向移動。若目標等級 9 以上，可在其回合開始時進行感知檢定對抗你最後的施法檢定以結束法術。"
    }
  },
  {
    name: "Control Water",
    range: "Far",
    class: "Wizard",
    tier: 4,
    duration: { type: "Focus", amt: 0 },
    desc: "You move and shape water. You can cause a section of water up to 100 feet in width and depth to change shape, defy gravity, or flow in a different direction.",
    l10n: {
      name: "操控水體",
      desc: "你移動並塑造水流。你可以使寬度和深度達 100 呎的水域改變形狀、違抗重力或流向不同方向。"
    }
  },
  {
    name: "Create Undead",
    range: "Close",
    class: "Wizard",
    tier: 5,
    duration: { type: "Day", subType: "InGame", amt: 1 },
    desc: "You conjure a vengeful undead creature to do your bidding. When you cast this spell, you choose to summon either a wight or wraith. It appears next to you and is under your control. The undead creature acts on your turn. After 1 day, it melts away into smoke.",
    l10n: {
      name: "喚起死靈",
      desc: "你召喚充滿復仇心態的亡靈為你效命。施展此法術時，選擇召喚屍妖或幽靈。它出現在你身旁受你控制。亡靈生物在你的回合行動。1 天後，它化為煙霧消散。"
    }
  },
  {
    name: "Disintegrate",
    range: "Far",
    class: "Wizard",
    tier: 5,
    duration: { type: "Instant", amt: 0 },
    desc: "A green ray shoots from your finger and turns a creature or object into ash. A target creature of LV 5 or less instantly dies. If it is LV 6+, it takes 3d8 damage, instead. A non-magical object up to the size of a large tree is destroyed.",
    l10n: {
      name: "分解術",
      desc: "一道綠色射線從你手指射出，將生物或物體化為灰燼。等級 5 以下的目標生物立即死亡。若是等級 6 以上，則受到 3d8 傷害。最大如大樹般的非魔法物體會被摧毀。"
    }
  },
  {
    name: "Dimension Door",
    range: "Self",
    class: "Wizard",
    tier: 4,
    duration: { type: "Instant", amt: 0 },
    desc: "You teleport yourself and up to one other willing creature to any point you can see.",
    l10n: {
      name: "次元門",
      desc: "將你和最多一名自願生物瞬間傳送到你可見的任何地點。"
    }
  },
  {
    name: "Divination",
    range: "Self",
    class: "Wizard",
    tier: 4,
    duration: { type: "Instant", amt: 0 },
    desc: 'You throw the divining bones or peer into the blackness between the stars, seeking a portent. You can ask the GM one yes or no question. The GM truthfully answers "yes" or "no." If you cast this spell more than once in 24 hours, treat a failed spellcasting check for it as a critical failure, instead.',
    l10n: {
      name: "預言",
      desc: "你擲出占卜骨或凝視星辰間的黑暗，尋求預兆。你可以問 GM 一個是非題。GM 會如實回答「是」或「否」。若你在 24 小時內施展此法術超過一次，失敗的施法檢定將視為大失敗。"
    }
  },
  {
    name: "Divine Vengeance",
    range: "Self",
    class: "Priest",
    tier: 5,
    duration: { type: "Round", amt: 10 },
    desc: "You become the divine avatar of your god's wrath, wreathed in holy flames or a black aura of smoldering corruption. For the spell's duration, you can fly a near distance, your weapons are magical, and you have a +4 bonus to your weapon attacks and damage.",
    l10n: {
      name: "神聖復仇",
      desc: "你化身為神祇憤怒的化身，被聖火或腐敗黑氣環繞。在法術持續時間內，你可以飛行「近」距離，武器視為魔法武器，且武器攻擊和傷害獲得 +4 加值。"
    }
  },
  {
    name: "Fly",
    range: "Self",
    class: "Wizard",
    tier: 3,
    duration: { type: "Round", amt: 5 },
    desc: "Your feet lift from the ground, and you take to the air like a hummingbird. You can fly near for the spell's duration and are able to hover in place.",
    l10n: {
      name: "飛行術",
      desc: "雙腳離地，像蜂鳥般飛向空中。法術持續期間你可以飛行「近」距離並能懸停。"
    }
  },
  {
    name: "Gaseous Form",
    range: "Self",
    tier: 3,
    class: "Wizard",
    duration: { type: "Round", amt: 10 },
    desc: "You and your gear turn into a cloud of smoke for the spell's duration. You can fly and pass through any gap that smoke could. You can sense the terrain and any movement around you out to a near distance. You can't cast spells while in this form.",
    l10n: {
      name: "氣化形體",
      desc: "你和你的裝備化為一團煙霧。你可以飛行並穿過煙霧能通過的任何縫隙。你可以感知周圍「近」距離內的地形和動靜。此形態下無法施法。"
    }
  },
  {
    name: "Heal",
    range: "Close",
    tier: 5,
    class: "Priest",
    duration: { type: "Instant", amt: 0 },
    desc: "One creature you touch is healed to full hit points. You cannot cast this spell again until you complete a rest.",
    l10n: {
      name: "治癒術",
      desc: "觸碰一名生物使其回復至滿生命值。在你完成休息前無法再次施展此法術。"
    }
  },
  {
    name: "Arcane Eye",
    range: "Near",
    class: "Wizard",
    tier: 4,
    duration: { type: "Focus", amt: 0 },
    desc: "You conjure an invisible, grape- sized eye within range. You can see through the eye. It can see in the dark out to near range, fly near on your turn, and squeeze through openings as narrow as a keyhole.",
    l10n: {
      name: "秘法眼",
      desc: "你在範圍內召喚一顆隱形、葡萄大小的眼睛。你可以透過這顆眼睛觀看。它擁有「近」距離的黑暗視覺，能在你的回合飛行「近」距離，並能穿過鑰匙孔般狹窄的開口。"
    }
  },
  {
    name: "Cloudkill",
    range: "Far",
    class: "Wizard",
    tier: 4,
    duration: { type: "Round", amt: 5 },
    desc: "A putrid cloud of yellow poison fills a near-sized cube within range. It spreads around corners. Creatures inside the cloud are blinded and take 2d6 damage at the beginning of their turns. A creature of LV 9 or less that ends its turn fully inside the cloud dies.",
    l10n: {
      name: "死雲術",
      desc: "一團腐臭的黃色毒雲充滿範圍內「近」距離大小的立方體空間。它會擴散繞過轉角。雲中的生物會目盲，並在回合開始時受到 2d6 傷害。等級 9 以下的生物若在回合結束時完全身處雲中則會死亡。"
    }
  },
  {
    name: "Feather Fall",
    range: "Self",
    class: "Wizard",
    tier: 1,
    desc: "You may make an attempt to cast this spell when you fall.Your rate of descent slows so that you land safely on your feet.",
    duration: { type: "Instant", amt: 0 },
    l10n: {
      name: "羽落術",
      desc: "當你墜落時可嘗試施展此法術。你的下降速度減緩，使你安全著地。"
    }
  },
  {
    name: "Animate Dead",
    range: "Close",
    class: "Wizard",
    tier: 3,
    desc: "You touch one humanoid’s remains, and it rises as a zombie or skeleton under your control. The remains must have at least three limbs and its head intact. The undead creature acts on your turn. After 1 day, the creature collapses into grave dust.",
    duration: { type: "Day", amt: 1 },
    l10n: {
      name: "活化死屍",
      desc: "你觸碰一具類人生物遺骸，將其喚起為受你控制的殭屍或骷髏。遺骸必須至少保有三肢與頭部。亡靈生物在你的回合行動。1 天後，該生物崩解為塵土。"
    }
  },
  {
    name: "Acid Arrow",
    range: "Far",
    class: "Wizard",
    tier: 2,
    desc: "You conjure a corrosive bolt that hits one foe, dealing 1d6 damage a round. The bolt remains in the target for as long as you focus.",
    duration: { type: "Focus", amt: 0 },
    l10n: {
      name: "酸液箭",
      desc: "你召喚一支腐蝕箭擊中一名敵人，每輪造成 1d6 傷害。只要你維持專注，箭矢就會留在目標體內。"
    }
  },
  {
    name: "Antimagic Shell",
    range: "Self",
    class: "Wizard",
    tier: 5,
    desc: "An invisible, near-sized cube of null-magic appears centered on you. Within the cube, no spells can be cast. Magic items and spells have no effect in the zone, and no magic can enter. The cube moves with you. Spells such as dispel magic have no effect on it. Another antimagic shell does not affect this one.",
    duration: { type: "Focus", amt: 0 },
    l10n: {
      name: "反魔場",
      desc: "以你為中心出現一個隱形、邊長為「近」距離的無魔方塊。在方塊內無法施法。魔法物品和法術在區域內無效，魔法也無法進入。方塊隨你移動。解除魔法等法術對其無效。另一個反魔場也不會影響此反魔場。"
    }
  },
  {
    name: "Dispel Magic",
    range: "Near",
    class: "Wizard",
    tier: 3,
    duration: { type: "Instant", amt: 0 },
    desc: "End one spell that affects one target you can see in range.",
    l10n: {
      name: "解除魔法",
      desc: "結束範圍內你看見的一個目標身上的一個法術效果。"
    }
  },
  {
    name: "Silence",
    range: "Far",
    class: "Wizard",
    tier: 2,
    desc: "You magically mute sound in a near cube within the spell’s range. Creatures inside the area are deafened, and any sounds they create cannot be heard.",
    duration: { type: "Focus", amt: 0 },
    l10n: {
      name: "沈默術",
      desc: "你消除範圍內「近」距離立方體空間的聲音。區域內的生物耳聾，且發出的任何聲音都無法被聽見。"
    }
  },
  {
    name: "Cleansing Weapon",
    range: "Close",
    class: "Priest",
    tier: 2,
    desc: "One weapon you touch is wreathed in purifying flames. It deals an additional 1d4 damage (1d6 vs. undead) for the duration.",
    duration: { type: "Round", amt: 5 },
    l10n: {
      name: "淨化武器",
      desc: "你觸碰的武器被淨化火焰包覆。持續期間額外造成 1d4 傷害（對亡靈 1d6）。"
    }
  },
  {
    name: "Floating Disk",
    range: "Near",
    class: "Wizard",
    tier: 1,
    desc: "You create a floating, circular disk of force with a concave center. It can carry up to 20 gear slots. It hovers at waist level and automatically stays within near of you. It can’t cross over drop- offs or pits taller than a human.",
    duration: { type: "Round", amt: 10 },
    l10n: {
      name: "浮碟術",
      desc: "你創造一個中間凹陷的圓形力場浮碟。它可承載多達 20 格物品。懸浮在腰部高度並自動保持在你「近」距離內。無法越過落差或高於人類的坑洞。"
    }
  },
  {
    name: "Misty Step",
    range: "Self",
    class: "Wizard",
    tier: 2,
    desc: "In a puff of smoke, you teleport a near distance to an area you can see.",
    duration: { type: "Instant", amt: 0 },
    l10n: {
      name: "迷蹤步",
      desc: "原本的位置爆出一團煙霧，傳送「近」距離到你看得見的地方。"
    }
  },
  {
    name: "Augury",
    range: "Self",
    class: "Priest",
    tier: 2,
    desc: "You interpret the meaning of supernatural portents and omens. Ask the GM one question about a specific course of action. The GM says whether the action will lead to “weal” or “woe.”",
    duration: { type: "Instant", amt: 0 },
    l10n: {
      name: "占卜",
      desc: "你解讀超自然預兆。針對特定行動問 GM 一個問題。GM 會告知該行動將導致「吉」或「凶」。"
    }
  },
  {
    name: "Mage Armor",
    range: "Self",
    class: "Wizard",
    tier: 1,
    desc: "An invisible layer of magical force protects your vitals. Your armor class becomes 14 (18 on a critical spellcasting check) for the spell’s duration.",
    duration: { type: "Round", amt: 10 },
    l10n: {
      name: "法師護甲",
      desc: "一層隱形魔法力場保護你的要害。持續期間 AC 變為 14（施法大成功則為 18）。"
    }
  },
  {
    name: "Holy Weapon",
    range: "Close",
    class: "Priest",
    tier: 1,
    desc: "One weapon you touch is imbued with a sacred blessing.The weapon becomes magical and has +1 to attack and damage rolls for the duration.",
    duration: { type: "Round", amt: 5 },
    l10n: {
      name: "神聖武器",
      desc: "你觸碰的武器灌注神聖祝福。持續期間武器視為魔法武器且攻擊和傷害檢定 +1。"
    }
  },
  {
    name: "Hold Person",
    range: "Near",
    class: "Wizard",
    tier: 2,
    desc: "You magically paralyze one humanoid creature of LV 4 or less you can see within range.",
    duration: { type: "Focus", amt: 0 },
    l10n: {
      name: "定身術",
      desc: "你用魔法麻痺範圍內一名可見的 4 等以下類人生物。"
    }
  },
  {
    name: "Mirror Image",
    range: "Self",
    class: "Wizard",
    tier: 2,
    desc: "You create a number of illusory duplicates of yourSelf equal to half your level rounded down (minimum 1). The duplicates surround you and mimic you.Each time a creature attacks you, the attack misses and causes one of the duplicates to evaporate.If all of the illusions have disappeared, the spell ends.",
    duration: { type: "Round", amt: 5 },
    l10n: {
      name: "鏡影術",
      desc: "你創造出數個虛幻分身，數量等你等級的一半（向下取整，至少 1 個）。分身環繞並模仿你。每當生物攻擊你時，該攻擊失誤並導致一個分身消散。若所有分身消失，法術結束。"
    }
  },
  {
    name: "Bless",
    range: "Close",
    class: "Priest",
    tier: 2,
    desc: "One creature you touch gains a luck token.",
    duration: { type: "Instant", amt: 0 },
    l10n: {
      name: "祝福術",
      desc: "你觸碰的生物獲得一枚幸運代幣。"
    }
  },
  {
    name: "Burning Hands",
    range: "Close",
    class: "Wizard",
    tier: 1,
    desc: "You spread your fingers with thumbs touching, unleashing a circle of flame that fills a close area around where you stand.Creatures within the area of effect take 1d6 damage.Unattended flammable objects ignite.",
    duration: { type: "Instant", amt: 0 },
    l10n: {
      name: "燃燒之手",
      desc: "你雙手拇指相觸張開手指，釋放一圈火焰填滿你身周「貼身」距離區域。區域內生物受到 1d6 傷害。無人持有的易燃物會著火。"
    }
  },
  {
    name: "Blind/Deafen",
    range: "Near",
    class: "Priest",
    tier: 2,
    desc: "You utter a divine censure, blinding or deafening one creature you can see in range. The creature has disadvantage on tasks requiring the lost sense.",
    duration: { type: "Focus", amt: 0 },
    l10n: {
      name: "目盲/耳聾術",
      desc: "你發出神聖斥責，使範圍內一名可見生物目盲或耳聾。該生物在需要該感官的任務上具有劣勢。"
    }
  },
  {
    name: "Web",
    range: "Far",
    class: "Wizard",
    tier: 2,
    desc: "You create a near-sized cube of sticky, dense spider web within the spell’s range. A creature stuck in the web can’t move and must succeed on a Strength check opposed by your spellcasting check to free itself.",
    duration: { type: "Round", amt: 5 },
    l10n: {
      name: "蛛網術",
      desc: "你在範圍內創造一個「近」距離大小的立方體黏稠蛛網。被困住的生物無法移動，必須通過力量檢定（對抗你的施法檢定）才能掙脫。"
    }
  },
  {
    name: "Light",
    range: "Close",
    class: "PriestWizard",
    tier: 1,
    desc: "One object you touch glows with bright, heatless light, illuminating out to a near distance for 1 hour of real time.",
    duration: { type: "Hour", subType: "RealTime", amt: 1 },
    l10n: {
      name: "光亮術",
      desc: "你觸碰一個物體使其發出明亮冷光，照明範圍達「近」距離，持續 1 小時（現實時間）。"
    }
  },
  {
    name: "Cure Wounds",
    range: "Close",
    class: "Priest",
    tier: 1,
    desc: "Your touch restores ebbing life.Roll a number of d6s equal to 1 + half your level (rounded down).One target you touch regains that many hit points.",
    duration: { type: "Instant", amt: 0 },
    l10n: {
      name: "治療輕傷",
      desc: "你的觸摸恢復生命。擲 d6，數量等同 1 + 等級的一半（向下取整）。你觸碰的目標回復該數值的生命值。"
    }
  },
  {
    name: "Invisibility",
    range: "Close",
    class: "Wizard",
    tier: 2,
    desc: "A creature you touch becomes invisible for the spell’s duration.The spell ends if the target attacks or casts a spell.",
    duration: { type: "Round", amt: 10 },
    l10n: {
      name: "隱形術",
      desc: "你觸碰的生物變為隱形。若目標攻擊或施法，法術結束。"
    }
  },
  {
    name: "Detect Magic",
    range: "Near",
    class: "Wizard",
    tier: 1,
    desc: "You can sense the presence of magic within near range for the spell's duration. If you focus for two rounds, you discern its general properties. Full barriers block this spell.",
    duration: { type: "Focus", amt: 0 },
    l10n: {
      name: "偵測魔法",
      desc: "持續期間你可以感知「近」距離內的魔法存在。若專注兩輪，可辨識其大致特性。完全的屏障可阻擋此法術。"
    }
  },
  {
    name: "Knock",
    range: "Near",
    class: "Wizard",
    tier: 2,
    desc: "A door, window, gate, chest, or portal you can see within range instantly opens, defeating all mundane locks and barriers.This spell creates a loud knock audible to all within earshot.",
    duration: { type: "Instant", amt: 0 },
    l10n: {
      name: "敲擊術",
      desc: "範圍內你看見的門、窗、柵欄、箱子或傳送門瞬間打開，破解所有凡俗鎖具與障礙。此法術會發出響亮的敲擊聲，周圍皆可聽見。"
    }
  },
  {
    name: "Magic Missile",
    range: "Far",
    class: "Wizard",
    tier: 1,
    desc: "You have advantage on your check to cast this spell.A glowing bolt of force streaks from your open hand, dealing 1d4 damage to one target.",
    duration: { type: "Instant", amt: 0 },
    l10n: {
      name: "魔法飛彈",
      desc: "此法術的施法檢定具有優勢。一道發光力場箭從你手中射出，對一個目標造成 1d4 傷害。"
    }
  },
  {
    name: "Detect Thoughts",
    range: "Near",
    class: "Wizard",
    tier: 2,
    desc: "You peer into the mind of one creature you can see within the spell’s range.Each round, you learn the target’s immediate thoughts.On its turn, the target makes a Wisdom check opposed by your last spellcasting check. If the target succeeds, it notices your presence in its mind and the spell ends.",
    duration: { type: "Focus", amt: 0 },
    l10n: {
      name: "偵測思想",
      desc: "你窺視範圍內一個可見生物的心智。每輪你得知目標當下的想法。在它的回合，目標進行感知檢定對抗你最後的施法檢定。若成功，它察覺你進入其心智，法術結束。"
    }
  },
  {
    name: "Smite",
    range: "Near",
    class: "Priest",
    tier: 2,
    desc: "You call down punishing flames on a creature you can see within range. It takes 1d6 damage.",
    duration: { type: "Instant", amt: 0 },
    l10n: {
      name: "懲擊",
      desc: "你召喚懲罰之火降臨在範圍內一個可見生物身上。造成 1d6 傷害。"
    }
  },
  {
    name: "Protection From Evil",
    range: "Close",
    class: "PriestWizard",
    tier: 1,
    desc: "For the spell’s duration, chaotic beings have disadvantage on attack rolls and hostile spellcasting checks against the target. These beings also can’t possess, compel, or beguile it.When cast on an already-possessed target, the possessing entity makes a CHA check vs. the last spellcasting check. On a failure, the entity is expelled.",
    duration: { type: "Focus", amt: 0 },
    l10n: {
      name: "防護邪惡",
      desc: "持續期間，混沌生物對目標的攻擊檢定和敵對施法檢定具有劣勢。它們也無法附身、強迫或魅惑目標。若對已附身的目標施展，附身體需進行魅力檢定對抗施法檢定。若失敗則被驅逐。"
    }
  },
  {
    name: "Levitate",
    range: "Self",
    class: "Wizard",
    tier: 2,
    desc: "You can float a near distance vertically per round on your turn.You can also push against solid objects to move horizontally.",
    duration: { type: "Focus", amt: 0 },
    l10n: {
      name: "漂浮術",
      desc: "你在自己回合可垂直漂浮「近」距離。你也可以推動固體物體來水平移動。"
    }
  },
  {
    name: "Alarm",
    range: "Close",
    class: "Wizard",
    tier: 1,
    desc: "You touch one object, such as a door threshold, setting a magical alarm on it.If any creature you do not designate while casting the spell touches or crosses past the object, a magical bell sounds in your head.If any creature you do not designate while casting the spell touches or crosses past the object, a magical bell sounds in your head.",
    duration: { type: "Day", amt: 1 },
    l10n: {
      name: "警報術",
      desc: "你觸碰一個物體（如門檻）設下魔法警報。若未經你指定的生物觸碰或跨過該物體，魔法鈴聲會在你的腦海響起。"
    }
  },
  {
    name: "Shield of Faith",
    range: "Self",
    class: "Priest",
    tier: 1,
    desc: "A protective force wrought of your holy conviction surrounds you. You gain a +2 bonus to your armor class for the duration.",
    duration: { type: "Round", amt: 5 },
    l10n: {
      name: "虔誠護盾",
      desc: "你的神聖信念化為防護力場環繞你。持續期間 AC +2。"
    }
  },
  {
    name: "Turn Undead",
    range: "Near",
    class: "Priest",
    tier: 1,
    desc: "You rebuke undead creatures, forcing them to flee. You must present a holy symbol to cast this spell.Undead creatures within near of you must make a CHA check opposed by your spellcasting check. If a creature fails by 10+ points and is equal to or less than your level, it is destroyed. Otherwise, on a fail, it flees from you for 5 rounds.",
    duration: { type: "Instant", amt: 0 },
    l10n: {
      name: "驅散亡靈",
      desc: "你斥退亡靈使其逃跑。需出示聖徽。你周圍「近」距離內的亡靈進行魅力檢定對抗你的施法檢定。若失敗 10 點以上且等級不高於你，則被摧毀。否則失敗時逃跑 5 輪。"
    }
  },
  {
    name: "Sleep",
    range: "Near",
    class: "Wizard",
    tier: 1,
    desc: "You weave a lulling spell that fills a near-sized cube extending from you. Living creatures in the area of effect fall into a deep sleep if they are LV 2 or less. Vigorous shaking or being injured wakes them.",
    duration: { type: "Instant", amt: 0 },
    l10n: {
      name: "睡眠術",
      desc: "你編織催眠魔法填滿從你延伸的「近」距離立方體。區域內等級 2 以下的活物陷入沉睡。劇烈搖晃或受傷會喚醒它們。"
    }
  },
  {
    name: "Flame Strike",
    range: "Far",
    tier: 4,
    class: "Priest",
    duration: { type: "Instant", amt: 0 },
    desc: "You call down a holy pillar of fire, immolating one creature you can see within range. The target takes 2d6 damage.",
    l10n: {
      name: "焰擊術",
      desc: "你召喚神聖火柱，焚燒範圍內一名可見生物。目標受到 2d6 傷害。"
    }
  },
  {
    name: "Fixed Object",
    range: "Close",
    class: "Wizard",
    tier: 2,
    desc: "An object you touch that weighs no more than 5 pounds becomes fixed in its current location. It can support up to 5,000 pounds of weight for the duration of the spell.",
    duration: { type: "Round", amt: 5 },
    l10n: {
      name: "定物術",
      desc: "你觸碰一個不超過 5 磅的物體，使其固定在當前位置。持續期間可承受 5000 磅重量。"
    }
  },
  {
    name: "Alter Self",
    range: "Self",
    class: "Wizard",
    tier: 2,
    desc: "You magically change your physical form, gaining one feature that modifies your existing anatomy.For example, you can grow functional gills on your neck or bear claws on your fingers. This spell can’t grow wings or limbs.",
    duration: { type: "Round", amt: 5 },
    l10n: {
      name: "變顏術",
      desc: "你用魔法改變外形，獲得一個修改現有生理結構的特徵。例如：在頸部長出鰓或手指長出爪子。此法術不能長出翅膀或新的肢體。"
    }
  },
  {
    name: "Hold Portal",
    range: "Near",
    class: "Wizard",
    tier: 1,
    desc: "You magically hold a portal closed for the duration. A creature must make a successful STR check vs. your spellcasting check to open the portal.The knock spell ends this spell.",
    duration: { type: "Round", amt: 10 },
    l10n: {
      name: "封門術",
      desc: "你用魔法將傳送門/門戶封閉。生物必須通過力量檢定（對抗你的施法檢定）才能打開。敲擊術可結束此法術。"
    }
  },
  {
    name: "Zone of Truth",
    range: "Near",
    class: "Priest",
    tier: 2,
    desc: "You compel a creature you can see to speak truth. It can’t utter a deliberate lie while within range.",
    duration: { type: "Focus", amt: 0 },
    l10n: {
      name: "誠實之域",
      desc: "你強迫一名可見生物說實話。在範圍內它無法故意說謊。"
    }
  },
  {
    name: "Hold Monster",
    tier: 5,
    class: "Wizard",
    duration: { type: "Focus", amt: 0 },
    range: "Near",
    desc: "You paralyze one creature you can see within range. If the target is LV 9+, it may make a STR check vs. your last spellcasting check at the start of its turn to end the spell.",
    l10n: {
      name: "怪物定身術",
      desc: "你麻痺範圍內一名可見生物。若目標等級 9 以上，可在其回合開始時進行力量檢定對抗你最後的施法檢定以結束法術。"
    }
  },
  {
    name: "Illusion",
    tier: 3,
    class: "Wizard",
    duration: { type: "Focus", amt: 0 },
    range: "Far",
    desc: "You create a convincing visible and audible illusion that fills up to a near-sized cube in range. The illusion cannot cause harm, but creatures who believe the illusion is real react to it as though it were. A creature who inspects the illusion from afar must pass a Wisdom check vs. your last spellcasting check to perceive the false nature of the illusion. Touching the illusion also reveals its false nature.",
    l10n: {
      name: "幻術",
      desc: "你創造一個逼真的視聽幻象，填滿範圍內「近」距離大小的立方體。幻象無法造成傷害，但信以為真的生物會做出相應反應。從遠處檢查幻象的生物需通過感知檢定對抗你的施法檢定才能識破。觸碰幻象也會揭穿其假象。"
    }
  },
  {
    name: "Judgement",
    tier: 5,
    class: "Priest",
    duration: { type: "Round", amt: 5 },
    range: "Close",
    desc: "You instantly banish a creature you touch, sending it and all possessions it carries to face the judgment of your god. You can banish an intelligent creature of LV 10 or less. When the creature returns in 5 rounds, it has been healed to full hit points if its deeds pleased your god. It has been reduced to 1 hit point if its deeds angered your god. If your god can't judge its actions, it is unchanged.",
    l10n: {
      name: "審判",
      desc: "你瞬間放逐觸碰的生物及其裝備，使其面對神祇的審判。可放逐 10 等以下的智慧生物。5 輪後回歸時，若其行為取悅神祇則滿血；若觸怒神祇則剩 1 點生命。若神祇無法審判則無變化。"
    }
  },
  {
    name: "Lay To Rest",
    tier: 3,
    class: "Priest",
    duration: { type: "Instant", amt: 0 },
    range: "Close",
    desc: "You instantly send an undead creature you touch to its final afterlife, destroying it utterly. You can target an undead creature of LV 9 or less.",
    l10n: {
      name: "安息",
      desc: "瞬間將觸碰的亡靈送往來世，將其徹底摧毀。可針對 9 等以下的亡靈。"
    }
  },
  {
    name: "Lighting Bolt",
    tier: 3,
    class: "Wizard",
    duration: { type: "Instant", amt: 0 },
    range: "Far",
    desc: "You shoot a blue-white ray of lightning from your hands, hitting all creatures in a straight line out to a far distance. Creatures struck by the lightning take 3d6 damage.",
    l10n: {
      name: "閃電束",
      desc: "你手掌射出一道藍白雷電，擊中直線「遠」距離內的所有生物。造成 3d6 傷害。"
    }
  },
  {
    name: "Magic Circle",
    tier: 3,
    class: "Wizard",
    duration: { type: "Focus", amt: 0 },
    range: "Near",
    desc: "You conjure a circle of runes out to near-sized cube centered on yourself and name a type of creature (for example, demons). For the spell’s duration, creatures of the chosen type cannot attack or cast a hostile spell on anyone inside the circle. The chosen creatures also can’t possess, compel, or beguile anyone inside the circle.",
    l10n: {
      name: "魔法法陣",
      desc: "以你為中心召喚一圈符文覆蓋「近」距離立方體，並指定一種生物類別（如惡魔）。持續期間該類別生物無法攻擊或對圈內目標施展敵對法術，也無法附身、強迫或魅惑圈內任何人。"
    }
  },
  {
    name: "Mass Cure",
    tier: 3,
    class: "Priest",
    duration: { type: "Instant", amt: 0 },
    range: "Near",
    desc: "All allies within near range of you regain 2d6 hit points.",
    l10n: {
      name: "群體治療",
      desc: "你周圍「近」距離內所有盟友回復 2d6 生命值。"
    }
  },
  {
    name: "Passwall",
    tier: 4,
    class: "Wizard",
    duration: { type: "Round", amt: 5 },
    range: "Close",
    desc: "A tunnel of your height opens in a barrier you touch and lasts for the duration. The passage can be up to near distance in length and must be in a straight line.",
    l10n: {
      name: "穿牆術",
      desc: "在你觸碰的障礙物上開啟一個與你等高的隧道。長度可達「近」距離，必須是直線。"
    }
  },
  {
    name: "Pillar Of Salt",
    tier: 4,
    class: "Priest",
    duration: { type: "Focus", amt: 0 },
    range: "Near",
    desc: "A creature you target turns into a statue made of hardened salt. You can target a creature you can see of LV 5 or less. If you successfully focus on this spell for 3 rounds in a row, the transformation becomes permanent.",
    l10n: {
      name: "鹽柱術",
      desc: "目標生物變成硬鹽雕像。可針對 5 等以下可見生物。若連續專注 3 輪，變形將永久化。"
    }
  },
  {
    name: "Plane Shift",
    tier: 5,
    class: "PriestWizard",
    duration: { type: "Instant", amt: 0 },
    range: "Close",
    desc: "You fold space and time, transporting yourself and all willing creatures within close range to a location on another plane of your choice. Unless you have been to your intended location before, you appear in a random place on the destination plane.",
    l10n: {
      name: "異界傳送",
      desc: "摺疊時空，將自己和「貼身」距離內的自願生物傳送到你選擇的異界地點。若未曾去過該地，將出現在隨機地點。"
    }
  },
  {
    name: "Polymorph",
    tier: 4,
    class: "Wizard",
    duration: { type: "Round", amt: 10 },
    range: "Close",
    desc: "You transform a creature you touch into another natural creature you choose of equal or smaller size. Any gear the target carries melds into its new form. The target gains the creature's physical statistics, but it retains its non-physical statistics. If the target goes to 0 hit points, it reverts to its true form at half its prior hit points. You can target any willing creature with this spell, or an unwilling creature whose level is less than or equal to half your level rounded down (minimum 1).",
    l10n: {
      name: "變形術",
      desc: "將觸碰的生物變形為你選擇的等體型或較小的自然生物。裝備融入新形態。目標獲得該生物的生理數值，但保留非生理數值。若生命值歸零則變回原形，生命值剩一半。可針對自願生物，或等級不高於你等級一半（至少 1）的非自願生物。"
    }
  },
  {
    name: "Power Word Kill",
    tier: 5,
    class: "Wizard",
    duration: { type: "Instant", amt: 0 },
    range: "Near",
    desc: "You utter the Word of Doom. One creature you target of LV 9 or less dies if it hears you. Treat a failed spellcasting check for this spell as a critical failure, and roll the mishap with disadvantage.",
    l10n: {
      name: "律令：死",
      desc: "說出毀滅真言。目標 9 等以下生物若聽見則立即死亡。此法術施法失敗視為大失敗，且災難檢定具劣勢。"
    }
  },
  {
    name: "Prismatic Orb",
    tier: 5,
    class: "Wizard",
    duration: { type: "Instant", amt: 0 },
    range: "Far",
    desc: "You send a strobing orb of energy streaking toward a target within range. Choose an energy type from fire, cold, or electricity. The orb deals 3d8 damage and delivers a concussive blast of the chosen energy type. If the energy type is anathema to the target's existence (for example, cold energy against a fire elemental), the orb deals double damage to it, instead.",
    l10n: {
      name: "虹光法球",
      desc: "射出一顆閃爍能量球攻擊目標。選擇火、冰或電屬性。造成 3d8 傷害及該屬性的衝擊波。若屬性剋制目標（如冰剋火元素），則造成雙倍傷害。"
    }
  },
  {
    name: "Prophecy",
    tier: 5,
    class: "Priest",
    duration: { type: "Instant", amt: 0 },
    range: "Self",
    desc: "You commune directly with your god for guidance. Ask the GM one question. The GM answers the question truthfully using the knowledge your god possesses. Deities are mighty, but not omniscient. You cannot cast this spell again until you complete penance.",
    l10n: {
      name: "預言術",
      desc: "直接與神祇溝通尋求指引。問 GM 一個問題。GM 依神祇所知如實回答。神祇強大但非全知。贖罪前無法再施展。"
    }
  },
  {
    name: "Protection From Energy",
    tier: 3,
    class: "Wizard",
    duration: { type: "Focus", amt: 0 },
    range: "Close",
    desc: "One creature you touch becomes impervious to the wild fury of the elements. Choose fire, cold, or electricity. For the spell's duration, the target is immune to harm from energy of the chosen type.",
    l10n: {
      name: "防護能量",
      desc: "觸碰的生物獲得對元素的免疫力。選擇火、冰或電。持續期間目標對該屬性傷害免疫。"
    }
  },
  {
    name: "Rebuke Unholy",
    tier: 3,
    class: "Priest",
    duration: { type: "Instant", amt: 0 },
    range: "Near",
    desc: "You rebuke creatures who oppose your alignment, forcing them to flee. You must present a holy symbol to cast this spell. If you are lawful or neutral, this spell affects demons, devils, and outsiders. If you are chaotic, this spell affects angels and natural creatures of the wild. Affected creatures within near of you must make a CHA check vs. your spellcasting check. If a creature fails by 10+ points and is equal to or less than your level, it is destroyed. Otherwise, on a fail, it flees from you for 5 rounds.",
    l10n: {
      name: "斥責不潔",
      desc: "斥退與你陣營對立的生物。需出示聖徽。若你為守序/中立，影響惡魔/魔鬼/異界生物；若為混沌，影響天使/自然生物。周圍「近」距離目標進行魅力檢定對抗施法檢定。若失敗 10 點以上且等級不高於你則摧毀，否則逃跑 5 輪。"
    }
  },
  {
    name: "Regenerate",
    tier: 4,
    class: "Priest",
    duration: { type: "Focus", amt: 0 },
    range: "Close",
    desc: "A creature you touch regains 1d4 hit points on your turn for the duration. This spell also regrows lost body parts.",
    l10n: {
      name: "再生術",
      desc: "持續期間，觸碰的生物每輪回復 1d4 生命。也會長回失去的肢體。"
    }
  },
  {
    name: "Resilient Sphere",
    tier: 4,
    class: "Wizard",
    duration: { type: "Round", amt: 5 },
    range: "Close",
    desc: "You conjure a weightless, glassy sphere around you that extends out to close range. For the spell's duration, nothing can pass through or crush the sphere. You can roll the sphere a near distance on your turn.",
    l10n: {
      name: "彈力法球",
      desc: "在你周圍召喚一個延伸至「貼身」距離的無重力隱形球體。持續期間，無物能穿過或壓碎球體。你可在回合內滾動球體移動「近」距離。"
    }
  },
  {
    name: "Restoration",
    tier: 3,
    class: "Priest",
    duration: { type: "Instant", amt: 0 },
    range: "Close",
    desc: "With the touch of your hands, you expunge curses and illnesses. One curse, illness, or affliction of your choice affecting the target creature ends.",
    l10n: {
      name: "復原術",
      desc: "觸摸消除詛咒與疾病。結束目標身上的一個詛咒、疾病或異常狀態。"
    }
  },
  {
    name: "Scrying",
    tier: 5,
    class: "Wizard",
    duration: { type: "Focus", amt: 0 },
    range: "Self",
    desc: "You look into a crystal ball or reflecting pool, calling up images of a distant place. For the spell's duration, you can see and hear a creature or location you choose that is on the same plane. This spell is DC 18 to cast if you try to scry on a creature or location that is unfamiliar to you. Each round, creatures you view may make a Wisdom check vs. your last spellcasting check. On a success, they become aware of your magical observation.",
    l10n: {
      name: "探知",
      desc: "透過水晶球或水池觀看遠方。持續期間可視聽同一位面的選定生物或地點。若目標不熟悉，DC 為 18。每輪被觀察者可進行感知檢定對抗施法檢定，成功則察覺被窺視。"
    }
  },
  {
    name: "Sending",
    tier: 3,
    class: "Wizard",
    duration: { type: "Instant", amt: 0 },
    range: "Far",
    desc: "Range Unlimited. You send a brief, mental message to any creature with whom you are familiar who is on the same plane.",
    l10n: {
      name: "短訊術",
      desc: "距離無限。傳送一則簡短心靈訊息給同一位面你熟悉的生物。"
    }
  },
  {
    name: "Shapechange",
    tier: 5,
    class: "Wizard",
    duration: { type: "Focus", amt: 0 },
    range: "Self",
    desc: "You transform yourself and any gear you carry into another natural creature you've seen of level 10 or less. You assume the creature's physical statistics, but you retain your non-physical statistics (such as INT, WIS, and CHA). If you go to 0 HP while under the effects of this spell, you revert to your true form at 1 HP.",
    l10n: {
      name: "形體變化",
      desc: "你與裝備變形成你見過的 10 等以下自然生物。獲得其生理數值但保留心智數值（智/感/魅）。若生命歸零則變回原形並剩 1 點生命。"
    }
  },
  {
    name: "Speak With Dead",
    tier: 3,
    class: "Wizard",
    duration: { type: "Instant", amt: 0 },
    range: "Close",
    desc: 'A dead body you touch answers your questions in a distant, wheezing voice. You can ask the dead body up to three yes or no questions (one at a time). The GM truthfully answers "yes" or "no" to each. If you cast this spell more than once in 24 hours, treat a failed spellcasting check for it as a critical failure, instead.',
    l10n: {
      name: "死者交談",
      desc: "觸摸的屍體以嘶啞聲音回答問題。可問三個是非題。GM 如實回答。24 小時內施展超過一次，失敗視為大失敗。"
    }
  },
  {
    name: "Stoneskin",
    tier: 4,
    class: "Wizard",
    duration: { type: "Round", amt: 10 },
    range: "Self",
    desc: "Your skin becomes like granite. For the spell's duration, your armor class becomes 17 (20 on a critical spellcasting check).",
    l10n: {
      name: "石膚術",
      desc: "皮膚變得像花崗岩。持續期間 AC 變為 17（施法大成功則為 20）。"
    }
  },
  {
    name: "Summon Extraplanar",
    tier: 5,
    class: "Wizard",
    duration: { type: "Focus", amt: 0 },
    range: "Near",
    desc: "You reach into the outer planes, summoning forth a creature. You summon an elemental or outsider of LV 7 or less. The creature is under your control and acts on your turn. If you lose focus on this spell, you lose control of the creature and it becomes hostile toward you and your allies. You must pass a spellcasting check on your turn to return the creature to the outer planes.",
    l10n: {
      name: "異界盟誓",
      desc: "從外層位面召喚生物。召喚 7 等以下的元素或異界生物。受控於你並在你的回合行動。若失去專注則失控並敵視你。你必須通過施法檢定才能將其送回。"
    }
  },
  {
    name: "Telekinesis",
    tier: 4,
    class: "Wizard",
    duration: { type: "Focus", amt: 0 },
    range: "Far",
    desc: "You lift a creature or object with your mind. Choose a target that weights 1,000 pounds or less. You can move it a near distance in any direction and hold it in place.",
    l10n: {
      name: "念力",
      desc: "用心靈在大於 1000 磅的物體或生物。可由任意方向移動「近」距離或將其固定。"
    }
  },
  {
    name: "Teleport",
    tier: 5,
    class: "Wizard",
    duration: { type: "Instant", amt: 0 },
    range: "Close",
    desc: "You and any willing creatures you choose within close range teleport to a location you specify on your same plane. You can travel to a known teleportation sigil or to a location you've been before. Otherwise, you have a 50% chance of arriving off-target.",
    l10n: {
      name: "傳送術",
      desc: "你和「貼身」距離內的自願生物傳送到同一位面指定地點。可前往已知法陣或去過的地點。否則有 50% 機率傳錯位置。"
    }
  },
  {
    name: "Wall Of Force",
    tier: 4,
    class: "Wizard",
    duration: { type: "Round", amt: 5 },
    range: "Near",
    desc: "You lift your hands, conjuring a transparent wall of force. The thin wall must be contiguous and can cover a near-sized area in width and length. You choose its shape. Nothing on the same plane can physically pass through the wall.",
    l10n: {
      name: "力場牆",
      desc: "召喚透明力場牆。牆體連續且覆蓋「近」距離長寬。形狀由你決定。同一位面亦無法物理穿過。"
    }
  },
  {
    name: "Wish",
    tier: 5,
    class: "Wizard",
    duration: { type: "Instant", amt: 5 },
    range: "Self",
    desc: "This mighty spell alters reality. Make a single wish, stating it as exactly as possible. Your wish occurs, as interpreted by the GM. Treat a failed spellcasting check for this spell as a critical failure, and roll the mishap with disadvantage.",
    l10n: {
      name: "祈願術",
      desc: "改變現實的強大法術。許一個願望。願望會依 GM 解讀實現。施法失敗視為大失敗，且災難檢定具劣勢。"
    }
  },
  {
    name: "Wrath",
    tier: 4,
    class: "Priest",
    duration: { type: "Round", amt: 10 },
    range: "Self",
    desc: "Your weapons become magical +2 and deal an additional d8 damage for the spell's duration.",
    l10n: {
      name: "神怒",
      desc: "持續期間，你的武器變為 +2 魔法武器，並額外造成 d8 傷害。"
    }
  },
];

const SPELL_COMPENDIUM: { [name: string]: SpellInfo } = {};
for (const s of SPELLS) {
  SPELL_COMPENDIUM[s.name.toLowerCase()] = s;
}
export default SPELL_COMPENDIUM;
