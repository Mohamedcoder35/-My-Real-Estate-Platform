document.addEventListener("DOMContentLoaded", function () {
  // متغيرات DOM
  const mobileMenuBtn = document.getElementById("mobile-menu");
  const sidebar = document.getElementById("sidebar");
  const closeSidebarBtn = document.getElementById("close-sidebar");
  const loginBtn = document.getElementById("login-btn");
  const heroCtaBtn = document.getElementById("hero-cta-btn");
  const bottomCtaBtn = document.getElementById("bottom-cta-btn");
  const loginModal = document.getElementById("login-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const loginForm = document.getElementById("login-form");
  const searchTabs = document.querySelectorAll(".search-tabs .tab");

  // أقسام البحث الرئيسية
  const propertiesSearchForm = document.getElementById(
    "properties-search-form"
  );
  const travelTourismSearchForm = document.getElementById(
    "travel-tourism-search-form"
  );
  const realEstateServicesSearchForm = document.getElementById(
    "real-estate-services-search-form"
  );

  // فلتر العقارات الموحدة
  const mainPropertyTabs = document.querySelectorAll("#properties .main-tab");
  const propertyFilters = document.querySelectorAll("#properties .filter-btn");
  const propertyCards = document.querySelectorAll("#properties .property-card");

  // فلتر الفنادق
  const hotelFilters = document.querySelectorAll("#hotels .filter-btn");
  const hotelCards = document.querySelectorAll("#hotels .hotel-card");

  // فلتر تذاكر السفر
  const travelFilters = document.querySelectorAll("#travel .filter-btn");
  const travelCards = document.querySelectorAll("#travel .travel-card");

  // فلتر الخدمات العقارية
  const serviceFilters = document.querySelectorAll(
    "#real-estate-services .filter-btn"
  );
  const serviceCards = document.querySelectorAll(
    "#real-estate-services .service-card"
  );

  // فتح/إغلاق القائمة الجانبية
  mobileMenuBtn.addEventListener("click", function () {
    sidebar.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeSidebarBtn.addEventListener("click", function () {
    sidebar.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // إغلاق القائمة الجانبية عند النقر خارجها
  document.addEventListener("click", function (e) {
    if (
      !sidebar.contains(e.target) &&
      e.target !== mobileMenuBtn &&
      e.target.closest("#mobile-menu") === null
    ) {
      sidebar.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // فتح/إغلاق نموذج تسجيل الدخول
  function openLoginModal() {
    loginModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLoginModal() {
    loginModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  loginBtn.addEventListener("click", openLoginModal);
  heroCtaBtn.addEventListener("click", openLoginModal);
  bottomCtaBtn.addEventListener("click", openLoginModal);

  closeModalBtn.addEventListener("click", closeLoginModal);

  // إغلاق النموذج عند النقر خارج المحتوى
  loginModal.addEventListener("click", function (e) {
    if (e.target === loginModal) {
      closeLoginModal();
    }
  });

  // معالجة تسجيل الدخول
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // هنا يمكنك إضافة التحقق من صحة البيانات وإرسالها للخادم
    alert(`تم تسجيل الدخول بالبريد: ${email}`);
    closeLoginModal();
  });

  // تبديل ألسنة البحث الرئيسية
  searchTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      searchTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const tabType = this.getAttribute("data-tab");

      propertiesSearchForm.classList.add("hidden");
      travelTourismSearchForm.classList.add("hidden");
      realEstateServicesSearchForm.classList.add("hidden");

      if (tabType === "properties") {
        propertiesSearchForm.classList.remove("hidden");
      } else if (tabType === "travel-tourism") {
        travelTourismSearchForm.classList.remove("hidden");
      } else if (tabType === "real-estate-services") {
        realEstateServicesSearchForm.classList.remove("hidden");
      }
    });
  });

  // وظيفة فلترة العناصر الموحدة
  function filterElements(
    cards,
    filterType,
    attributeName,
    secondAttributeName = null,
    secondFilterType = null
  ) {
    cards.forEach((card) => {
      const matchesMainFilter =
        secondAttributeName === null ||
        secondFilterType === "all" ||
        card.getAttribute(secondAttributeName) === secondFilterType;

      const matchesSubFilter =
        filterType === "all" || card.getAttribute(attributeName) === filterType;

      card.style.display =
        matchesMainFilter && matchesSubFilter ? "block" : "none";

      if (matchesMainFilter && matchesSubFilter) {
        card.setAttribute("data-scroll", "fade-in");
      }
    });
    // إعادة تشغيل animation
    setTimeout(() => {
      document.querySelectorAll("[data-scroll]").forEach((el) => {
        el.classList.remove("visible"); // إزالة لتشغيلها مرة أخرى عند الظهور
      });
      handleScrollAnimation();
    }, 50);
  }

  // فلتر العقارات الموحدة (للبيع / للإيجار / الكل)
  let currentPropertyMainFilter = "all"; // للتحكم في التبويب الرئيسي (الكل، للبيع، للإيجار)
  let currentPropertyTypeFilter = "all"; // للتحكم في نوع العقار (شقة، فيلا، ...)

  mainPropertyTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      mainPropertyTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      currentPropertyMainFilter = this.getAttribute("data-tab-type");
      filterElements(
        propertyCards,
        currentPropertyTypeFilter,
        "data-type",
        "data-status",
        currentPropertyMainFilter
      );
    });
  });

  propertyFilters.forEach((filter) => {
    filter.addEventListener("click", function () {
      propertyFilters.forEach((f) => f.classList.remove("active"));
      this.classList.add("active");
      currentPropertyTypeFilter = this.getAttribute("data-filter");
      filterElements(
        propertyCards,
        currentPropertyTypeFilter,
        "data-type",
        "data-status",
        currentPropertyMainFilter
      );
    });
  });

  // فلتر الفنادق
  hotelFilters.forEach((filter) => {
    filter.addEventListener("click", function () {
      hotelFilters.forEach((f) => f.classList.remove("active"));
      this.classList.add("active");
      const filterType = this.getAttribute("data-filter");
      filterElements(hotelCards, filterType, "data-stars");
    });
  });

  // فلتر تذاكر السفر
  travelFilters.forEach((filter) => {
    filter.addEventListener("click", function () {
      travelFilters.forEach((f) => f.classList.remove("active"));
      this.classList.add("active");
      const filterType = this.getAttribute("data-filter");
      filterElements(travelCards, filterType, "data-type");
    });
  });

  // فلتر الخدمات العقارية
  serviceFilters.forEach((filter) => {
    filter.addEventListener("click", function () {
      serviceFilters.forEach((f) => f.classList.remove("active"));
      this.classList.add("active");
      const filterType = this.getAttribute("data-filter");
      filterElements(serviceCards, filterType, "data-type");
    });
  });

  // إضافة تأثيرات الظهور عند التمرير
  function handleScrollAnimation() {
    const elements = document.querySelectorAll("[data-scroll]");
    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add("visible");
      }
    });
  }

  // إضافة رسائل تأكيد
  document
    .querySelectorAll(".book-btn, .details-btn, .contact-btn")
    .forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        let actionType;
        if (this.classList.contains("book-btn")) {
          actionType = "الحجز";
        } else if (this.classList.contains("details-btn")) {
          actionType = "عرض التفاصيل";
        } else if (this.classList.contains("contact-btn")) {
          actionType = "طلب الخدمة/التواصل";
        }
        alert(`سيتم تحويلك لصفحة ${actionType} قريباً.`);
      });
    });

  // إضافة حدث التمرير
  window.addEventListener("scroll", handleScrollAnimation);
  window.addEventListener("load", function () {
    handleScrollAnimation();
    // تفعيل الفلاتر الأولية عند التحميل
    filterElements(
      propertyCards,
      currentPropertyTypeFilter,
      "data-type",
      "data-status",
      currentPropertyMainFilter
    );
    filterElements(hotelCards, "all", "data-stars");
    filterElements(travelCards, "all", "data-type");
    filterElements(serviceCards, "all", "data-type");
  });
});
