# D&D 5E 轉換專案工作清單

本專案旨在將 ShadowDark Character Sheet 轉換回 Dungeons & Dragons 5th Edition (DnD 5E) 系統。

- [ ] **初始化設定**
    - [x] 建立並切換至 `DnD5E_Recreate` 分支 <!-- id: 0 -->
    - [ ] 提交系統轉換分析報告 (`docs/DND5E_CONVERSION_ANALYSIS.md`) <!-- id: 1 -->

- [ ] **資料結構重構 (Data Structure)**
    - [ ] 修改 `types.d.ts` 定義 5E 角色介面 (Skills, Proficiency, Hit Dice) <!-- id: 2 -->
    - [ ] 修改 `constants.ts` 建立 5E 技能與職業常數 <!-- id: 3 -->

- [ ] **邏輯與核心實作 (Logic & Core)**
    - [ ] 更新 `PlayerCharacter.ts` 屬性與檢定計算 <!-- id: 4 -->
    - [ ] 實作熟練加值 (Proficiency Bonus) 計算邏輯 <!-- id: 5 -->

- [ ] **介面開發 (UI Development)**
    - [ ] 新增技能列表介面 (Skills View) <!-- id: 6 -->
    - [ ] 更新法術介面 (Spell Slots & Tiers) <!-- id: 7 -->
    - [ ] 重構天賦與特性介面 (Features & Traits) <!-- id: 8 -->
    - [ ] 更新裝備與負重介面 (Inventory & Encumbrance) <!-- id: 9 -->

- [ ] **在地化與內容 (Localization & Content)**
    - [ ] 更新 `translations.ts` (職業、種族、技能中文化) <!-- id: 10 -->
