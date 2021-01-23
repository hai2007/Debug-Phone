import QuickPaper from 'quick-paper';

let doit = function (el, binding) {
    if (binding.value == binding.type) {
        el.style.display = '';
    } else {
        el.style.display = 'none';
    }
}

/**
 * 控制是否不隐藏
 * --------------------------
 * ui-show:value='flag'
 * 如果flag!=value就隐藏
 *
 */

QuickPaper.directive('uiShow', {
    inserted: doit,
    update: doit
});
