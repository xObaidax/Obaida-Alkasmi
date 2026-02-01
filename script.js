 console.log("JS OK");
/* اختبار أن JavaScript شغال */

const taskInput = document.getElementById("taskInput");
/* نأخذ حقل الكتابة من الصفحة */

const addBtn = document.getElementById("addBtn");
/* نأخذ زر الإضافة من الصفحة */

const taskList = document.getElementById("taskList");
/* نأخذ القائمة التي ستظهر فيها المهام */

const photoBtn = document.getElementById("jokeBtn");
/* زر جلب الصورة. نفس id الموجود في HTML */

const photo = document.getElementById("photo");
/* عنصر الصورة */

const photoStatus = document.getElementById("photoStatus");
/* نص الحالة */

/* دالة: تضيف مهمة للواجهة */
function addTaskToUI(text) {
  const li = document.createElement("li");
  /* عنصر مهمة داخل القائمة */

  const span = document.createElement("span");
  /* عنصر لنص المهمة */

  span.textContent = text;
  /* وضع نص المهمة */

  const delBtn = document.createElement("button");
  /* زر حذف */

  delBtn.textContent = "Supprimer";
  /* نص زر الحذف */

  delBtn.addEventListener("click", () => {
    li.remove();
    /* حذف المهمة من الصفحة */
    saveTasks();
    /* حفظ بعد الحذف */
  });

  li.appendChild(span);
  /* إضافة النص داخل li */

  li.appendChild(delBtn);
  /* إضافة زر الحذف داخل li */

  taskList.appendChild(li);
  /* إضافة المهمة إلى القائمة */
}

/* دالة: تحفظ كل المهام في LocalStorage */
function saveTasks() {
  const items = [];
  /* مصفوفة لتجميع المهام */

  for (const li of taskList.querySelectorAll("li")) {
    const text = li.querySelector("span").textContent.trim();
    /* أخذ نص المهمة من span */

    items.push(text);
    /* إضافة النص للمصفوفة */
  }

  localStorage.setItem("tasks", JSON.stringify(items));
  /* حفظ المصفوفة باسم tasks */
}

/* دالة: تحمل المهام عند فتح الصفحة */
function loadTasks() {
  const raw = localStorage.getItem("tasks");
  /* قراءة البيانات المخزنة */

  if (!raw) return;
  /* لا يوجد مهام مخزنة */

  const items = JSON.parse(raw);
  /* تحويل النص إلى مصفوفة */

  for (const text of items) {
    addTaskToUI(text);
    /* عرض كل مهمة */
  }
}

/* حدث: إضافة مهمة عند الضغط على الزر */
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  /* أخذ النص مع حذف الفراغات */

  if (text === "") return;
  /* لا نضيف مهمة فارغة */

  addTaskToUI(text);
  /* إضافة للواجهة */

  saveTasks();
  /* حفظ بعد الإضافة */

  taskInput.value = "";
  /* تفريغ حقل الكتابة */
});

/* حدث: إضافة مهمة عند الضغط Enter داخل الحقل */
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
    /* نفس عمل زر الإضافة */
  }
});

loadTasks();
/* عند فتح الصفحة. عرض المهام المخزنة */

/* صور: جلب صورة عشوائية مع حالة تحميل وخطأ */
if (photoBtn && photo && photoStatus) {
  photoBtn.addEventListener("click", () => {
    photoStatus.textContent = "Chargement...";
    /* رسالة تحميل */

    const w = 800;
    /* عرض الصورة */

    const h = 500;
    /* ارتفاع الصورة */

    const t = Date.now();
    /* رقم لمنع الكاش */

    const url = "https://picsum.photos/" + w + "/" + h + "?random=" + t;
    /* رابط صورة عشوائية */

    photo.onload = () => {
      photoStatus.textContent = "";
      /* عند نجاح التحميل نخفي الرسالة */
    };

    photo.onerror = () => {
      photoStatus.textContent = "Erreur de chargement.";
      /* عند فشل التحميل نظهر خطأ */
    };

    photo.src = url;
    /* بدء تحميل الصورة */
  });
}
const splash = document.getElementById("splash");
/* نأخذ عنصر شاشة الترحيب */

if (splash) {
  setTimeout(() => {
  splash.classList.add("flash");
  /* وميض أبيض يغطي الشاشة */

  setTimeout(() => {
    splash.classList.add("fade");
    /* يبدأ التلاشي */

    setTimeout(() => {
      splash.classList.add("hide");
      /* إخفاء نهائي */
    }, 800);
  }, 250);
}, 4000);
}
