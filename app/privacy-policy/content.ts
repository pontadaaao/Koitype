import type { Locale } from "@/lib/i18n";

type ContentItem =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "pLink"; before: string; linkText: string; after: string };

type Section = {
  heading: string;
  items: ContentItem[];
};

export type PrivacyPolicyContent = {
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
};

const content: Record<Locale, PrivacyPolicyContent> = {
  ja: {
    title: "プライバシーポリシー",
    updated: "最終更新日：2026年6月28日",
    intro:
      "当サイト（以下「本サイト」）では、利用者の皆様に安心してご利用いただけるよう、個人情報の保護に努めています。本ポリシーでは、本サイトにおける個人情報の取り扱いについてご説明します。",
    sections: [
      {
        heading: "1. 個人情報の利用目的",
        items: [
          {
            type: "p",
            text: "本サイトでは、お問い合わせフォームをご利用いただく際に、氏名（ハンドルネームを含む）、メールアドレス等の個人情報をご入力いただく場合があります。",
          },
          {
            type: "p",
            text: "取得した個人情報は、お問い合わせへの回答や必要なご連絡のために利用し、それ以外の目的では利用いたしません。",
          },
        ],
      },
      {
        heading: "2. 個人情報の第三者提供",
        items: [
          {
            type: "p",
            text: "取得した個人情報は、以下の場合を除き第三者へ提供することはありません。",
          },
          {
            type: "ul",
            items: [
              "ご本人の同意がある場合",
              "法令に基づき開示が必要な場合",
              "人の生命・身体・財産の保護のために必要な場合",
            ],
          },
        ],
      },
      {
        heading: "3. Cookie（クッキー）の利用について",
        items: [
          {
            type: "p",
            text: "本サイトでは、利用者の利便性向上や広告配信、アクセス解析のためにCookieを利用することがあります。",
          },
          {
            type: "p",
            text: "Cookieとは、利用者のブラウザに保存される小さなデータファイルであり、氏名や住所など個人を特定する情報は含まれません。",
          },
          {
            type: "p",
            text: "Cookieはブラウザの設定から無効にすることができます。ただし、一部の機能が正常に動作しない場合があります。",
          },
        ],
      },
      {
        heading: "4. 広告配信について",
        items: [
          {
            type: "p",
            text: "本サイトでは、第三者配信の広告サービス（Google AdSense等）を利用する予定です。",
          },
          {
            type: "p",
            text: "Googleを含む第三者配信事業者は、Cookieを利用して、利用者の過去のアクセス情報に基づいた広告を表示する場合があります。",
          },
          {
            type: "p",
            text: "Googleが広告Cookieを使用することにより、利用者の興味・関心に応じた広告を表示することが可能になります。",
          },
          {
            type: "p",
            text: "利用者はGoogleの広告設定により、パーソナライズ広告を無効にすることができます。",
          },
          {
            type: "p",
            text: "また、第三者配信事業者によるCookieの利用を無効にしたい場合は、各事業者が提供するオプトアウトページをご利用ください。",
          },
        ],
      },
      {
        heading: "5. アフィリエイトプログラムについて",
        items: [
          {
            type: "p",
            text: "本サイトでは、アフィリエイトプログラムを利用する場合があります。",
          },
          {
            type: "p",
            text: "紹介している商品・サービスは、本サイトが販売しているものではなく、各販売元・提供元との直接契約となります。",
          },
          {
            type: "p",
            text: "商品の購入方法や詳細については、リンク先の販売元へご確認ください。",
          },
          {
            type: "p",
            text: "商品・サービスに関するお問い合わせにつきましても、各販売元へお願いいたします。",
          },
        ],
      },
      {
        heading: "6. アクセス解析ツールについて",
        items: [
          {
            type: "p",
            text: "本サイトでは、Google Analytics等のアクセス解析ツールを利用する場合があります。",
          },
          {
            type: "p",
            text: "これらのツールでは、トラフィックデータ収集のためCookieを利用しています。",
          },
          {
            type: "p",
            text: "収集されるデータは匿名であり、個人を特定するものではありません。",
          },
          {
            type: "p",
            text: "Cookieを無効にすることで、データ収集を拒否することができます。",
          },
        ],
      },
      {
        heading: "7. コメント・投稿について",
        items: [
          {
            type: "p",
            text: "本サイトでは、利用者が投稿するコメントや診断に関する投稿を掲載する場合があります。",
          },
          {
            type: "p",
            text: "法令または公序良俗に反する内容、第三者を誹謗中傷する内容、その他運営者が不適切と判断した内容については、予告なく削除する場合があります。",
          },
        ],
      },
      {
        heading: "8. 免責事項",
        items: [
          {
            type: "p",
            text: "本サイトに掲載する情報については、可能な限り正確な内容を提供するよう努めていますが、その正確性・安全性・有用性を保証するものではありません。",
          },
          {
            type: "p",
            text: "本サイトの情報を利用したことによって生じた損害について、一切の責任を負いません。",
          },
          {
            type: "p",
            text: "また、リンク先サイトにおける情報・サービス等についても責任を負いかねます。",
          },
          {
            type: "p",
            text: "本サイトに掲載している恋愛診断・心理テスト・性格診断等はエンターテインメントを目的として提供しており、医学的・心理学的・専門的な診断を行うものではありません。",
          },
        ],
      },
      {
        heading: "9. 著作権",
        items: [
          {
            type: "p",
            text: "本サイトに掲載している文章・画像・イラスト・ロゴ・デザイン・診断コンテンツ等の著作権は、運営者または正当な権利者に帰属します。",
          },
          {
            type: "p",
            text: "法令で認められる場合を除き、無断転載・複製・再配布・商用利用を禁止します。",
          },
          {
            type: "p",
            text: "引用を行う際は、引用元を明記し、著作権法の範囲内でご利用ください。",
          },
        ],
      },
      {
        heading: "10. プライバシーポリシーの変更",
        items: [
          {
            type: "p",
            text: "本ポリシーは、法令の改正やサービス内容の変更等に応じて、予告なく変更する場合があります。",
          },
          {
            type: "p",
            text: "変更後のプライバシーポリシーは、本ページに掲載した時点で効力を生じます。",
          },
        ],
      },
      {
        heading: "11. お問い合わせ",
        items: [
          {
            type: "pLink",
            before: "本サイトに関するお問い合わせは、",
            linkText: "お問い合わせフォーム",
            after: "よりお願いいたします。",
          },
          {
            type: "p",
            text: "返信にはお時間をいただく場合がありますので、あらかじめご了承ください。",
          },
        ],
      },
      {
        heading: "12. 運営者",
        items: [
          {
            type: "ul",
            items: [
              "サイト名：Koitype",
              "運営者：Koitype運営事務局",
              "お問い合わせ：サイト内のお問い合わせフォームをご利用ください。",
            ],
          },
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    updated: "Last Updated: June 28, 2026",
    intro:
      "This website (hereinafter \"this site\") strives to protect the personal information of all users. This policy explains how personal information is handled on this site.",
    sections: [
      {
        heading: "1. Purpose of Use of Personal Information",
        items: [
          {
            type: "p",
            text: "When using the contact form on this site, you may be asked to enter personal information such as your name (including handles) and email address.",
          },
          {
            type: "p",
            text: "The personal information we collect will only be used to respond to your inquiries and for necessary communications, and will not be used for any other purposes.",
          },
        ],
      },
      {
        heading: "2. Disclosure to Third Parties",
        items: [
          {
            type: "p",
            text: "Collected personal information will not be disclosed to third parties except in the following cases:",
          },
          {
            type: "ul",
            items: [
              "When you have given your consent",
              "When disclosure is required by law",
              "When necessary to protect a person's life, body, or property",
            ],
          },
        ],
      },
      {
        heading: "3. About Cookies",
        items: [
          {
            type: "p",
            text: "This site may use cookies to improve user convenience, for advertising delivery, and for access analysis.",
          },
          {
            type: "p",
            text: "Cookies are small data files stored in your browser and do not contain personally identifiable information such as your name or address.",
          },
          {
            type: "p",
            text: "You can disable cookies in your browser settings, though some features may not function properly as a result.",
          },
        ],
      },
      {
        heading: "4. About Advertising",
        items: [
          {
            type: "p",
            text: "This site plans to use third-party advertising services (such as Google AdSense).",
          },
          {
            type: "p",
            text: "Third-party advertisers, including Google, may use cookies to display ads based on your past browsing history.",
          },
          {
            type: "p",
            text: "Google's use of advertising cookies enables the display of ads tailored to your interests.",
          },
          {
            type: "p",
            text: "You can disable personalized ads through Google's ad settings.",
          },
          {
            type: "p",
            text: "To opt out of cookies used by third-party advertisers, please use the opt-out pages provided by each company.",
          },
        ],
      },
      {
        heading: "5. About Affiliate Programs",
        items: [
          {
            type: "p",
            text: "This site may participate in affiliate programs.",
          },
          {
            type: "p",
            text: "Products and services introduced are not sold by this site; they are direct contracts with each seller or provider.",
          },
          {
            type: "p",
            text: "For purchase details and methods, please check the linked seller's page.",
          },
          {
            type: "p",
            text: "For inquiries about products and services, please contact each seller directly.",
          },
        ],
      },
      {
        heading: "6. About Access Analysis Tools",
        items: [
          {
            type: "p",
            text: "This site may use access analysis tools such as Google Analytics.",
          },
          {
            type: "p",
            text: "These tools use cookies to collect traffic data.",
          },
          {
            type: "p",
            text: "The data collected is anonymous and does not identify individuals.",
          },
          {
            type: "p",
            text: "You can opt out of data collection by disabling cookies.",
          },
        ],
      },
      {
        heading: "7. About Comments and Posts",
        items: [
          {
            type: "p",
            text: "This site may publish comments and quiz-related posts submitted by users.",
          },
          {
            type: "p",
            text: "Content that violates laws or public order and morals, defames third parties, or is otherwise deemed inappropriate by the operator may be deleted without notice.",
          },
        ],
      },
      {
        heading: "8. Disclaimer",
        items: [
          {
            type: "p",
            text: "While we strive to provide accurate content, we do not guarantee the accuracy, safety, or usefulness of the information on this site.",
          },
          {
            type: "p",
            text: "We accept no responsibility for any damages resulting from the use of information on this site.",
          },
          {
            type: "p",
            text: "We are also not responsible for information or services on linked external sites.",
          },
          {
            type: "p",
            text: "Love quizzes, psychological tests, and personality diagnoses on this site are provided for entertainment purposes only and are not medical, psychological, or professional diagnoses.",
          },
        ],
      },
      {
        heading: "9. Copyright",
        items: [
          {
            type: "p",
            text: "Copyright and other intellectual property rights for all text, images, illustrations, logos, designs, and quiz content on this site belong to the operator or rightful rights holders.",
          },
          {
            type: "p",
            text: "Unauthorized reproduction, copying, redistribution, or commercial use is prohibited except as permitted by law.",
          },
          {
            type: "p",
            text: "When quoting, please credit the source and stay within the bounds of copyright law.",
          },
        ],
      },
      {
        heading: "10. Changes to Privacy Policy",
        items: [
          {
            type: "p",
            text: "This policy may be changed without notice in response to legal revisions or changes in service content.",
          },
          {
            type: "p",
            text: "The revised privacy policy takes effect from the time it is posted on this page.",
          },
        ],
      },
      {
        heading: "11. Contact",
        items: [
          {
            type: "pLink",
            before: "For inquiries about this site, please use the ",
            linkText: "contact form",
            after: ".",
          },
          {
            type: "p",
            text: "Please note that responses may take some time.",
          },
        ],
      },
      {
        heading: "12. Operator",
        items: [
          {
            type: "ul",
            items: [
              "Site Name: Koitype",
              "Operator: Koitype Operations Team",
              "Inquiries: Please use the contact form on the site.",
            ],
          },
        ],
      },
    ],
  },
  ko: {
    title: "개인정보처리방침",
    updated: "최종 업데이트: 2026년 6월 28일",
    intro:
      "본 사이트（이하 \"본 사이트\"）는 이용자 여러분이 안심하고 이용하실 수 있도록 개인정보 보호에 힘쓰고 있습니다. 본 방침에서는 본 사이트에서의 개인정보 취급에 대해 설명합니다.",
    sections: [
      {
        heading: "1. 개인정보 이용 목적",
        items: [
          {
            type: "p",
            text: "본 사이트에서는 문의 양식을 이용하실 때 성명（닉네임 포함）, 이메일 주소 등의 개인정보를 입력하실 수 있습니다.",
          },
          {
            type: "p",
            text: "수집한 개인정보는 문의에 대한 답변 및 필요한 연락에만 사용하며, 그 외의 목적으로는 이용하지 않습니다.",
          },
        ],
      },
      {
        heading: "2. 제3자 제공",
        items: [
          {
            type: "p",
            text: "수집한 개인정보는 다음의 경우를 제외하고 제3자에게 제공하지 않습니다.",
          },
          {
            type: "ul",
            items: [
              "본인의 동의가 있는 경우",
              "법령에 의해 공개가 필요한 경우",
              "생명·신체·재산의 보호를 위해 필요한 경우",
            ],
          },
        ],
      },
      {
        heading: "3. 쿠키（Cookie）이용에 대해",
        items: [
          {
            type: "p",
            text: "본 사이트에서는 이용자의 편의 향상, 광고 배포 및 접속 분석을 위해 쿠키를 사용할 수 있습니다.",
          },
          {
            type: "p",
            text: "쿠키는 이용자의 브라우저에 저장되는 소규모 데이터 파일로, 성명이나 주소 등 개인을 특정하는 정보는 포함되지 않습니다.",
          },
          {
            type: "p",
            text: "쿠키는 브라우저 설정에서 비활성화할 수 있습니다. 단, 일부 기능이 정상적으로 작동하지 않을 수 있습니다.",
          },
        ],
      },
      {
        heading: "4. 광고 배포에 대해",
        items: [
          {
            type: "p",
            text: "본 사이트에서는 제3자 광고 서비스（Google AdSense 등）를 이용할 예정입니다.",
          },
          {
            type: "p",
            text: "Google을 포함한 제3자 광고 사업자는 쿠키를 활용하여 이용자의 과거 접속 정보에 기반한 광고를 표시할 수 있습니다.",
          },
          {
            type: "p",
            text: "Google의 광고 쿠키 사용으로 이용자의 관심사에 맞는 광고를 표시하는 것이 가능해집니다.",
          },
          {
            type: "p",
            text: "이용자는 Google의 광고 설정을 통해 맞춤형 광고를 비활성화할 수 있습니다.",
          },
          {
            type: "p",
            text: "제3자 광고 사업자의 쿠키 이용을 비활성화하려면 각 사업자가 제공하는 옵트아웃 페이지를 이용해 주세요.",
          },
        ],
      },
      {
        heading: "5. 제휴 프로그램에 대해",
        items: [
          {
            type: "p",
            text: "본 사이트에서는 제휴 프로그램을 이용할 수 있습니다.",
          },
          {
            type: "p",
            text: "소개하는 상품·서비스는 본 사이트가 판매하는 것이 아니며, 각 판매원·제공원과의 직접 계약이 됩니다.",
          },
          {
            type: "p",
            text: "상품 구매 방법이나 자세한 사항은 링크된 판매원 페이지에서 확인해 주세요.",
          },
          {
            type: "p",
            text: "상품·서비스에 관한 문의도 각 판매원에게 부탁드립니다.",
          },
        ],
      },
      {
        heading: "6. 접속 분석 도구에 대해",
        items: [
          {
            type: "p",
            text: "본 사이트에서는 Google Analytics 등의 접속 분석 도구를 사용할 수 있습니다.",
          },
          {
            type: "p",
            text: "이러한 도구는 트래픽 데이터 수집을 위해 쿠키를 사용합니다.",
          },
          {
            type: "p",
            text: "수집되는 데이터는 익명이며 개인을 특정하지 않습니다.",
          },
          {
            type: "p",
            text: "쿠키를 비활성화함으로써 데이터 수집을 거부할 수 있습니다.",
          },
        ],
      },
      {
        heading: "7. 댓글·게시물에 대해",
        items: [
          {
            type: "p",
            text: "본 사이트에서는 이용자가 투고한 댓글이나 진단 관련 게시물을 게재할 수 있습니다.",
          },
          {
            type: "p",
            text: "법령이나 공서양속에 반하는 내용, 제3자를 비방·중상하는 내용, 그 외 운영자가 부적절하다고 판단한 내용은 예고 없이 삭제할 수 있습니다.",
          },
        ],
      },
      {
        heading: "8. 면책사항",
        items: [
          {
            type: "p",
            text: "본 사이트에 게재하는 정보에 대해서는 최대한 정확한 내용을 제공하도록 노력하고 있으나, 그 정확성·안전성·유용성을 보장하지 않습니다.",
          },
          {
            type: "p",
            text: "본 사이트의 정보를 이용함으로써 발생한 손해에 대해 일체의 책임을 지지 않습니다.",
          },
          {
            type: "p",
            text: "또한, 링크된 외부 사이트의 정보·서비스 등에 대해서도 책임을 지지 않습니다.",
          },
          {
            type: "p",
            text: "본 사이트에 게재된 연애 진단·심리 테스트·성격 진단 등은 엔터테인먼트 목적으로 제공되며, 의학적·심리학적·전문적인 진단을 행하는 것이 아닙니다.",
          },
        ],
      },
      {
        heading: "9. 저작권",
        items: [
          {
            type: "p",
            text: "본 사이트에 게재된 문장·이미지·일러스트·로고·디자인·진단 콘텐츠 등의 저작권은 운영자 또는 정당한 권리자에게 귀속됩니다.",
          },
          {
            type: "p",
            text: "법령이 인정하는 경우를 제외하고, 무단 전재·복제·재배포·상업적 이용을 금지합니다.",
          },
          {
            type: "p",
            text: "인용 시에는 출처를 명기하고 저작권법의 범위 내에서 이용해 주세요.",
          },
        ],
      },
      {
        heading: "10. 개인정보처리방침의 변경",
        items: [
          {
            type: "p",
            text: "본 방침은 법령 개정이나 서비스 내용의 변경 등에 따라 예고 없이 변경될 수 있습니다.",
          },
          {
            type: "p",
            text: "변경된 개인정보처리방침은 본 페이지에 게재된 시점부터 효력이 발생합니다.",
          },
        ],
      },
      {
        heading: "11. 문의",
        items: [
          {
            type: "pLink",
            before: "본 사이트에 관한 문의는 ",
            linkText: "문의 양식",
            after: "을 이용해 주세요.",
          },
          {
            type: "p",
            text: "답변에 시간이 걸릴 수 있으니 미리 양해 부탁드립니다.",
          },
        ],
      },
      {
        heading: "12. 운영자",
        items: [
          {
            type: "ul",
            items: [
              "사이트명: Koitype",
              "운영자: Koitype 운영사무국",
              "문의: 사이트 내 문의 양식을 이용해 주세요.",
            ],
          },
        ],
      },
    ],
  },
  "zh-TW": {
    title: "隱私權政策",
    updated: "最後更新日期：2026年6月28日",
    intro:
      "本網站（以下簡稱「本站」）致力於保護使用者的個人資料，讓大家能夠安心使用。本政策說明本站對個人資料的處理方式。",
    sections: [
      {
        heading: "1. 個人資料的使用目的",
        items: [
          {
            type: "p",
            text: "使用本站聯絡表單時，您可能需要輸入姓名（包含暱稱）、電子郵件地址等個人資料。",
          },
          {
            type: "p",
            text: "所取得的個人資料僅用於回覆您的詢問及必要的聯絡事項，不會用於其他目的。",
          },
        ],
      },
      {
        heading: "2. 個人資料的第三方提供",
        items: [
          {
            type: "p",
            text: "所取得的個人資料，除以下情況外，不會提供給第三方。",
          },
          {
            type: "ul",
            items: [
              "當事人同意的情況",
              "依法令需要揭露的情況",
              "為保護人的生命、身體、財產所必要的情況",
            ],
          },
        ],
      },
      {
        heading: "3. Cookie（小型文字檔案）的使用",
        items: [
          {
            type: "p",
            text: "本站可能使用 Cookie 以提升使用者便利性、進行廣告投放及網站流量分析。",
          },
          {
            type: "p",
            text: "Cookie 是儲存在使用者瀏覽器中的小型資料檔案，不包含姓名或地址等可識別個人身分的資訊。",
          },
          {
            type: "p",
            text: "您可以在瀏覽器設定中停用 Cookie，但部分功能可能無法正常運作。",
          },
        ],
      },
      {
        heading: "4. 廣告投放",
        items: [
          {
            type: "p",
            text: "本站預計使用第三方廣告服務（如 Google AdSense）。",
          },
          {
            type: "p",
            text: "包含 Google 在內的第三方廣告業者可能使用 Cookie，根據您過去的瀏覽記錄顯示廣告。",
          },
          {
            type: "p",
            text: "Google 透過廣告 Cookie，得以根據您的興趣顯示相關廣告。",
          },
          {
            type: "p",
            text: "您可以透過 Google 的廣告設定停用個人化廣告。",
          },
          {
            type: "p",
            text: "若想停用第三方廣告業者的 Cookie，請使用各業者提供的選擇退出頁面。",
          },
        ],
      },
      {
        heading: "5. 聯盟行銷計畫",
        items: [
          {
            type: "p",
            text: "本站可能參與聯盟行銷計畫。",
          },
          {
            type: "p",
            text: "所介紹的商品及服務並非由本站銷售，而是直接與各販售商或提供商簽約。",
          },
          {
            type: "p",
            text: "商品購買方式及詳細資訊，請查閱連結的販售商頁面。",
          },
          {
            type: "p",
            text: "商品及服務的相關詢問，請直接聯絡各販售商。",
          },
        ],
      },
      {
        heading: "6. 網站流量分析工具",
        items: [
          {
            type: "p",
            text: "本站可能使用 Google Analytics 等流量分析工具。",
          },
          {
            type: "p",
            text: "這些工具使用 Cookie 收集流量資料。",
          },
          {
            type: "p",
            text: "收集的資料為匿名資料，不會識別個人身分。",
          },
          {
            type: "p",
            text: "停用 Cookie 即可拒絕資料收集。",
          },
        ],
      },
      {
        heading: "7. 留言與投稿",
        items: [
          {
            type: "p",
            text: "本站可能刊登使用者投稿的留言及診斷相關內容。",
          },
          {
            type: "p",
            text: "違反法令或公序良俗的內容、誹謗第三方的內容，或其他經營者認為不當的內容，可能在不另行通知的情況下予以刪除。",
          },
        ],
      },
      {
        heading: "8. 免責聲明",
        items: [
          {
            type: "p",
            text: "本站雖盡力提供準確的資訊，但不保證其正確性、安全性或實用性。",
          },
          {
            type: "p",
            text: "因使用本站資訊所產生的損害，本站概不負責。",
          },
          {
            type: "p",
            text: "對於連結外部網站的資訊或服務，本站亦不負任何責任。",
          },
          {
            type: "p",
            text: "本站的戀愛診斷、心理測驗、性格診斷等內容僅供娛樂目的，不構成醫學、心理學或專業診斷。",
          },
        ],
      },
      {
        heading: "9. 著作權",
        items: [
          {
            type: "p",
            text: "本站所有文章、圖片、插圖、標誌、設計、診斷內容等的著作權，歸屬於經營者或合法權利人。",
          },
          {
            type: "p",
            text: "除法令許可的情況外，禁止未經授權轉載、複製、再散布或商業使用。",
          },
          {
            type: "p",
            text: "引用時請註明來源，並在著作權法允許的範圍內使用。",
          },
        ],
      },
      {
        heading: "10. 隱私權政策的變更",
        items: [
          {
            type: "p",
            text: "本政策可能因應法令修訂或服務內容變更，在不另行通知的情況下予以修改。",
          },
          {
            type: "p",
            text: "修改後的隱私權政策自刊登於本頁面起生效。",
          },
        ],
      },
      {
        heading: "11. 聯絡方式",
        items: [
          {
            type: "pLink",
            before: "關於本站的詢問，請透過",
            linkText: "聯絡表單",
            after: "提出。",
          },
          {
            type: "p",
            text: "回覆可能需要一些時間，敬請見諒。",
          },
        ],
      },
      {
        heading: "12. 經營者",
        items: [
          {
            type: "ul",
            items: [
              "網站名稱：Koitype",
              "經營者：Koitype 營運事務局",
              "詢問：請使用站內聯絡表單。",
            ],
          },
        ],
      },
    ],
  },
  "zh-CN": {
    title: "隐私政策",
    updated: "最后更新日期：2026年6月28日",
    intro:
      "本网站（以下简称「本站」）致力于保护用户的个人信息，让大家能够放心使用。本政策说明本站对个人信息的处理方式。",
    sections: [
      {
        heading: "1. 个人信息的使用目的",
        items: [
          {
            type: "p",
            text: "使用本站联系表单时，您可能需要输入姓名（包含昵称）、电子邮件地址等个人信息。",
          },
          {
            type: "p",
            text: "所获取的个人信息仅用于回复您的咨询及必要的联络事项，不会用于其他目的。",
          },
        ],
      },
      {
        heading: "2. 个人信息的第三方提供",
        items: [
          {
            type: "p",
            text: "所获取的个人信息，除以下情况外，不会提供给第三方。",
          },
          {
            type: "ul",
            items: [
              "当事人同意的情况",
              "依法令需要披露的情况",
              "为保护人的生命、身体、财产所必要的情况",
            ],
          },
        ],
      },
      {
        heading: "3. Cookie（小型文本文件）的使用",
        items: [
          {
            type: "p",
            text: "本站可能使用 Cookie 以提升用户便利性、进行广告投放及网站流量分析。",
          },
          {
            type: "p",
            text: "Cookie 是存储在用户浏览器中的小型数据文件，不包含姓名或地址等可识别个人身份的信息。",
          },
          {
            type: "p",
            text: "您可以在浏览器设置中停用 Cookie，但部分功能可能无法正常运作。",
          },
        ],
      },
      {
        heading: "4. 广告投放",
        items: [
          {
            type: "p",
            text: "本站计划使用第三方广告服务（如 Google AdSense）。",
          },
          {
            type: "p",
            text: "包含 Google 在内的第三方广告商可能使用 Cookie，根据您过去的浏览记录展示广告。",
          },
          {
            type: "p",
            text: "Google 通过广告 Cookie，能够根据您的兴趣展示相关广告。",
          },
          {
            type: "p",
            text: "您可以通过 Google 的广告设置停用个性化广告。",
          },
          {
            type: "p",
            text: "若想停用第三方广告商的 Cookie，请使用各广告商提供的选择退出页面。",
          },
        ],
      },
      {
        heading: "5. 联盟营销计划",
        items: [
          {
            type: "p",
            text: "本站可能参与联盟营销计划。",
          },
          {
            type: "p",
            text: "所介绍的商品及服务并非由本站销售，而是直接与各销售商或提供商签约。",
          },
          {
            type: "p",
            text: "商品购买方式及详细信息，请查阅链接的销售商页面。",
          },
          {
            type: "p",
            text: "商品及服务的相关咨询，请直接联系各销售商。",
          },
        ],
      },
      {
        heading: "6. 网站流量分析工具",
        items: [
          {
            type: "p",
            text: "本站可能使用 Google Analytics 等流量分析工具。",
          },
          {
            type: "p",
            text: "这些工具使用 Cookie 收集流量数据。",
          },
          {
            type: "p",
            text: "收集的数据为匿名数据，不会识别个人身份。",
          },
          {
            type: "p",
            text: "停用 Cookie 即可拒绝数据收集。",
          },
        ],
      },
      {
        heading: "7. 评论与投稿",
        items: [
          {
            type: "p",
            text: "本站可能刊登用户投稿的评论及诊断相关内容。",
          },
          {
            type: "p",
            text: "违反法令或公序良俗的内容、诽谤第三方的内容，或其他经营者认为不当的内容，可能在不另行通知的情况下予以删除。",
          },
        ],
      },
      {
        heading: "8. 免责声明",
        items: [
          {
            type: "p",
            text: "本站虽尽力提供准确的信息，但不保证其正确性、安全性或实用性。",
          },
          {
            type: "p",
            text: "因使用本站信息所产生的损害，本站概不负责。",
          },
          {
            type: "p",
            text: "对于链接外部网站的信息或服务，本站亦不承担任何责任。",
          },
          {
            type: "p",
            text: "本站的恋爱诊断、心理测试、性格诊断等内容仅供娱乐目的，不构成医学、心理学或专业诊断。",
          },
        ],
      },
      {
        heading: "9. 著作权",
        items: [
          {
            type: "p",
            text: "本站所有文章、图片、插图、标志、设计、诊断内容等的著作权，归属于经营者或合法权利人。",
          },
          {
            type: "p",
            text: "除法令许可的情况外，禁止未经授权转载、复制、再分发或商业使用。",
          },
          {
            type: "p",
            text: "引用时请注明来源，并在著作权法允许的范围内使用。",
          },
        ],
      },
      {
        heading: "10. 隐私政策的变更",
        items: [
          {
            type: "p",
            text: "本政策可能因应法令修订或服务内容变更，在不另行通知的情况下予以修改。",
          },
          {
            type: "p",
            text: "修改后的隐私政策自刊登于本页面起生效。",
          },
        ],
      },
      {
        heading: "11. 联系方式",
        items: [
          {
            type: "pLink",
            before: "关于本站的咨询，请通过",
            linkText: "联系表单",
            after: "提交。",
          },
          {
            type: "p",
            text: "回复可能需要一些时间，敬请谅解。",
          },
        ],
      },
      {
        heading: "12. 经营者",
        items: [
          {
            type: "ul",
            items: [
              "网站名称：Koitype",
              "经营者：Koitype 运营事务局",
              "咨询：请使用站内联系表单。",
            ],
          },
        ],
      },
    ],
  },
};

export function getPrivacyPolicyContent(locale: Locale): PrivacyPolicyContent {
  return content[locale] ?? content.ja;
}
