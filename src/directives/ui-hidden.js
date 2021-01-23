import QuickPaper from 'quick-paper';

let doit = function (el, binding) {
    if (binding.value) {
        el.style.display = 'none';
    } else {
        el.style.display = '';
    }
}

/**
 * 控制是否隐藏
 * --------------------------
 * ui-hidden='flag'
 * 如果flag=true就隐藏
 *
 */

QuickPaper.directive('uiHidden', {
    inserted: doit,
    update: doit
});
