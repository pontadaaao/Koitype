import type { Locale } from "@/lib/i18n";

type ContentItem =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

type Section = {
  heading: string;
  items: ContentItem[];
};

export type TermsContent = {
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
};

const content: Record<Locale, TermsContent> = {
  ja: {
    title: "利用規約",
    updated: "最終更新日：2026年6月28日",
    intro:
      "本利用規約（以下「本規約」）は、当サイト（以下「本サービス」）をご利用いただくすべての方（以下「利用者」）に適用されます。本サービスをご利用いただくことで、本規約に同意したものとみなします。",
    sections: [
      {
        heading: "第1条（サービスについて）",
        items: [
          {
            type: "p",
            text: "本サービスは、恋愛診断・心理テスト・性格診断などのエンターテインメントコンテンツを提供することを目的としています。",
          },
          {
            type: "p",
            text: "診断結果は娯楽目的であり、医学・心理学・占い・専門的な診断を保証するものではありません。",
          },
        ],
      },
      {
        heading: "第2条（禁止事項）",
        items: [
          { type: "p", text: "利用者は以下の行為を行ってはいけません。" },
          {
            type: "ul",
            items: [
              "法令または公序良俗に反する行為",
              "当サイトまたは第三者の権利を侵害する行為",
              "サービス運営を妨害する行為",
              "不正アクセスやプログラムへの攻撃",
              "虚偽の情報を投稿する行為",
              "その他、運営者が不適切と判断する行為",
            ],
          },
        ],
      },
      {
        heading: "第3条（知的財産権）",
        items: [
          {
            type: "p",
            text: "当サイトに掲載される文章、画像、イラスト、デザイン、ロゴ、診断内容などの著作権その他の知的財産権は、運営者または正当な権利者に帰属します。",
          },
          { type: "p", text: "無断転載、複製、再配布、商用利用は禁止します。" },
        ],
      },
      {
        heading: "第4条（免責事項）",
        items: [
          {
            type: "p",
            text: "当サイトは、掲載情報の正確性・完全性・有用性を保証するものではありません。",
          },
          {
            type: "p",
            text: "利用者が本サービスを利用したことにより生じた損害について、運営者は責任を負いません。",
          },
          {
            type: "p",
            text: "また、予告なくサービス内容の変更・停止・終了を行う場合があります。",
          },
        ],
      },
      {
        heading: "第5条（広告について）",
        items: [
          {
            type: "p",
            text: "当サイトでは、広告配信サービス（Google AdSense等）やアフィリエイトプログラムを利用する場合があります。",
          },
          {
            type: "p",
            text: "広告リンク先の商品・サービスに関するお問い合わせは、各提供元へお願いいたします。",
          },
        ],
      },
      {
        heading: "第6条（外部リンク）",
        items: [
          {
            type: "p",
            text: "当サイトからリンクしている外部サイトについて、運営者はその内容や安全性を保証するものではありません。",
          },
        ],
      },
      {
        heading: "第7条（個人情報）",
        items: [
          {
            type: "p",
            text: "個人情報の取り扱いについては、別途「プライバシーポリシー」に従います。",
          },
        ],
      },
      {
        heading: "第8条（利用規約の変更）",
        items: [
          {
            type: "p",
            text: "本規約は、必要に応じて予告なく変更する場合があります。",
          },
          {
            type: "p",
            text: "変更後の規約は、本サイトへ掲載した時点から効力を生じます。",
          },
        ],
      },
      {
        heading: "第9条（準拠法・管轄）",
        items: [
          { type: "p", text: "本規約は日本法に準拠します。" },
          {
            type: "p",
            text: "本サービスに関する紛争については、運営者所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。",
          },
        ],
      },
    ],
  },
  en: {
    title: "Terms of Use",
    updated: "Last Updated: June 28, 2026",
    intro:
      "These Terms of Use (hereinafter \"these Terms\") apply to all users (hereinafter \"users\") of this website (hereinafter \"this service\"). By using this service, you are deemed to have agreed to these Terms.",
    sections: [
      {
        heading: "Article 1 (About the Service)",
        items: [
          {
            type: "p",
            text: "This service aims to provide entertainment content such as love quizzes, psychological tests, and personality diagnoses.",
          },
          {
            type: "p",
            text: "Quiz results are for entertainment purposes only and do not constitute medical, psychological, or any other professional diagnosis.",
          },
        ],
      },
      {
        heading: "Article 2 (Prohibited Activities)",
        items: [
          { type: "p", text: "Users must not engage in the following activities:" },
          {
            type: "ul",
            items: [
              "Acts that violate laws or public order and morals",
              "Acts that infringe on the rights of this site or third parties",
              "Acts that interfere with the operation of the service",
              "Unauthorized access or attacks on programs",
              "Posting false information",
              "Any other acts deemed inappropriate by the operator",
            ],
          },
        ],
      },
      {
        heading: "Article 3 (Intellectual Property Rights)",
        items: [
          {
            type: "p",
            text: "Copyright and other intellectual property rights for all text, images, illustrations, designs, logos, and quiz content posted on this site belong to the operator or rightful rights holders.",
          },
          {
            type: "p",
            text: "Unauthorized reproduction, copying, redistribution, or commercial use is prohibited.",
          },
        ],
      },
      {
        heading: "Article 4 (Disclaimer)",
        items: [
          {
            type: "p",
            text: "This site does not guarantee the accuracy, completeness, or usefulness of the posted information.",
          },
          {
            type: "p",
            text: "The operator is not responsible for any damages arising from a user's use of this service.",
          },
          {
            type: "p",
            text: "Service content may be changed, suspended, or terminated without notice.",
          },
        ],
      },
      {
        heading: "Article 5 (About Advertising)",
        items: [
          {
            type: "p",
            text: "This site may use advertising services (such as Google AdSense) and affiliate programs.",
          },
          {
            type: "p",
            text: "For inquiries regarding products and services linked through advertisements, please contact each respective provider.",
          },
        ],
      },
      {
        heading: "Article 6 (External Links)",
        items: [
          {
            type: "p",
            text: "The operator does not guarantee the content or safety of external sites linked from this site.",
          },
        ],
      },
      {
        heading: "Article 7 (Personal Information)",
        items: [
          {
            type: "p",
            text: "The handling of personal information is governed by our separate Privacy Policy.",
          },
        ],
      },
      {
        heading: "Article 8 (Changes to Terms of Use)",
        items: [
          {
            type: "p",
            text: "These Terms may be changed without notice as necessary.",
          },
          {
            type: "p",
            text: "Revised Terms take effect from the time they are posted on this site.",
          },
        ],
      },
      {
        heading: "Article 9 (Governing Law and Jurisdiction)",
        items: [
          { type: "p", text: "These Terms are governed by the laws of Japan." },
          {
            type: "p",
            text: "For disputes related to this service, the court having jurisdiction over the operator's location shall be the agreed court of exclusive jurisdiction for the first instance.",
          },
        ],
      },
    ],
  },
  ko: {
    title: "이용약관",
    updated: "최종 업데이트: 2026년 6월 28일",
    intro:
      "본 이용약관（이하 「본 약관」）은 본 사이트（이하 「본 서비스」）를 이용하는 모든 분（이하 「이용자」）에게 적용됩니다. 본 서비스를 이용함으로써 본 약관에 동의한 것으로 간주합니다.",
    sections: [
      {
        heading: "제1조（서비스에 대해）",
        items: [
          {
            type: "p",
            text: "본 서비스는 연애 진단·심리 테스트·성격 진단 등의 엔터테인먼트 콘텐츠를 제공하는 것을 목적으로 합니다.",
          },
          {
            type: "p",
            text: "진단 결과는 오락 목적이며, 의학·심리학·점술·전문적인 진단을 보증하는 것이 아닙니다.",
          },
        ],
      },
      {
        heading: "제2조（금지사항）",
        items: [
          { type: "p", text: "이용자는 다음의 행위를 해서는 안 됩니다." },
          {
            type: "ul",
            items: [
              "법령 또는 공서양속에 반하는 행위",
              "본 사이트 또는 제3자의 권리를 침해하는 행위",
              "서비스 운영을 방해하는 행위",
              "불법 접근 또는 프로그램에 대한 공격",
              "허위 정보를 투고하는 행위",
              "그 외 운영자가 부적절하다고 판단하는 행위",
            ],
          },
        ],
      },
      {
        heading: "제3조（지적재산권）",
        items: [
          {
            type: "p",
            text: "본 사이트에 게재된 문장, 이미지, 일러스트, 디자인, 로고, 진단 내용 등의 저작권 및 기타 지적재산권은 운영자 또는 정당한 권리자에게 귀속됩니다.",
          },
          {
            type: "p",
            text: "무단 전재, 복제, 재배포, 상업적 이용을 금지합니다.",
          },
        ],
      },
      {
        heading: "제4조（면책사항）",
        items: [
          {
            type: "p",
            text: "본 사이트는 게재 정보의 정확성·완전성·유용성을 보증하지 않습니다.",
          },
          {
            type: "p",
            text: "이용자가 본 서비스를 이용함으로써 발생한 손해에 대해 운영자는 책임을 지지 않습니다.",
          },
          {
            type: "p",
            text: "또한, 예고 없이 서비스 내용의 변경·정지·종료를 할 수 있습니다.",
          },
        ],
      },
      {
        heading: "제5조（광고에 대해）",
        items: [
          {
            type: "p",
            text: "본 사이트에서는 광고 배포 서비스（Google AdSense 등）나 제휴 프로그램을 이용할 수 있습니다.",
          },
          {
            type: "p",
            text: "광고 링크 상품·서비스에 관한 문의는 각 제공원에 해주세요.",
          },
        ],
      },
      {
        heading: "제6조（외부 링크）",
        items: [
          {
            type: "p",
            text: "본 사이트에서 링크된 외부 사이트에 대해, 운영자는 그 내용이나 안전성을 보증하지 않습니다.",
          },
        ],
      },
      {
        heading: "제7조（개인정보）",
        items: [
          {
            type: "p",
            text: "개인정보 취급에 대해서는 별도의 「개인정보처리방침」에 따릅니다.",
          },
        ],
      },
      {
        heading: "제8조（이용약관의 변경）",
        items: [
          {
            type: "p",
            text: "본 약관은 필요에 따라 예고 없이 변경될 수 있습니다.",
          },
          {
            type: "p",
            text: "변경된 약관은 본 사이트에 게재된 시점부터 효력이 발생합니다.",
          },
        ],
      },
      {
        heading: "제9조（준거법·관할）",
        items: [
          { type: "p", text: "본 약관은 일본법에 준거합니다." },
          {
            type: "p",
            text: "본 서비스에 관한 분쟁에 대해서는 운영자 소재지를 관할하는 법원을 제1심의 전속적 합의 관할 법원으로 합니다.",
          },
        ],
      },
    ],
  },
  "zh-TW": {
    title: "使用條款",
    updated: "最後更新日期：2026年6月28日",
    intro:
      "本使用條款（以下簡稱「本條款」）適用於所有使用本網站（以下簡稱「本服務」）的用戶（以下簡稱「用戶」）。使用本服務即視為同意本條款。",
    sections: [
      {
        heading: "第1條（關於服務）",
        items: [
          {
            type: "p",
            text: "本服務旨在提供戀愛診斷、心理測驗、性格診斷等娛樂內容。",
          },
          {
            type: "p",
            text: "診斷結果僅供娛樂目的，不構成醫學、心理學、占卜或任何專業診斷的保證。",
          },
        ],
      },
      {
        heading: "第2條（禁止行為）",
        items: [
          { type: "p", text: "用戶不得從事以下行為：" },
          {
            type: "ul",
            items: [
              "違反法令或公序良俗的行為",
              "侵害本站或第三方權利的行為",
              "妨礙服務運營的行為",
              "未經授權的存取或對程式的攻擊",
              "發布虛假信息的行為",
              "其他經營者認為不當的行為",
            ],
          },
        ],
      },
      {
        heading: "第3條（智慧財產權）",
        items: [
          {
            type: "p",
            text: "本站刊登的文章、圖片、插圖、設計、標誌、診斷內容等著作權及其他智慧財產權，歸屬於經營者或合法權利人。",
          },
          {
            type: "p",
            text: "禁止未經授權轉載、複製、再散布或商業使用。",
          },
        ],
      },
      {
        heading: "第4條（免責聲明）",
        items: [
          {
            type: "p",
            text: "本站不保證所刊登資訊的正確性、完整性或實用性。",
          },
          {
            type: "p",
            text: "對於用戶因使用本服務而造成的損害，經營者不承擔任何責任。",
          },
          {
            type: "p",
            text: "本站可能在不另行通知的情況下變更、暫停或終止服務內容。",
          },
        ],
      },
      {
        heading: "第5條（關於廣告）",
        items: [
          {
            type: "p",
            text: "本站可能使用廣告投放服務（如 Google AdSense）及聯盟行銷計畫。",
          },
          {
            type: "p",
            text: "關於廣告連結商品及服務的詢問，請直接聯絡各提供商。",
          },
        ],
      },
      {
        heading: "第6條（外部連結）",
        items: [
          {
            type: "p",
            text: "對於本站連結的外部網站，經營者不保證其內容或安全性。",
          },
        ],
      },
      {
        heading: "第7條（個人資料）",
        items: [
          {
            type: "p",
            text: "個人資料的處理依據另行訂定的「隱私權政策」辦理。",
          },
        ],
      },
      {
        heading: "第8條（使用條款的變更）",
        items: [
          {
            type: "p",
            text: "本條款可能在不另行通知的情況下予以變更。",
          },
          {
            type: "p",
            text: "修改後的條款自刊登於本站起生效。",
          },
        ],
      },
      {
        heading: "第9條（準據法及管轄）",
        items: [
          { type: "p", text: "本條款依據日本法律解釋及執行。" },
          {
            type: "p",
            text: "關於本服務的紛爭，以經營者所在地有管轄權的法院為第一審專屬合意管轄法院。",
          },
        ],
      },
    ],
  },
  "zh-CN": {
    title: "使用条款",
    updated: "最后更新日期：2026年6月28日",
    intro:
      "本使用条款（以下简称「本条款」）适用于所有使用本网站（以下简称「本服务」）的用户（以下简称「用户」）。使用本服务即视为同意本条款。",
    sections: [
      {
        heading: "第1条（关于服务）",
        items: [
          {
            type: "p",
            text: "本服务旨在提供恋爱诊断、心理测试、性格诊断等娱乐内容。",
          },
          {
            type: "p",
            text: "诊断结果仅供娱乐目的，不构成医学、心理学、占卜或任何专业诊断的保证。",
          },
        ],
      },
      {
        heading: "第2条（禁止行为）",
        items: [
          { type: "p", text: "用户不得从事以下行为：" },
          {
            type: "ul",
            items: [
              "违反法令或公序良俗的行为",
              "侵害本站或第三方权利的行为",
              "妨碍服务运营的行为",
              "未经授权的访问或对程序的攻击",
              "发布虚假信息的行为",
              "其他经营者认为不当的行为",
            ],
          },
        ],
      },
      {
        heading: "第3条（知识产权）",
        items: [
          {
            type: "p",
            text: "本站刊登的文章、图片、插图、设计、标志、诊断内容等著作权及其他知识产权，归属于经营者或合法权利人。",
          },
          {
            type: "p",
            text: "禁止未经授权转载、复制、再分发或商业使用。",
          },
        ],
      },
      {
        heading: "第4条（免责声明）",
        items: [
          {
            type: "p",
            text: "本站不保证所刊登信息的正确性、完整性或实用性。",
          },
          {
            type: "p",
            text: "对于用户因使用本服务而造成的损害，经营者不承担任何责任。",
          },
          {
            type: "p",
            text: "本站可能在不另行通知的情况下变更、暂停或终止服务内容。",
          },
        ],
      },
      {
        heading: "第5条（关于广告）",
        items: [
          {
            type: "p",
            text: "本站可能使用广告投放服务（如 Google AdSense）及联盟营销计划。",
          },
          {
            type: "p",
            text: "关于广告链接商品及服务的咨询，请直接联系各提供商。",
          },
        ],
      },
      {
        heading: "第6条（外部链接）",
        items: [
          {
            type: "p",
            text: "对于本站链接的外部网站，经营者不保证其内容或安全性。",
          },
        ],
      },
      {
        heading: "第7条（个人信息）",
        items: [
          {
            type: "p",
            text: "个人信息的处理依据另行订立的「隐私政策」执行。",
          },
        ],
      },
      {
        heading: "第8条（使用条款的变更）",
        items: [
          {
            type: "p",
            text: "本条款可能在不另行通知的情况下予以变更。",
          },
          {
            type: "p",
            text: "修改后的条款自刊登于本站起生效。",
          },
        ],
      },
      {
        heading: "第9条（准据法及管辖）",
        items: [
          { type: "p", text: "本条款依据日本法律解释及执行。" },
          {
            type: "p",
            text: "关于本服务的纠纷，以经营者所在地有管辖权的法院为第一审专属合意管辖法院。",
          },
        ],
      },
    ],
  },
};

export function getTermsContent(locale: Locale): TermsContent {
  return content[locale] ?? content.ja;
}
