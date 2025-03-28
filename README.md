# UniApp 打包工具說明

## 簡介

這個工具庫包含用於打包 UniApp 項目成 WGT 資源包的腳本。主要功能包括將 UniApp 項目打包為 WGT 文件，並且可以自定義 APP ID 和版本號碼。

## 主要功能

- 自動讀取項目資料夾名稱
- 自定義 APP ID
- 自定義版本號碼並更新 manifest.json
- 生成 WGT 資源包
- 自動替換 manifest.json 中的 ID

## 使用方法

### 準備工作

1. 確保你的系統已安裝了以下命令：
   - cli（UniApp 命令行工具）
   - zip
   - unzip
   - sed

### 安裝工具

#### 方法一：直接使用

1. 將 `video-project-tools` 資料夾放置在您方便的位置，如 `~/project/video-project-tools`

2. 確保腳本有執行權限：
   ```bash
   chmod +x ~/project/video-project-tools/pack_wgt.sh
   ```

#### 方法二：作為共享庫使用（推薦）

1. 將工具庫放在一個集中位置：
   ```bash
   mkdir -p ~/project/video-project-tools
   ```

2. 將腳本文件添加到此資料夾中

3. 授予執行權限：
   ```bash
   chmod +x ~/project/video-project-tools/pack_wgt.sh
   ```

4. 在您的每個 UniApp 項目中創建符號連接：
   ```bash
   # 從項目根目錄執行
   ln -s ~/project/video-project-tools tools
   ```

### 執行腳本

1. 在項目根目錄下執行腳本：
   ```bash
   ./tools/pack_wgt.sh
   ```

2. 按照提示輸入需要的信息：
   - 輸入 APP ID（例如: `__UNI__AD9D1D7`）
   - 輸入版本號碼（例如: `1.0.10`）

3. 腳本會自動執行以下操作：
   - 更新 manifest.json 中的版本號
   - 使用 CLI 命令生成 WGT 資源包
   - 解壓縮 WGT 並修改其中的 manifest.json 文件
   - 重新打包並生成最終的 WGT 文件

4. 完成後，您可以在項目根目錄找到命名為 `[APP_ID]-[版本號].wgt` 的文件，例如 `__UNI__AD9D1D7-1.0.10.wgt`

## 故障排除

如果遇到權限問題：
```bash
# 確保腳本有執行權限
chmod +x ~/project/video-project-tools/pack_wgt.sh
```

如果遇到找不到命令的問題：
```bash
# 檢查是否安裝了必要的命令
command -v cli
command -v zip
command -v unzip
command -v sed
```

如果找不到生成的 WGT 文件：
```bash
# 檢查輸出路徑
ls -la ./unpackage/release/
```

## 維護與更新

當需要更新腳本時，只需修改共享庫中的腳本文件，所有使用符號連接的項目都會自動使用更新後的版本。

這種方式特別適合團隊協作，使所有項目都能保持一致的打包流程。
