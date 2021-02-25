const requireComponent = require.context(
  // 컴포넌트들이 있는 폴더
  './',
  // 하위 폴더까지 포함할 지 여부
  false,
  // 기본 컴포넌트를 찾는데 사용할 정규표현식
  /V[A-Z]\w+\.(vue|js)$/
)

// requireComponent.keys().forEach(fileName => {
//   const componentName = fileName
//   .split('/')
//   .pop()
//   .replace(/\.\w+$/, '');
// });

export const VAvatar = () => import('./VAvatar');
export const VBtn = () => import('./VBtn');
export const VCheckbox = () => import('./VCheckbox');
export const VRadio = () => import('./VRadio');
export const VH1 = () => import('./VH1');
export const VH2 = () => import('./VH2');
export const VInput = () => import('./VInput');
export const VScrollbar = () => import('./VScrollbar');
export const VTable = () => import('./VTable');
export const VFlex = () => import('./VFlex');
export const VFixed = () => import('./VFixed');
