// calculator.js
const display = document.getElementById("calcDisplay"); /* شاشة العرض */
const mini = document.getElementById("calcMini"); /* السطر الصغير */
const tip = document.getElementById("calcTip"); /* سطر الحالة */
const buttons = document.querySelectorAll(".calc-btn"); /* كل الأزرار */

let expr = ""; /* العملية */
let lastWasResult = false; /* آخر شيء نتيجة */

function show(mainText, miniText){ /* عرض */
  const m = mainText === "" ? "0" : mainText; /* 0 إذا فاضي */
  if(display) display.value = m; /* تحديث الشاشة */
  if(mini) mini.textContent = (miniText ?? m); /* تحديث mini */
} /* نهاية */

function setTip(t){ /* حالة */
  if(tip) tip.textContent = t; /* عرض */
} /* نهاية */

function isOp(ch){ /* تحقق عملية */
  return ch === "+" || ch === "-" || ch === "*" || ch === "/"; /* نتيجة */
} /* نهاية */

function cleanForEval(s){ /* توحيد */
  return s.replace(/×/g,"*").replace(/÷/g,"/"); /* تحويل */
} /* نهاية */

function safeEval(s){ /* حساب آمن */
  const cleaned = cleanForEval(s); /* تنظيف */
  if(!/^[0-9+\-*/().\s]+$/.test(cleaned)) throw new Error("bad"); /* منع نص */
  return Function("return (" + cleaned + ")")(); /* حساب */
} /* نهاية */

function appendValue(v){ /* إضافة */
  if(lastWasResult && /[0-9.]/.test(v)){ /* رقم بعد نتيجة */
    expr = ""; /* ابدأ جديد */
  } /* نهاية */
  lastWasResult = false; /* تصفير */
  expr += v; /* إضافة */
  show(expr, expr); /* عرض */
} /* نهاية */

function backspace(){ /* حذف */
  expr = expr.slice(0, -1); /* حذف آخر */
  show(expr, expr); /* عرض */
  setTip("Effacé"); /* حالة */
} /* نهاية */

function clearAll(){ /* مسح */
  expr = ""; /* تصفير */
  lastWasResult = false; /* تصفير */
  show(expr, "0"); /* عرض */
  setTip("AC"); /* حالة */
} /* نهاية */

function toggleSign(){ /* تبديل إشارة آخر رقم */
  if(expr.trim() === ""){ /* فاضي */
    expr = "-"; /* ابدأ سالب */
    show(expr, expr); /* عرض */
    return; /* خروج */
  } /* نهاية */

  const m = expr.match(/(-?\d+(\.\d+)?)\s*$/); /* آخر رقم */
  if(!m){ setTip("Impossible"); return; } /* لا يوجد رقم */

  const num = m[1]; /* الرقم */
  const start = expr.length - num.length; /* بداية */
  const toggled = num.startsWith("-") ? num.slice(1) : "-" + num; /* تبديل */
  expr = expr.slice(0, start) + toggled; /* استبدال */
  show(expr, expr); /* عرض */
  setTip("+/-"); /* حالة */
} /* نهاية */

function percent(){ /* تحويل آخر رقم إلى نسبة */
  const m = expr.match(/(-?\d+(\.\d+)?)\s*$/); /* آخر رقم */
  if(!m){ setTip("Impossible"); return; } /* لا يوجد رقم */

  const num = m[1]; /* الرقم */
  const start = expr.length - num.length; /* بداية */
  const v = String(Number(num) / 100); /* تحويل */
  expr = expr.slice(0, start) + v; /* استبدال */
  show(expr, expr); /* عرض */
  setTip("%"); /* حالة */
} /* نهاية */

function compute(){ /* يساوي */
  try{ /* محاولة */
    if(expr.trim() === ""){ /* فاضي */
      show("0","0"); /* عرض */
      setTip("Prêt"); /* حالة */
      return; /* خروج */
    } /* نهاية */

    const result = safeEval(expr); /* حساب */
    const rText = String(result); /* تحويل */
    show(rText, expr); /* عرض النتيجة مع العملية في mini */
    expr = rText; /* حفظ النتيجة */
    lastWasResult = true; /* علامة */
    setTip("ok"); /* حالة */
  }catch(e){ /* خطأ */
    expr = ""; /* تصفير */
    lastWasResult = false; /* تصفير */
    show("Erreur","0"); /* عرض */
    setTip("Erreur"); /* حالة */
  } /* نهاية */
} /* نهاية */

for(const btn of buttons){ /* حلقة */
  btn.addEventListener("click", () => { /* حدث */
    const v = btn.getAttribute("data-v"); /* قيمة */

    if(v === "AC"){ clearAll(); return; } /* مسح */
    if(v === "DEL"){ backspace(); return; } /* حذف */
    if(v === "="){ compute(); return; } /* يساوي */
    if(v === "+/-"){ toggleSign(); return; } /* إشارة */
    if(v === "%"){ percent(); return; } /* نسبة */

    if(isOp(v)){ /* عملية */
      if(expr === "" && v !== "-"){ setTip("Choisis un nombre"); return; } /* منع */
      if(expr.endsWith(".")) expr = expr.slice(0, -1); /* منع نقطة */
      if(expr !== "" && isOp(expr.slice(-1))) expr = expr.slice(0, -1); /* استبدال */
      appendValue(v); /* إضافة */
      setTip("Op"); /* حالة */
      return; /* خروج */
    } /* نهاية */

    if(v === "."){ /* نقطة */
      const m = expr.match(/(\d+(\.\d+)?)$/); /* آخر رقم */
      if(m && m[0].includes(".")){ setTip("Déjà"); return; } /* منع تكرار */
    } /* نهاية */

    appendValue(v); /* إضافة رقم */
    setTip("..."); /* حالة */
  }); /* نهاية */
} /* نهاية */

show("0","0"); /* تهيئة */
setTip("𝓞𝓑𝓐𝓘𝓓𝓐"); /* تهيئة */