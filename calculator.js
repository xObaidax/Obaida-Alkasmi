const display = document.getElementById("calcDisplay");
/* يمسك شاشة العرض */

const buttons = document.querySelectorAll(".calc-btn");
/* يمسك كل الأزرار */

let expr = "";
/* يخزن العملية مثل 12+3 */

function show(v) {
  display.value = v === "" ? "0" : v;
  /* يعرض 0 إذا النص فارغ */
}

for (const btn of buttons) {
  btn.addEventListener("click", () => {
    const v = btn.getAttribute("data-v");
    /* قيمة الزر من data-v */

    if (v === "AC") {
      expr = "";
      show(expr);
      return;
    }
    /* يمسح العملية */

    if (v === "=") {
      try {
        const result = Function("return " + expr)();
        expr = String(result);
        show(expr);
      } catch {
        expr = "";
        show("Erreur");
      }
      return;
    }
    /* يحسب النتيجة */

    if (v === "+/-") {
      if (expr.startsWith("-")) expr = expr.slice(1);
      else expr = "-" + expr;
      show(expr);
      return;
    }
    /* يغير الإشارة + إلى - أو العكس */

    if (v === "%") {
      try {
        const result = Function("return (" + expr + ")/100")();
        expr = String(result);
        show(expr);
      } catch {
        expr = "";
        show("Erreur");
      }
      return;
    }
    /* يحول الرقم إلى نسبة */

    expr += v;
    show(expr);
    /* يضيف الرقم أو العملية إلى expr ويعرضها */
  });
}