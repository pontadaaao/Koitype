import type { Locale } from "@/lib/i18n";

export type ContactIntro = {
  lead: string;
  topicsTitle: string;
  topics: string[];
  reply: string;
  privacyBefore: string;
  privacyLink: string;
  privacyAfter: string;
};

const intro: Record<Locale, ContactIntro> = {
  ja: {
    lead: "Koitypeへのご連絡はこのフォームからお願いします。運営はKoitype編集部が行っており、いただいた内容は編集部で確認します。",
    topicsTitle: "こんなご連絡をお待ちしています",
    topics: [
      "記事や診断の内容に誤りがある、事実と違うというご指摘",
      "診断の判定や表示がおかしいという不具合のご報告",
      "掲載内容・画像に関する権利のお申し出",
      "取り上げてほしいテーマのご要望",
      "取材・掲載・その他のお問い合わせ",
    ],
    reply: "内容を確認のうえ返信しますが、お時間をいただく場合があります。ご返信が必要な場合は、受け取れるメールアドレスをご記入ください。個別の恋愛相談への回答は行っていません。",
    privacyBefore: "入力された内容は、外部のメール転送サービス「Formspree」を経由して運営者に届きます。取り扱いの詳細は",
    privacyLink: "プライバシーポリシー",
    privacyAfter: "をご覧ください。パスワードやクレジットカード番号などの機微な情報は入力しないでください。",
  },
  en: {
    lead: "Please use this form to contact Koitype. The site is run by the Koitype editorial team, and messages are reviewed by us.",
    topicsTitle: "What you can write to us about",
    topics: [
      "Errors or statements that do not match the facts in an article or quiz",
      "Bug reports about quiz results or how a page displays",
      "Rights claims regarding published text or images",
      "Requests for topics you would like us to cover",
      "Press, publication and other enquiries",
    ],
    reply: "We read every message and reply where needed, though it may take some time. If you would like a reply, please give an email address you can receive mail at. We do not answer individual relationship-advice requests.",
    privacyBefore: "What you submit reaches the operator through the external email forwarding service Formspree. For details, please see our ",
    privacyLink: "privacy policy",
    privacyAfter: ". Please do not enter sensitive information such as passwords or credit card numbers.",
  },
  ko: {
    lead: "Koitype에 대한 연락은 이 양식을 이용해 주세요. 운영은 Koitype 편집부가 담당하며, 보내주신 내용은 편집부에서 확인합니다.",
    topicsTitle: "이런 연락을 기다리고 있습니다",
    topics: [
      "기사나 진단 내용에 오류가 있거나 사실과 다르다는 지적",
      "진단 판정이나 표시가 이상하다는 오류 제보",
      "게재 내용·이미지에 관한 권리 신고",
      "다뤄주었으면 하는 주제에 대한 요청",
      "취재·게재 및 기타 문의",
    ],
    reply: "내용을 확인한 후 답변드리지만 시간이 걸릴 수 있습니다. 답변이 필요하신 경우 받을 수 있는 이메일 주소를 기재해 주세요. 개별 연애 상담에 대한 답변은 제공하지 않습니다.",
    privacyBefore: "입력하신 내용은 외부 메일 전송 서비스 'Formspree'를 거쳐 운영자에게 전달됩니다. 자세한 취급 방식은 ",
    privacyLink: "개인정보처리방침",
    privacyAfter: "을 참고해 주세요. 비밀번호나 신용카드 번호 등 민감한 정보는 입력하지 말아 주세요.",
  },
  "zh-TW": {
    lead: "與 Koitype 聯繫請使用本表單。本站由 Koitype 編輯部營運，來信將由編輯部確認。",
    topicsTitle: "歡迎與我們聯繫的內容",
    topics: [
      "指出文章或測驗內容有誤、與事實不符",
      "回報測驗判定或顯示異常等問題",
      "關於刊載內容與圖片的權利主張",
      "希望我們撰寫的主題建議",
      "採訪、轉載及其他詢問",
    ],
    reply: "我們會確認內容後回覆，但可能需要一些時間。若需要回覆，請填寫可以收信的電子郵件地址。本站不提供個別的戀愛諮詢回覆。",
    privacyBefore: "您填寫的內容會透過外部郵件轉寄服務「Formspree」送達營運者。詳細處理方式請參閱",
    privacyLink: "隱私權政策",
    privacyAfter: "。請勿填寫密碼、信用卡號等敏感資訊。",
  },
  "zh-CN": {
    lead: "与 Koitype 联系请使用本表单。本站由 Koitype 编辑部运营，来信将由编辑部确认。",
    topicsTitle: "欢迎与我们联系的内容",
    topics: [
      "指出文章或测试内容有误、与事实不符",
      "反馈测试判定或显示异常等问题",
      "关于刊载内容与图片的权利主张",
      "希望我们撰写的主题建议",
      "采访、转载及其他咨询",
    ],
    reply: "我们会确认内容后回复，但可能需要一些时间。若需要回复，请填写可以收信的电子邮箱。本站不提供个别的恋爱咨询回复。",
    privacyBefore: "您填写的内容会通过外部邮件转发服务“Formspree”送达运营者。详细处理方式请参阅",
    privacyLink: "隐私政策",
    privacyAfter: "。请勿填写密码、信用卡号等敏感信息。",
  },
};

export function getContactIntro(locale: Locale): ContactIntro {
  return intro[locale] ?? intro.ja;
}
