import { SMSCalculator } from "../index";

describe("SMSCalculator", () => {
    const textExamples = [
        { text: "Hey! Check out this awesome website: https://bit.ly/3xA 😊 It's fantastic! Don't miss it 😎!", expected: {encoding: 'UCS-2', numberOfSMS: 2, totalLength: 92, maxCharCount: 67} },
        { text: "Γεια σου! Δες αυτό το φοβερό site: https://bit.ly/3xA 😁! Θα σου αρέσει πολύ! 🔥", expected: {encoding: 'UCS-2', numberOfSMS: 2, totalLength: 80, maxCharCount: 67} },
        { text: "مرحباً! كيف حالك؟ 😊 سأراك قريباً. 🌟 لا تنسى الموقع: https://bit.ly/3xA", expected: {encoding: 'UCS-2', numberOfSMS: 2, totalLength: 72, maxCharCount: 67} },
        { text: "你好！快来看这个网站：https://bit.ly/3xA 🎉 这个网站真棒！😍", expected: {encoding: 'UCS-2', numberOfSMS: 1, totalLength: 42, maxCharCount: 70}},
        { text: "Привет! Как дела? Это отличное место! 🏞️ Увидимся позже! 😄", expected: {encoding: 'UCS-2', numberOfSMS: 1, totalLength: 60, maxCharCount: 70} },
        { text: "नमस्ते! यह वेबसाइट देखो: https://bit.ly/3xA 😊 बहुत अच्छी है! 🙌", expected: {encoding: 'UCS-2', numberOfSMS: 1, totalLength: 64, maxCharCount: 70}},
        { text: "¡Hola! ¿Cómo estás? Me encanta este sitio: https://bit.ly/3xA 😁. ¡Increíble!", expected: {encoding: 'UCS-2', numberOfSMS: 2, totalLength: 77, maxCharCount: 67}},
        { text: "こんにちは！素晴らしいウェブサイトがあります：https://bit.ly/3xA 🎌 ぜひチェックしてください！", expected: {encoding: 'UCS-2', numberOfSMS: 1, totalLength: 58, maxCharCount: 70}},
        { text: "🎉🎉🎉 Let's celebrate!!! 🎉🎉🎉 🎂🎂🎂🥳🥳🥳 https://bit.ly/3xA", expected: {encoding: 'UCS-2', numberOfSMS: 1, totalLength: 64, maxCharCount: 70}},
        { text: "مرحباً! Check out this amazing site: https://bit.ly/3xA 😊 You're gonna love it! 🌟", expected: {encoding: 'UCS-2', numberOfSMS: 2, totalLength: 83, maxCharCount: 67}},
        { text: "שלום! תראה את האתר הזה: https://bit.ly/3xA 😃. זה פשוט מדהים! 🔥", expected: {encoding: 'UCS-2', numberOfSMS: 1, totalLength: 64, maxCharCount: 70}},
        { text: "🔧✨ Tech at its finest! Δελτίο ενημέρωσης: https://bit.ly/3xA 🌟", expected: {encoding: 'UCS-2', numberOfSMS: 1, totalLength: 64, maxCharCount: 70}},
        { text: "สวัสดีครับ! เยี่ยมชมเว็บไซต์นี้ได้ที่ https://bit.ly/3xA 🎉 สุดยอดเลย!", expected: {encoding: 'UCS-2', numberOfSMS: 1, totalLength: 70, maxCharCount: 70}},
        { text: "Bonjour! Comment ça va? Ce site est incroyable: https://bit.ly/3xA 😁💯", expected: {encoding: 'UCS-2', numberOfSMS: 2, totalLength: 71, maxCharCount: 67}},
        { text: "🎉🎂🥳🔥💥✨🙌💯", expected: {encoding: 'UCS-2', numberOfSMS: 1, totalLength: 15, maxCharCount: 70}},
        { text: "Hello! How are you today? Just wanted to check in and say hi. Let's catch up soon. Take care!", expected: {encoding: 'GSM-7', numberOfSMS: 1, totalLength: 93, maxCharCount: 160}},
        { text: "Hey! Don’t forget to bring the £5 you owe me. We’ll grab a coffee ☕ soon.", expected: {encoding: 'UCS-2', numberOfSMS: 2, totalLength: 73, maxCharCount: 67}},
        { text: "Salut! Comment ça va? J’espère que tout va bien avec toi et ta famille. On se voit ce week-end?", expected: {encoding: 'UCS-2', numberOfSMS: 2, totalLength: 95, maxCharCount: 67}},
        { text: "Hallo! Ich hoffe, es geht dir gut. Wir sollten uns bald wieder treffen und über alte Zeiten sprechen.", expected: {encoding: 'GSM-7', numberOfSMS: 1, totalLength: 101, maxCharCount: 160}},
        { text: "¡Hola! ¿Cómo estás? Tengo muchas ganas de verte pronto. No olvides traer los documentos.", expected: {encoding: 'UCS-2', numberOfSMS: 2, totalLength: 88, maxCharCount: 67}},
        { text: "The price is €100, and we need to deliver it by Monday at the latest. Don't forget!", expected: {encoding: 'GSM-7', numberOfSMS: 1, totalLength: 84, maxCharCount: 160}},
        { text: "The total cost is €50. We'll need to confirm the payment by tomorrow morning.", expected: {encoding: 'GSM-7', numberOfSMS: 1, totalLength: 78, maxCharCount: 160}},
        { text: "This message is designed to be exactly 160 characters long. No more, no less. Let's make sure every word counts in this message and that it stays within the limit.", expected: {encoding: 'GSM-7', numberOfSMS: 2, totalLength: 163, maxCharCount: 153}},
        { text: "This is a long message that will exceed the 160 character limit for a single SMS message. When the length of this message exceeds the limit, it will be split into two or more parts.", expected: {encoding: 'GSM-7', numberOfSMS: 2, totalLength: 181, maxCharCount: 153}},
        { text: "Hello, John! Please confirm the date & time for our meeting at 10:00 AM. Call me at 555-1234. Thanks!", expected: {encoding: 'GSM-7', numberOfSMS: 1, totalLength: 101, maxCharCount: 160}},
    ];

    textExamples.forEach(({ text, expected }, index) => {
        it(`should correctly calculate SMS parts and encoding for example ${index + 1}`, () => {
            expect(SMSCalculator.getCount(text)).toEqual(expected);
        });
    });
});