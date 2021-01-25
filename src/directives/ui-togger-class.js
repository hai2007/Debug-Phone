/**
 * 控制制定的结点的某个class增加删除切换
 * --------------------------
 * ui-togger-class:classsName='dom'
 * dom结点的className增加和删除切换进行
 *
 */

import QuickPaper from 'quick-paper';
import xhtml from '@hai2007/tool/xhtml.js';

QuickPaper.directive('uiToggerClass', {

    inserted(el, binding) {

        let viewXhtml = binding.target.$document.getElementById(binding.exp);

        xhtml.bind(el, 'click', () => {

            if (xhtml.hasClass(viewXhtml, binding.type)) {
                xhtml.removeClass(viewXhtml, binding.type);
            } else {
                xhtml.addClass(viewXhtml, binding.type);
            }

        });

    }
});

