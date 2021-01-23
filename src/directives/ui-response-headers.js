import QuickPaper from 'quick-paper';

let doit = function (el, binding) {

    if (binding.value) {

        let template = '<table class="uiResponseHeaders"><tbody>';

        // 先切割行
        let rows = binding.value.trim().split(/\n/);
        for (let i = 0; i < rows.length; i++) {
            let clos = rows[i].split(': ');
            template += "<tr><td>" + clos[0] + "</td><td>" + clos.slice(1).join('') + "</td></tr>";
        }

        el.innerHTML = template + "</tbody></table>";

    } else {
        el.innerHTML = '无内容';
    }

};

// 辅助显示xhr header

QuickPaper.directive('uiResponseHeaders', {
    inserted: doit,
    update: doit
});
