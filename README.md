# RTO Fancy Number Finder - Chrome Extension

🚗 **Find and Filter Special Vehicle Registration Numbers | RTO Portal Number Filter**

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue.svg)](https://github.com/hareeshghk/RTONumbersFilter)
[![Version](https://img.shields.io/badge/version-1.0-green.svg)](https://github.com/hareeshghk/RTONumbersFilter)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A powerful Chrome extension that helps you find and filter fancy/special vehicle registration numbers from Indian RTO portals. Perfect for finding lucky numbers, patterns, and special sequences for your vehicle registration.

## 🎯 What is this?

When purchasing a new vehicle or seeking a special registration number through RTO auctions, this extension automatically scans and filters available numbers based on your preferences. Instead of manually browsing through hundreds of numbers, let the extension find exactly what you're looking for!

## ✨ Features

### 🔢 Pattern Filters
- **All Same Digits (XXXX)** - Find numbers where all digits are identical
  - Examples: `0000`, `1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`
  - Perfect for: Lucky numbers, easy-to-remember combinations

- **Ascending Sequence** - Find numbers with digits in ascending order
  - Examples: `0123`, `1234`, `2345`, `3456`, `4567`, `5678`, `6789`, `0124`, `1469`
  - Perfect for: Progressive sequences, logical patterns

- **Descending Sequence** - Find numbers with digits in descending order
  - Examples: `9876`, `8765`, `7654`, `6543`, `5432`, `4321`, `3210`, `9421`, `8520`
  - Perfect for: Countdown patterns, reverse sequences

- **XXYY Pattern** - Find numbers with two pairs of identical digits
  - Examples: `1122`, `3344`, `5566`, `7788`, `9900`, `0011`, `2255`, `4477`
  - Perfect for: Symmetric patterns, balanced combinations

- **XXXY Pattern** - Find numbers with three identical digits followed by one different
  - Examples: `1112`, `2223`, `3334`, `4445`, `5556`, `6667`, `7778`, `8889`, `9990`
  - Perfect for: Emphasis patterns, dominant digit themes

- **XYYY Pattern** - Find numbers with one digit followed by three identical digits
  - Examples: `1222`, `2333`, `3444`, `4555`, `5666`, `6777`, `7888`, `8999`, `9000`
  - Perfect for: Trailing emphasis, memorable endings

- **XYXY Pattern** - Find numbers with alternating pair patterns
  - Examples: `1212`, `2323`, `3434`, `4545`, `5656`, `6767`, `7878`, `8989`, `9090`
  - Perfect for: Rhythmic patterns, alternating sequences

### 🎲 Advanced Filters

- **Recursive Sum Filter** - Filter by numerological digit sum (1-9)
  - How it works: Adds all digits repeatedly until single digit remains
  - Examples:
    - `1234` → 1+2+3+4=10 → 1+0=1 (Sum: 1)
    - `9876` → 9+8+7+6=30 → 3+0=3 (Sum: 3)
    - `5555` → 5+5+5+5=20 → 2+0=2 (Sum: 2)
    - `7689` → 7+6+8+9=30 → 3+0=3 (Sum: 3)
  - Perfect for: Numerology enthusiasts, spiritual number selection

- **Exclude Digits** - Avoid specific digits in your number
  - Examples of exclusions:
    - Exclude `0, 4`: Will filter out `1024`, `4567`, `8904`, `4444`
    - Exclude `7`: Will filter out `1237`, `7777`, `5679`, `0017`
    - Exclude `0, 8, 9`: Will filter out `1089`, `8765`, `9999`, `0123`
  - Perfect for: Avoiding unlucky numbers, cultural preferences

- **Price Sorting** - Automatically sorts results by price (lowest first)
  - Shows most affordable options at the top
  - Perfect for: Budget-conscious buyers, finding the best deals

### 🏆 Smart Features
- Real-time scanning of RTO portal pages
- Clean, user-friendly interface
- No manual data entry required
- Works with official RTO websites
- Instant filtering and sorting

## 🚀 Quick Start

### Installation
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension folder
5. The extension icon will appear in your browser toolbar

### Usage
1. Navigate to your RTO portal's vehicle number auction/selection page
2. Click the extension icon in your browser
3. Select your desired filters (patterns, excluded digits, etc.)
4. Click "Fetch Filtered Numbers"
5. View sorted results with prices and bidder information

## 📋 Complete Filter Reference

### Pattern-Based Filters (Fixed Patterns)
| Filter Name | Pattern | Example Numbers | Description |
|-------------|---------|-----------------|-------------|
| **All Same (XXXX)** | All digits identical | `0000`, `1111`, `7777`, `8888` | Perfect for memorable, lucky numbers |
| **Ascending** | Digits in increasing order | `0123`, `1234`, `2345`, `6789` | Progressive, logical sequences |
| **Descending** | Digits in decreasing order | `9876`, `8765`, `4321`, `3210` | Countdown, reverse patterns |
| **XXYY** | Two pairs of identical digits | `1122`, `3344`, `7788`, `9900` | Symmetric, balanced patterns |
| **XXXY** | Three same + one different | `1112`, `5556`, `7778`, `9990` | Emphasis on dominant digit |
| **XYYY** | One different + three same | `1222`, `3555`, `7888`, `9000` | Strong trailing emphasis |
| **XYXY** | Alternating pair pattern | `1212`, `3535`, `7878`, `9090` | Rhythmic, alternating design |

### Input-Based Filters (User Configurable)
| Filter Name | Input Type | Examples | How It Works |
|-------------|------------|----------|--------------|
| **Recursive Sum** | Number (1-9) | Sum=1: `1000`, `1234`<br>Sum=7: `1969`, `2500` | Adds digits repeatedly until single digit<br>`1234` → 1+2+3+4=10 → 1+0=1 |
| **Exclude Digits** | Comma/space separated | Exclude `0,4`: Filters out `1024`, `4567`<br>Exclude `7`: Filters out `1237`, `7777` | Removes numbers containing specified digits |

### Combination Filtering
- **Multiple Filters**: You can select multiple filters simultaneously
- **AND Logic**: Numbers must match ALL selected criteria
- **Price Sorting**: Results automatically sorted by price (lowest first)
- **Real-time**: Instant filtering as you select/deselect options

## 🎪 Use Cases

### For Vehicle Buyers
- **Lucky Numbers** - Find numbers with your lucky digits
- **Birth Dates** - Filter numbers containing your birth date
- **Anniversaries** - Find numbers matching special dates
- **Business** - Get professional-looking number sequences

### For Number Collectors
- **Rare Patterns** - Discover unique number combinations
- **Investment** - Find potentially valuable number sequences
- **Collections** - Build themed number collections

### For Numerology Enthusiasts
- **Digit Sum Filtering** - Find numbers with specific numerological values
- **Avoiding Bad Numbers** - Exclude digits you consider unlucky
- **Pattern Matching** - Find numbers that align with your beliefs

## 🔧 Technical Details

### Supported Patterns
```
All Same (XXXX): 0000, 1111, 2222, 3333, 4444, 5555, 6666, 7777, 8888, 9999
Ascending: 0123, 1234, 2345, 3456, 4567, 5678, 6789, 0124, 1469, 2579
Descending: 9876, 8765, 7654, 6543, 5432, 4321, 3210, 9421, 8520, 7531
XXYY: 1122, 3344, 5566, 7788, 9900, 0011, 2255, 4477, 6699, 8811
XXXY: 1112, 2223, 3334, 4445, 5556, 6667, 7778, 8889, 9990, 0001
XYYY: 1222, 2333, 3444, 4555, 5666, 6777, 7888, 8999, 9000, 0111
XYXY: 1212, 2323, 3434, 4545, 5656, 6767, 7878, 8989, 9090, 0101

Recursive Sum Examples:
- Sum = 1: 1000, 0100, 0010, 0001, 1234 (1+2+3+4=10→1+0=1)
- Sum = 3: 1200, 0300, 2100, 9876 (9+8+7+6=30→3+0=3)
- Sum = 7: 1600, 2500, 3400, 1969 (1+9+6+9=25→2+5=7)
- Sum = 9: 1800, 2700, 3600, 4500, 9999 (9+9+9+9=36→3+6=9)

Exclude Digits Examples:
- Exclude "0,4": Numbers like 1234, 4567, 0123, 8904 will be filtered out
- Exclude "7": Numbers like 1237, 7777, 5679, 0017 will be filtered out
- Exclude "0,8,9": Numbers like 1089, 8765, 9999, 0123 will be filtered out
```

### Architecture
- **Manifest V3** Chrome Extension
- **Content Script** for web scraping
- **Background Script** for data processing
- **Popup Interface** for user interaction
- **Real-time Filtering** with sorting capabilities

## 🗺️ SEO Keywords

**Indian Vehicle Registration | RTO Number Filter | Fancy Car Numbers | Lucky Vehicle Numbers | Chrome Extension | Number Pattern Finder | Vehicle Registration India | Car Number Selection | RTO Portal Extension | Fancy Number Generator | Lucky Number Filter | Vehicle Auction Numbers**

## 🛠️ For Developers

### Project Structure
```
RTONumbersFilter/
├── manifest.json              # Extension configuration
├── background.js              # Background service worker
├── content_script.js          # Web page interaction
├── popup.html                # Extension popup UI
├── popup.js                  # Popup functionality
├── images/                   # Extension icons
├── testArtifacts/           # Testing resources
│   └── FancyNumbers.mhtml   # Sample RTO page for testing
└── README.md                # This file
```

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Local Development
```bash
git clone https://github.com/hareeshghk/RTONumbersFilter.git
cd RTONumbersFilter
# Load as unpacked extension in Chrome
```

### Testing the Extension
For developers who want to test the extension without accessing a live RTO portal:

1. **MHTML Test File**: The repository includes a sample MHTML file (`testArtifacts/FancyNumbers.mhtml`) that contains real RTO portal data
2. **How to use**:
   - Open Chrome and go to `file://` 
   - Navigate to the `testArtifacts/FancyNumbers.mhtml` file in your local repository
   - Open the file in Chrome (it will display as a webpage)
   - Test the extension on this static page
3. **Benefits**:
   - ✅ No need for live RTO portal access
   - ✅ Consistent test data for reliable testing
   - ✅ Safe testing environment
   - ✅ Offline development capability

**Note**: The `FancyNumbers.mhtml` file contains sample vehicle numbers, prices, and bidder information that matches the structure of real RTO portals, allowing you to test all filtering functionality.

## 🎨 Screenshots

*Extension popup with filter options*
- Clean, intuitive interface
- Multiple filter categories
- Real-time results display

## 📞 Support & Contact

- **GitHub Issues**: [Report bugs or request features](https://github.com/hareeshghk/RTONumbersFilter/issues)
- **Developer**: Hareesh GHK
- **Repository**: [RTONumbersFilter](https://github.com/hareeshghk/RTONumbersFilter)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Keywords for Search Discovery

`RTO fancy numbers`, `vehicle registration filter`, `car number patterns`, `lucky vehicle numbers India`, `RTO portal extension`, `Chrome extension RTO`, `fancy number finder`, `vehicle auction numbers`, `car registration patterns`, `Indian RTO numbers`, `special vehicle numbers`, `number pattern matching`, `vehicle number search tool`

---

⭐ **Star this repository if it helped you find your perfect vehicle number!**
