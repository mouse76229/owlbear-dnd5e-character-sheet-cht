# ShadowDark 轉回 D&D 5E 系統轉換分析報告

本文件詳細分析將目前的 ShadowDark Character Sheet 專案轉換回 Dungeons & Dragons 5th Edition (DnD 5E) 系統所需進行的改動與工程評估。

## 1. 資料結構與規則層面 (Data Structure & Rules)

這是影響最深遠的部分，核心資料模型 (`types.d.ts`, `constants.ts`) 需要大幅重構。

### 1.1 核心屬性與技能 (Stats & Skills)
*   **屬性 (Stats)**：兩者皆使用 STR/DEX/CON/INT/WIS/CHA，但 5E 引入了 **熟練加值 (Proficiency Bonus)** 的概念，這是 ShadowDark (以下簡稱 SD) 所沒有的。
*   **技能 (Skills)**：這是最大的差異點。
    *   **現狀 (SD)**：沒有固定的技能列表，僅依賴屬性檢定或背景優勢。
    *   **需求 (5E)**：需要實作完整的 18 項技能列表 (如 Acrobatics, Perception, Stealth 等)，並記錄每項技能的「熟練 (Proficient)」、「專精 (Expertise)」或「半熟練 (Jack of all trades)」狀態。
*   **豁免檢定 (Saving Throws)**：
    *   **現狀 (SD)**：無特定豁免加值系統。
    *   **需求 (5E)**：需要區分六大屬性的豁免檢定，並標記熟練項目。

### 1.2 職業與種族 (Classes & Ancestries)
*   **職業 (Classes)**：
    *   SD 僅有 Fighter, Priest, Wizard, Thief, Ranger (在此專案)。
    *   5E 需要擴充至 12+ 個基礎職業 (Barbarian, Bard, Cleric, Druid, Fighter, Monk, Paladin, Ranger, Rogue, Sorcerer, Warlock, Wizard, Artificer)。
    *   需引入 **子職業 (Subclasses)** 系統，通常在 Level 1-3 選擇。
*   **種族 (Ancestries/Races)**：
    *   SD 種族較少且單純。
    *   5E 需要引入 **亞種 (Subraces)** 及更多樣的種族特性 (如黑暗視覺、毒素抗性等)。

### 1.3 魔法系統 (Spells)
*   **環階**：
    *   SD：Tier 1-5。
    *   5E：Cantrips (戲法) + Level 1-9。
*   **法術位 (Spell Slots)**：
    *   5E 的法術位計算複雜（全施法者、半施法者、契約魔法），需要依據職業等級自動計算。
*   **準備與已知**：需區分「已知法術」與「準備法術」的邏輯。

### 1.4 其他規則細節
*   **休息 (Resting)**：需實作短休 (Short Rest) 與長休 (Long Rest) 的回血與資源恢復機制（生命骰 Hit Dice）。
*   **死亡豁免 (Death Saves)**：由 SD 的死亡計時器改為 5E 的「三成功/三失敗」檢定系統。
*   **背刺/優勢**：SD 的 Backstab 與 5E 的 Sneak Attack 機制不同。

---

## 2. 介面與功能層面 (UI & Features)

現有的 Svelte 元件 (`src/lib/components`) 需要針對 5E 的佈局進行調整。

*   **新增技能分頁/區塊**：必須新增一個顯示 18 項技能的區塊，並允許點擊進行檢定（自動加上屬性與熟練加值）。
*   **調整法術介面**：需支援 0-9 環的分類，並顯示法術位消耗 (Slot Tracker)。
*   **重構天賦 (Talents) 介面**：
    *   SD 的隨機天賦 (Talents) 應改為 **職業特性 (Class Features)** 與 **專長 (Feats)** 列表。
    *   需要一個特定的區域顯示種族與職業的被動能力。
*   **裝備與背包**：
    *   5E 的負重規則 (Encumbrance) 與 SD 的「格數 (Slots)」制完全不同。SD 以物品佔用格數為主，5E 以重量 (lbs) 為主。介面需從「格數條」改為「負重條」。
    *   貨幣系統：除了 gp/sp/cp，5E 常用 pp (白金) 與 ep (厄連)，雖然可選，但建議支援。
*   **AC 計算介面**：需支援更複雜的 AC 公式（如武僧的無甲防禦、盾牌、敏捷上限限制等）。

---

## 3. 邏輯運算層面 (Logic & Calculations)

`src/lib/utils.ts` 與 `src/lib/model` 中的運算邏輯需全面更新。

*   **檢定公式**：
    *   SD: d20 + Stat Mod + Talent
    *   5E: d20 + Stat Mod + Proficiency (if applicable) + Other Modifiers
*   **熟練加值 (Proficiency Bonus)**：需實作 `ceil(Level / 4) + 1` 的公式，並應用於攻擊、技能、豁免與法術 DC。
*   **被動感知 (Passive Perception)**：需自動計算 `10 + Wis Mod + Proficiency`。
*   **先攻 (Initiative)**：通常為 `Dex Mod`，但需預留 Feat 加成 (如 Alert)。

---

## 4. 在地化翻譯 (Localization)

`src/lib/translations.ts` 需要大規模擴充。

*   **名詞替換**：所有的職業、種族、法術名稱需對應 D&D 5E 的繁體中文譯名 (如 SRD 常用譯名)。
*   **技能名稱**：新增 18 個技能的中文翻譯。
*   **狀態效果 (Conditions)**：新增 5E 的狀態 (Stunned, Prone, Charmed 等)翻譯。

---

## 5. 執行步驟建議 (Recommendations)

若要執行此轉換，建議採取以下順序：

1.  **資料層重構**：優先修改 `types.d.ts`，定義 5E 的 `Character` 介面，加入 `skills`, `proficiencyBonus`, `hitDice` 等欄位。
2.  **規則庫建立**：在 `constants.ts` 建立 5E 的技能列表、職業列表、經驗值表 (5E XP table)。
3.  **核心邏輯實作**：更新 `PlayerCharacter.ts` 中的數值計算邏輯（如熟練加值計算）。
4.  **UI 逐步替換**：
    *   先修改屬性面板 (加入豁免)。
    *   新增技能面板。
    *   修改法術與背包系統。
5.  **資料移轉**：由於系統差異過大，建議不保留舊的存檔相容性，或僅保留基礎屬性，其餘重置。

此變更幾乎等同於重寫 60% 的應用程式邏輯，請評估是否直接建立新專案或使用現有的 5E Character Sheet 擴充套件可能更為高效。
