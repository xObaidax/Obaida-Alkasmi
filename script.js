// script.js
const splash = document.getElementById("splash"); /* شاشة الترحيب */
const taskInput = document.getElementById("taskInput"); /* إدخال المهمة */
const addBtn = document.getElementById("addBtn"); /* زر إضافة */
const taskList = document.getElementById("taskList"); /* قائمة المهام */
const badge = document.getElementById("countBadge"); /* شارة العدد */

const jokeBtn = document.getElementById("jokeBtn"); /* زر تحميل صورة */
const photo = document.getElementById("photo"); /* عنصر الصورة */
const photoStatus = document.getElementById("photoStatus"); /* حالة الصورة */

/* تشغيل شاشة الترحيب ببطء */
window.addEventListener("load", () => { /* عند تحميل الصفحة */
  if(!splash) return; /* حماية */

  const stayTime = 2200; /* مدة بقاء Bienvenue قبل التلاشي */
  const flashTime = 220; /* مدة الوميض */
  const fadeTime = 2500; /* لازم تطابق مدة transition في CSS */

  setTimeout(() => { /* انتظار قبل الوميض */
    splash.classList.add("flash"); /* وميض */

    setTimeout(() => { /* إيقاف الوميض */
      splash.classList.remove("flash"); /* إلغاء الوميض */
      splash.classList.add("fade"); /* بدء التلاشي */

      setTimeout(() => { /* بعد انتهاء التلاشي */
        splash.classList.add("hide"); /* إخفاء نهائي */
      }, fadeTime + 100); /* هامش بسيط */
    }, flashTime); /* مدة الوميض */
  }, stayTime); /* مدة البقاء */
}); /* نهاية */

/* تحديث شارة العدد */
function updateBadge(){ /* دالة */
  if(!badge || !taskList) return; /* حماية */
  badge.textContent = String(taskList.children.length); /* عدد li */
} /* نهاية */

/* إنشاء عنصر مهمة */
function addTaskToUI(text){ /* دالة */
  if(!taskList) return; /* حماية */

  const li = document.createElement("li"); /* عنصر li */

  const span = document.createElement("span"); /* نص */
  span.textContent = text; /* وضع النص */

  const del = document.createElement("button"); /* زر حذف */
  del.textContent = "Supprimer"; /* نص زر */
  del.addEventListener("click", () => { /* حدث حذف */
    li.remove(); /* حذف */
    updateBadge(); /* تحديث */
  }); /* نهاية */

  li.appendChild(span); /* إضافة النص */
  li.appendChild(del); /* إضافة الزر */
  taskList.appendChild(li); /* إضافة للقائمة */

  updateBadge(); /* تحديث */
} /* نهاية */

/* إضافة مهمة */
if(addBtn){ /* حماية */
  addBtn.addEventListener("click", () => { /* حدث */
    if(!taskInput) return; /* حماية */

    const text = taskInput.value.trim(); /* أخذ النص */
    if(text === "") return; /* منع فراغ */

    addTaskToUI(text); /* إضافة */
    taskInput.value = ""; /* تفريغ */
    taskInput.focus(); /* رجوع للمؤشر */
  }); /* نهاية */
} /* نهاية */

/* Enter لإضافة مهمة */
if(taskInput){ /* حماية */
  taskInput.addEventListener("keydown", (e) => { /* حدث */
    if(e.key === "Enter"){ /* لو Enter */
      if(addBtn) addBtn.click(); /* نفذ إضافة */
    } /* نهاية */
  }); /* نهاية */
} /* نهاية */

/* تحميل صورة عشوائية */
function loadPhoto(){ /* دالة */
  if(!photo || !photoStatus) return; /* حماية */

  photoStatus.textContent = "Chargement..."; /* حالة */
  const url = "https://picsum.photos/500/350?random=" + Date.now(); /* رابط */
  photo.src = url; /* وضع الرابط */

  photo.onload = () => { /* نجاح */
    photoStatus.textContent = ""; /* حالة */
  }; /* نهاية */

  photo.onerror = () => { /* فشل */
    photoStatus.textContent = "Erreur"; /* حالة */
  }; /* نهاية */
} /* نهاية */

if(jokeBtn){ /* حماية */
  jokeBtn.addEventListener("click", loadPhoto); /* حدث */
} /* نهاية */

updateBadge(); /* تحديث أولي */