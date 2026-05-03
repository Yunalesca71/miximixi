# Tasks: Add Shiny Text Effect to Headers

## 1. Install Dependencies

- [x] 1.1 Run `npm install motion` in miximixi directory
- [x] 1.2 Verify motion package is added to package.json

## 2. Create ShinyText Component

- [x] 2.1 Create `src/components/ShinyText.jsx` based on skill template
- [x] 2.2 Create `src/components/ShinyText.css` with base styles
- [x] 2.3 Export ShinyText component as default

## 3. Update App.jsx

- [x] 3.1 Import ShinyText component in App.jsx
- [x] 3.2 Replace title static text with ShinyText component
  - text: "咪西咪西~❤"
  - color: "#ffffff"
  - shineColor: "#C4914E"
  - speed: 3
  - pauseOnHover: true
- [x] 3.3 Replace subtitle static text with ShinyText component
  - text: "✨召唤美味中...✨"
  - color: "#ffffff"
  - shineColor: "#B8860B"
  - speed: 2
  - pauseOnHover: true
- [x] 3.4 Pass responsive font sizes via style prop or className

## 4. Styling Adjustments

- [x] 4.1 Ensure ShinyText works with existing responsive font sizes
- [x] 4.2 Verify text remains visible above Galaxy3D background
- [x] 4.3 Test hover pause functionality

## 5. Testing & Verification

- [x] 5.1 Build the project: `npm run build`
- [x] 5.2 Start frontend server and verify animation works
- [x] 5.3 Test responsive behavior on different screen sizes
- [x] 5.4 Verify hover pauses animation
- [x] 5.5 Check that title.png icon still displays correctly next to shiny title
