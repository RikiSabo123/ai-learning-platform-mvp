'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    const categories = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Categories";`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const map = {};
    categories.forEach(c => map[c.name] = c.id);

    const data = [
      // מדע
      { name: 'אסטרונומיה וחלל', categoryId: map['מדע'] },
      { name: 'פיזיקה קוונטית', categoryId: map['מדע'] },
      { name: 'ביולוגיה וגנטיקה', categoryId: map['מדע'] },
      { name: 'כימיה יישומית', categoryId: map['מדע'] },
      { name: 'מדעי כדור הארץ', categoryId: map['מדע'] },

      // שפות
      { name: 'אנגלית מדוברת', categoryId: map['שפות'] },
      { name: 'דקדוק מתקדם', categoryId: map['שפות'] },
      { name: 'ספרדית למתחילים', categoryId: map['שפות'] },
      { name: 'עברית עסקית', categoryId: map['שפות'] },
      { name: 'פיתוח אוצר מילים', categoryId: map['שפות'] },

      // טכנולוגיה
      { name: 'פיתוח Backend', categoryId: map['טכנולוגיה'] },
      { name: 'פיתוח Frontend', categoryId: map['טכנולוגיה'] },
      { name: 'דוקר וקונטיינרים', categoryId: map['טכנולוגיה'] },
      { name: 'למידת מכונה', categoryId: map['טכנולוגיה'] },
      { name: 'סייבר ואבטחת מידע', categoryId: map['טכנולוגיה'] },

      // היסטוריה
      { name: 'מצרים העתיקה', categoryId: map['היסטוריה'] },
      { name: 'האימפריה הרומית', categoryId: map['היסטוריה'] },
      { name: 'מלחמת העולם השנייה', categoryId: map['היסטוריה'] },
      { name: 'היסטוריה מודרנית', categoryId: map['היסטוריה'] },
      { name: 'תולדות המזרח התיכון', categoryId: map['היסטוריה'] },

      // עסקים
      { name: 'שיווק דיגיטלי', categoryId: map['עסקים'] },
      { name: 'ניהול צוותים', categoryId: map['עסקים'] },
      { name: 'אסטרטגיה עסקית', categoryId: map['עסקים'] },
      { name: 'מכירות והשפעה', categoryId: map['עסקים'] },
      { name: 'מיתוג', categoryId: map['עסקים'] },

      // אמנות
      { name: 'צילום', categoryId: map['אמנות'] },
      { name: 'עיצוב גרפי', categoryId: map['אמנות'] },
      { name: 'איור דיגיטלי', categoryId: map['אמנות'] },
      { name: 'עיצוב UI/UX', categoryId: map['אמנות'] },
      { name: 'עריכת וידאו', categoryId: map['אמנות'] },

      // בריאות וכושר
      { name: 'כושר פונקציונלי', categoryId: map['בריאות וכושר'] },
      { name: 'תזונה נכונה', categoryId: map['בריאות וכושר'] },
      { name: 'אימוני כוח', categoryId: map['בריאות וכושר'] },
      { name: 'יוגה וגמישות', categoryId: map['בריאות וכושר'] },
      { name: 'שיפור סיבולת', categoryId: map['בריאות וכושר'] },

      // פסיכולוגיה
      { name: 'פסיכולוגיה חיובית', categoryId: map['פסיכולוגיה'] },
      { name: 'ניהול רגשות', categoryId: map['פסיכולוגיה'] },
      { name: 'קבלת החלטות', categoryId: map['פסיכולוגיה'] },
      { name: 'הרגלים והתמדה', categoryId: map['פסיכולוגיה'] },
      { name: 'ביטחון עצמי', categoryId: map['פסיכולוגיה'] },

      // חינוך ולמידה
      { name: 'שיטות למידה', categoryId: map['חינוך ולמידה'] },
      { name: 'זיכרון וריכוז', categoryId: map['חינוך ולמידה'] },
      { name: 'ניהול זמן', categoryId: map['חינוך ולמידה'] },
      { name: 'למידה עצמאית', categoryId: map['חינוך ולמידה'] },
      { name: 'הוראה אפקטיבית', categoryId: map['חינוך ולמידה'] },

      // כסף והשקעות
      { name: 'שוק ההון', categoryId: map['כסף והשקעות'] },
      { name: 'השקעות למתחילים', categoryId: map['כסף והשקעות'] },
      { name: 'נדל״ן', categoryId: map['כסף והשקעות'] },
      { name: 'ניהול תקציב', categoryId: map['כסף והשקעות'] },
      { name: 'הכנסות פסיביות', categoryId: map['כסף והשקעות'] },

      // יזמות וסטארטאפים
      { name: 'רעיונות לסטארטאפ', categoryId: map['יזמות וסטארטאפים'] },
      { name: 'גיוס משקיעים', categoryId: map['יזמות וסטארטאפים'] },
      { name: 'בניית מוצר', categoryId: map['יזמות וסטארטאפים'] },
      { name: 'MVP מהיר', categoryId: map['יזמות וסטארטאפים'] },
      { name: 'סקיילינג', categoryId: map['יזמות וסטארטאפים'] }
    ];

    await queryInterface.bulkInsert('SubCategories', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SubCategories', null, {});
  }
};