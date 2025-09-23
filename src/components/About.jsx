import React from "react";

export default function About() {
  return (
    <section id="about" className="max-w-4xl mx-auto my-10 px-4">
      <div className="flex flex-col md:flex-row border-2 border-[#A47B2D] bg-[#A47B2D] shadow-lg rounded-xl overflow-hidden">
        {/* Desktop image */}
        <img
          src="https://i.ibb.co/cvdjCfy/F24-B6212n.jpg"
          alt="pic-desktop"
          className="hidden md:block w-full md:w-1/2 object-cover"
        />
        {/* Mobile image */}
        <img
          src="https://i.ibb.co/6Jw0Ghv/F24-B6173-1-new.jpg"
          alt="pic-mobile"
          className="block md:hidden w-full object-cover"
        />

        <aside className="p-6 text-right text-white">
          <h2 className="text-2xl font-bold mb-4">קצת עליי...</h2>
          <p className="text-sm md:text-base leading-relaxed">
            שמי מיכל אבולעפיה ואני אמנית איפור. אני מתמחה באיפור מקצועי לכלות,
            אירועים, הפקות, ציורי פנים וגוף, וכן באיפור קבוע-מיקרופיגמנטציה
            ועיצוב גבות.
            <br />
            <br />
            לפני שנכנסתי לעולם האיפור, עבדתי כגרפיקאית. בתיכון למדתי עיצוב
            גרפי מתוך אהבה לציור, דיוק ואמנות. כשהשתחררתי מהצבא, עבדתי בתחום
            הגרפיקה. אבל עולם האיפור תמיד הלהיב אותי. כנערה, גיליתי את נפלאות
            האיפור וגיליתי איך הוא מדגיש ומעצים את תווי הפנים שלי. תמיד היה לי
            בתיק מראה קטנה ועיפרון עיניים ושפתיים😊. לכן, אחרי הצבא, הדבר הראשון
            שרציתי ללמוד היה מקצוע האיפור.
            <br />
            <br />
            למדתי את הקורס הראשון שלי באקדמיה לאיפור "מולה סנטר" בתחילת שנות
            ה-90, ולאחר מכן העמקתי בבית ספר לאיפור "איל מקיאז'". מאז ועד היום אני
            עוסקת בתחום. עבדתי עם צלמים, איפרתי בסלוני כלות, והשתתפתי בהפקות
            שונות. יש לי ניסיון עשיר ומגוון של כמעט 30 שנה באיפור ביוטי לאירועים
            וצילומים וכן בציורי פנים וגוף.
            <br />
            <br />
            בשנת 2013 יצאתי לדרך עצמאית בתחום האיפור. אני כל הזמן מתמקצעת
            ומתעדכנת בטרנדים מובילים. בשנת 2016 למדתי איפור
            קבוע-מיקרופיגמנטציה ועיצוב גבות, תחום שמשך אותי מתוך אהבה לאיפור,
            לדיוק ולהדגשת תווי הפנים.
            <br />
            <br />
            אני אוהבת להעניק לנשים ביטחון והנאה במראה שלהן. איפור אינו בא להסתיר,
            אלא להבליט את היופי והייחודיות שלך. הרגע שאני הכי נהנית ממנו הוא
            לראות את החיוך שלך מול המראה, ולהבין שהגשמתי עוד חלום.
            <br />
            <br />
            אני כאן בשבילך❣️ כדי להבליט את היופי שלך.
            <br />
            מוזמנ/ת לביוטירום שלי בבאר יעקב.
            <br />
            <span className="italic text-sm">
              * לאיפור לאירועים וציורי פנים, אפשרות הגעה ללקוח.
            </span>
          </p>
        </aside>
      </div>
    </section>
  );
}
