import QuickPaper from 'quick-paper';
import showData from '../services/showData';
let doit = function (el, binding) {

    el.innerHTML = "";
    let ol = binding.target.$document.createElement('ol');
    showData(binding.target, ol, [binding.value]);
    el.appendChild(ol);

};

// 辅助显示对象

QuickPaper.directive('uiShowObject', {
    inserted: doit,
    update: doit
});
