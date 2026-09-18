import type { Locale } from "@/lib/i18n";

type ContentItem =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "pLink"; before: string; linkText: string; after: string }
  | {
      type: "extLink";
      before: string;
      linkText: string;
      href: string;
      after: string;
    };

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

// 外部リンク（各言語で共通）
const URL_GOOGLE_ADS_POLICY = "https://policies.google.com/technologies/ads";
const URL_MY_AD_CENTER = "https://myadcenter.google.com/";
const URL_ABOUT_ADS = "https://www.aboutads.info/choices/";
const URL_GA_OPTOUT = "https://tools.google.com/dlpage/gaoptout";
const URL_GOOGLE_PRIVACY = "https://policies.google.com/privacy";
const URL_FORMSPREE_PRIVACY = "https://formspree.io/legal/privacy-policy/";
const URL_VERCEL_PRIVACY = "https://vercel.com/legal/privacy-policy";
const URL_SUPABASE_PRIVACY = "https://supabase.com/privacy";
const URL_MICROCMS_PRIVACY = "https://microcms.io/privacy-policy";

const content: Record<Locale, PrivacyPolicyContent> = {
  ja: {
    title: "プライバシーポリシー",
    updated: "最終更新日：2026年9月18日",
    intro:
      "Koitype（以下「本サイト」）は、無料の恋愛診断・心理テストと恋愛コラムを提供するWebサイトです。本ポリシーでは、本サイトが実際に取得している情報、その利用目的、外部サービスへの送信、Cookieと広告の取り扱いについて説明します。",
    sections: [
      {
        heading: "1. 本サイトが取得する情報",
        items: [
          {
            type: "p",
            text: "本サイトは、会員登録を必要としません。閲覧するだけで氏名や住所などの個人情報を入力していただくことはありません。実際に取得している情報は次のとおりです。",
          },
          {
            type: "ul",
            items: [
              "お問い合わせフォームにご入力いただいた、お名前（ハンドルネームを含む）、メールアドレス、件名、お問い合わせ内容",
              "アクセス解析により自動的に収集される、閲覧ページ、参照元、おおまかな地域、ブラウザ・端末の種類などの統計情報",
              "広告配信・アクセス解析に使われるCookieおよび広告識別子",
              "サーバーのアクセスログ（IPアドレス、アクセス日時、ユーザーエージェント等）",
            ],
          },
          {
            type: "p",
            text: "アクセス解析・広告・アクセスログで扱う情報は、単体で特定の個人を識別することを目的としたものではありません。",
          },
        ],
      },
      {
        heading: "2. お問い合わせフォームの情報と外部送信について",
        items: [
          {
            type: "p",
            text: "お問い合わせフォームに入力された内容は、本サイトのサーバーを経由せず、メール転送サービス「Formspree」（Formspree, Inc.／米国）へ直接送信され、同社を通じて運営者に届きます。送信されるのは、お名前、メールアドレス、件名、お問い合わせ内容です。",
          },
          {
            type: "p",
            text: "取得した情報は、お問い合わせへの回答と、そのために必要なご連絡にのみ利用します。内容は対応に必要な期間保管し、不要になった時点で削除します。",
          },
          {
            type: "extLink",
            before: "Formspreeにおける情報の取り扱いについては、同社の",
            linkText: "プライバシーポリシー",
            href: URL_FORMSPREE_PRIVACY,
            after: "をご確認ください。",
          },
          {
            type: "p",
            text: "お問い合わせの際に、パスワード、クレジットカード番号、マイナンバーなどの機微な情報はご入力にならないでください。",
          },
        ],
      },
      {
        heading: "3. 診断・心理テストの回答の取り扱い",
        items: [
          {
            type: "p",
            text: "恋愛診断・心理テスト・恋みくじの設問への回答は、お使いのブラウザ内だけで処理され、本サイトのサーバーや外部サービスに送信・保存されることはありません。回答内容が運営者に届くこともありません。",
          },
          {
            type: "p",
            text: "診断結果を共有するためのURL（末尾に result= が付いたURL）には、判定されたタイプの識別子だけが含まれます。個々の設問にどう答えたかは含まれません。共有URLをSNS等に投稿すると、その結果タイプは公開されますのでご注意ください。",
          },
          {
            type: "p",
            text: "本サイトの診断・心理テストは、娯楽および自己理解のきっかけとして提供するものです。医学的・心理学的な検査ではなく、回答内容を健康状態や人格の評価に用いることはありません。",
          },
        ],
      },
      {
        heading: "4. Cookieと端末に保存される情報について",
        items: [
          {
            type: "p",
            text: "Cookieとは、ブラウザに保存される小さなデータファイルです。本サイトでは、広告配信とアクセス解析のためにCookieを利用しています。",
          },
          {
            type: "p",
            text: "また、利便性のために、次の情報をお使いの端末内（ローカルストレージ／セッションストレージ）に保存しています。これらは端末内にとどまり、運営者が読み取ることはできません。",
          },
          {
            type: "ul",
            items: [
              "表示言語の選択",
              "恋愛ブログのお気に入り記事",
              "同一セッション内で閲覧済みの記事（閲覧数の重複カウント防止用）",
            ],
          },
          {
            type: "p",
            text: "Cookieはブラウザの設定から無効にできます。無効にした場合でも診断や記事の閲覧はご利用いただけますが、一部の機能が正常に動作しないことがあります。",
          },
        ],
      },
      {
        heading: "5. 広告配信について（Google AdSense）",
        items: [
          {
            type: "p",
            text: "本サイトでは、第三者配信の広告サービスとしてGoogle AdSenseを利用しています。",
          },
          {
            type: "p",
            text: "Googleを含む第三者配信事業者は、Cookieを使用して、ユーザーが本サイトや他のウェブサイトに過去にアクセスした際の情報に基づいて広告を配信することがあります。",
          },
          {
            type: "p",
            text: "Googleが広告Cookieを使用することにより、Googleおよびそのパートナーは、ユーザーが本サイトや他のサイトにアクセスした際の情報に基づいて、適切な広告を表示できるようになります。",
          },
          {
            type: "extLink",
            before: "パーソナライズ広告は、",
            linkText: "Googleの広告設定",
            href: URL_MY_AD_CENTER,
            after: "からいつでも無効にできます。",
          },
          {
            type: "extLink",
            before: "また、Google以外の第三者配信事業者のCookieを無効にしたい場合は、",
            linkText: "aboutads.info のオプトアウトページ",
            href: URL_ABOUT_ADS,
            after: "をご利用ください。",
          },
          {
            type: "extLink",
            before: "Googleが広告においてデータをどのように扱うかについては、",
            linkText: "「Google のサービスを使用するサイトやアプリから収集した情報の Google による使用」",
            href: URL_GOOGLE_ADS_POLICY,
            after: "をご覧ください。",
          },
        ],
      },
      {
        heading: "6. アクセス解析について（Googleアナリティクス）",
        items: [
          {
            type: "p",
            text: "本サイトでは、利用状況を把握し改善に役立てるため、Googleアナリティクス4（GA4）を利用しています。GA4はCookieを利用して、閲覧ページや滞在時間などのトラフィックデータを収集します。",
          },
          {
            type: "p",
            text: "収集されるデータは統計的なもので、氏名やメールアドレスなど個人を直接特定する情報は含まれません。",
          },
          {
            type: "extLink",
            before: "Googleアナリティクスによるデータ収集を停止したい場合は、",
            linkText: "Googleアナリティクス オプトアウト アドオン",
            href: URL_GA_OPTOUT,
            after: "をご利用いただくか、ブラウザでCookieを無効にしてください。",
          },
          {
            type: "extLink",
            before: "Googleにおけるデータの取り扱いについては、",
            linkText: "Googleのプライバシーポリシー",
            href: URL_GOOGLE_PRIVACY,
            after: "をご確認ください。",
          },
        ],
      },
      {
        heading: "7. 欧州経済領域（EEA）・英国・スイスのユーザーの方へ",
        items: [
          {
            type: "p",
            text: "EEA・英国・スイスからアクセスされた場合、広告およびアクセス解析のためのCookieの使用について、Googleの認定同意管理プラットフォーム（CMP）を通じて同意を確認します。",
          },
          {
            type: "p",
            text: "同意をいただけない場合、パーソナライズ広告は配信されません（広告自体が表示されないか、パーソナライズされていない広告が表示されます）。同意の内容は、表示される同意メッセージからいつでも変更できます。",
          },
        ],
      },
      {
        heading: "8. 利用している外部サービス",
        items: [
          {
            type: "p",
            text: "本サイトの運営にあたり、次の外部サービスを利用しています。各サービスにおける情報の取り扱いは、それぞれのプライバシーポリシーに従います。",
          },
          {
            type: "extLink",
            before: "Vercel（ホスティング。アクセスログを含みます）／",
            linkText: "プライバシーポリシー",
            href: URL_VERCEL_PRIVACY,
            after: "",
          },
          {
            type: "extLink",
            before: "Google AdSense・Googleアナリティクス（広告配信とアクセス解析）／",
            linkText: "プライバシーポリシー",
            href: URL_GOOGLE_PRIVACY,
            after: "",
          },
          {
            type: "extLink",
            before: "Formspree（お問い合わせフォームの送信）／",
            linkText: "プライバシーポリシー",
            href: URL_FORMSPREE_PRIVACY,
            after: "",
          },
          {
            type: "extLink",
            before: "microCMS（恋愛ブログ記事の管理・配信。閲覧者の情報は扱いません）／",
            linkText: "プライバシーポリシー",
            href: URL_MICROCMS_PRIVACY,
            after: "",
          },
          {
            type: "extLink",
            before: "Supabase（記事ごとの閲覧数の保存。記事の識別子と回数のみで、閲覧者の情報は保存しません）／",
            linkText: "プライバシーポリシー",
            href: URL_SUPABASE_PRIVACY,
            after: "",
          },
        ],
      },
      {
        heading: "9. 個人情報の第三者提供",
        items: [
          {
            type: "p",
            text: "お問い合わせでお預かりした個人情報は、次の場合を除き、第三者へ提供することはありません。本ポリシー第2条・第8条に記載した、サービス提供のために必要な外部サービスへの送信は、この「第三者提供」には含みません。",
          },
          {
            type: "ul",
            items: [
              "ご本人の同意がある場合",
              "法令に基づき開示が必要な場合",
              "人の生命・身体・財産の保護のために必要であり、ご本人の同意を得ることが困難な場合",
            ],
          },
          {
            type: "p",
            text: "個人情報を販売したり、広告目的で第三者に提供したりすることはありません。",
          },
        ],
      },
      {
        heading: "10. 開示・訂正・削除のご請求",
        items: [
          {
            type: "pLink",
            before: "お預かりしている個人情報の開示・訂正・利用停止・削除をご希望の場合は、",
            linkText: "お問い合わせフォーム",
            after: "よりご連絡ください。ご本人からのご請求であることを確認のうえ、速やかに対応します。",
          },
          {
            type: "p",
            text: "記事や診断の内容に誤りを見つけられた場合も、同じ窓口でお知らせください。確認のうえ修正または削除を行います。",
          },
        ],
      },
      {
        heading: "11. 免責事項",
        items: [
          {
            type: "p",
            text: "本サイトに掲載する情報は、可能な限り正確な内容を提供するよう努めていますが、その正確性・安全性・有用性を保証するものではありません。",
          },
          {
            type: "p",
            text: "本サイトの恋愛診断・心理テスト・恋みくじ・コラムは、娯楽および自己理解のきっかけとして提供するものであり、医学的・心理学的・専門的な診断や助言ではありません。心身の不調や、ご自身または周囲の方の安全に関わる悩みについては、医療機関や公的な相談窓口にご相談ください。",
          },
          {
            type: "p",
            text: "本サイトの情報を利用したことによって生じた損害について、運営者は責任を負いかねます。また、リンク先サイトにおける情報・サービス等についても責任を負いかねます。",
          },
        ],
      },
      {
        heading: "12. 著作権",
        items: [
          {
            type: "p",
            text: "本サイトに掲載している文章・画像・イラスト・ロゴ・デザイン・診断コンテンツ等の著作権は、運営者または正当な権利者に帰属します。",
          },
          {
            type: "p",
            text: "法令で認められる場合を除き、無断転載・複製・再配布・商用利用を禁止します。引用を行う際は、引用元を明記し、著作権法の範囲内でご利用ください。",
          },
        ],
      },
      {
        heading: "13. 本ポリシーの変更",
        items: [
          {
            type: "p",
            text: "本ポリシーは、法令の改正や、利用する外部サービス・機能の変更に応じて改定することがあります。重要な変更を行った場合は、本ページの最終更新日を改めて掲載します。",
          },
        ],
      },
      {
        heading: "14. お問い合わせ・運営者",
        items: [
          {
            type: "ul",
            items: [
              "サイト名：Koitype（コイタイプ）",
              "URL：https://koitype.com",
              "運営者：Koitype運営事務局",
              "コンテンツの企画・制作：Koitype編集部",
            ],
          },
          {
            type: "pLink",
            before: "本ポリシーおよび本サイトに関するお問い合わせは、",
            linkText: "お問い合わせフォーム",
            after: "よりお願いいたします。返信にはお時間をいただく場合があります。",
          },
        ],
      },
    ],
  },

  en: {
    title: "Privacy Policy",
    updated: "Last updated: September 18, 2026",
    intro:
      "Koitype (the \"Site\") is a website offering free love-related quizzes, psychological tests and relationship articles. This policy explains what information the Site actually collects, how it is used, which external services it is sent to, and how cookies and advertising are handled.",
    sections: [
      {
        heading: "1. Information we collect",
        items: [
          {
            type: "p",
            text: "The Site does not require an account. Simply browsing it does not require you to enter your name, address or any other personal details. The information we actually collect is as follows.",
          },
          {
            type: "ul",
            items: [
              "Your name (including a nickname), email address, subject and message, when you use the contact form",
              "Statistical information collected automatically by analytics, such as pages viewed, referrer, approximate region, and browser/device type",
              "Cookies and advertising identifiers used for ad delivery and analytics",
              "Server access logs (IP address, access time, user agent, etc.)",
            ],
          },
          {
            type: "p",
            text: "The information handled by analytics, advertising and access logs is not used for the purpose of identifying a specific individual on its own.",
          },
        ],
      },
      {
        heading: "2. The contact form and transmission to an external service",
        items: [
          {
            type: "p",
            text: "Content submitted through the contact form is not routed through our own servers. It is sent directly to the email forwarding service Formspree (Formspree, Inc., USA), which then delivers it to the operator. The data sent consists of your name, email address, subject and message.",
          },
          {
            type: "p",
            text: "We use this information only to reply to your enquiry and to make any contact necessary for that purpose. It is retained for as long as needed to handle your enquiry and deleted once it is no longer required.",
          },
          {
            type: "extLink",
            before: "For how Formspree handles information, please see their ",
            linkText: "privacy policy",
            href: URL_FORMSPREE_PRIVACY,
            after: ".",
          },
          {
            type: "p",
            text: "Please do not include sensitive information such as passwords or credit card numbers in your enquiry.",
          },
        ],
      },
      {
        heading: "3. How quiz and test answers are handled",
        items: [
          {
            type: "p",
            text: "Your answers to the quizzes, psychological tests and Koi-mikuji are processed entirely within your browser. They are never sent to or stored on our servers or any external service, and they never reach the operator.",
          },
          {
            type: "p",
            text: "A result-sharing URL (one ending in result=) contains only the identifier of the result type. It does not contain how you answered each individual question. Please note that posting a shared URL on social media makes that result type public.",
          },
          {
            type: "p",
            text: "The quizzes and tests on this Site are offered for entertainment and as a starting point for self-reflection. They are not medical or psychological assessments, and answers are never used to evaluate health or personality.",
          },
        ],
      },
      {
        heading: "4. Cookies and data stored on your device",
        items: [
          {
            type: "p",
            text: "A cookie is a small data file stored in your browser. This Site uses cookies for advertising and analytics.",
          },
          {
            type: "p",
            text: "For convenience, the following is also stored on your own device (local storage / session storage). It stays on your device and cannot be read by the operator.",
          },
          {
            type: "ul",
            items: [
              "Your selected display language",
              "Articles you have favourited on the blog",
              "Articles already viewed in the current session (to avoid double-counting views)",
            ],
          },
          {
            type: "p",
            text: "You can disable cookies in your browser settings. You will still be able to take the quizzes and read the articles, but some features may not work correctly.",
          },
        ],
      },
      {
        heading: "5. Advertising (Google AdSense)",
        items: [
          {
            type: "p",
            text: "This Site uses Google AdSense, a third-party advertising service.",
          },
          {
            type: "p",
            text: "Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.",
          },
          {
            type: "p",
            text: "Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to this Site and/or other sites on the Internet.",
          },
          {
            type: "extLink",
            before: "You may opt out of personalised advertising at any time via ",
            linkText: "Google Ads Settings",
            href: URL_MY_AD_CENTER,
            after: ".",
          },
          {
            type: "extLink",
            before: "To opt out of cookies used by third-party vendors other than Google, please visit ",
            linkText: "the aboutads.info opt-out page",
            href: URL_ABOUT_ADS,
            after: ".",
          },
          {
            type: "extLink",
            before: "For how Google uses data in advertising, see ",
            linkText: "\"How Google uses information from sites or apps that use our services\"",
            href: URL_GOOGLE_ADS_POLICY,
            after: ".",
          },
        ],
      },
      {
        heading: "6. Analytics (Google Analytics)",
        items: [
          {
            type: "p",
            text: "This Site uses Google Analytics 4 (GA4) to understand how the Site is used and to improve it. GA4 uses cookies to collect traffic data such as pages viewed and time spent.",
          },
          {
            type: "p",
            text: "The data collected is statistical and does not include information that directly identifies you, such as your name or email address.",
          },
          {
            type: "extLink",
            before: "To stop data collection by Google Analytics, you can use the ",
            linkText: "Google Analytics Opt-out Browser Add-on",
            href: URL_GA_OPTOUT,
            after: " or disable cookies in your browser.",
          },
          {
            type: "extLink",
            before: "For how Google handles data, please see ",
            linkText: "Google's Privacy Policy",
            href: URL_GOOGLE_PRIVACY,
            after: ".",
          },
        ],
      },
      {
        heading: "7. Users in the EEA, UK and Switzerland",
        items: [
          {
            type: "p",
            text: "If you access the Site from the EEA, the UK or Switzerland, your consent to the use of cookies for advertising and analytics is obtained through a Google-certified Consent Management Platform (CMP).",
          },
          {
            type: "p",
            text: "Without your consent, no personalised advertising is served (you will see either no ads or non-personalised ads). You can change your choices at any time from the consent message.",
          },
        ],
      },
      {
        heading: "8. External services we use",
        items: [
          {
            type: "p",
            text: "The following external services are used to operate the Site. Information handled by each service is governed by its own privacy policy.",
          },
          {
            type: "extLink",
            before: "Vercel (hosting, including access logs) / ",
            linkText: "privacy policy",
            href: URL_VERCEL_PRIVACY,
            after: "",
          },
          {
            type: "extLink",
            before: "Google AdSense and Google Analytics (advertising and analytics) / ",
            linkText: "privacy policy",
            href: URL_GOOGLE_PRIVACY,
            after: "",
          },
          {
            type: "extLink",
            before: "Formspree (contact form delivery) / ",
            linkText: "privacy policy",
            href: URL_FORMSPREE_PRIVACY,
            after: "",
          },
          {
            type: "extLink",
            before: "microCMS (managing and delivering blog articles; handles no visitor data) / ",
            linkText: "privacy policy",
            href: URL_MICROCMS_PRIVACY,
            after: "",
          },
          {
            type: "extLink",
            before: "Supabase (storing per-article view counts; only the article identifier and a count, no visitor data) / ",
            linkText: "privacy policy",
            href: URL_SUPABASE_PRIVACY,
            after: "",
          },
        ],
      },
      {
        heading: "9. Disclosure to third parties",
        items: [
          {
            type: "p",
            text: "Personal information received through enquiries is not provided to third parties except in the following cases. Transmission to the external services described in sections 2 and 8, which is necessary to provide the service, is not treated as disclosure to a third party.",
          },
          {
            type: "ul",
            items: [
              "When you have given your consent",
              "When disclosure is required by law",
              "When it is necessary to protect someone's life, body or property and obtaining consent is difficult",
            ],
          },
          {
            type: "p",
            text: "We never sell personal information or provide it to third parties for advertising purposes.",
          },
        ],
      },
      {
        heading: "10. Access, correction and deletion",
        items: [
          {
            type: "pLink",
            before: "If you would like us to disclose, correct, suspend the use of, or delete the personal information we hold, please contact us via the ",
            linkText: "contact form",
            after: ". We will respond promptly once we have confirmed the request comes from you.",
          },
          {
            type: "p",
            text: "If you find an error in an article or a quiz, please use the same contact form. We will check it and correct or remove the content.",
          },
        ],
      },
      {
        heading: "11. Disclaimer",
        items: [
          {
            type: "p",
            text: "We make every effort to provide accurate information, but we do not guarantee its accuracy, safety or usefulness.",
          },
          {
            type: "p",
            text: "The quizzes, psychological tests, Koi-mikuji and articles on this Site are provided for entertainment and as a starting point for self-reflection. They are not medical, psychological or professional diagnoses or advice. For concerns about your physical or mental health, or the safety of yourself or others, please consult a medical institution or an official support service.",
          },
          {
            type: "p",
            text: "The operator accepts no liability for damages arising from use of the information on this Site, nor for information or services on linked sites.",
          },
        ],
      },
      {
        heading: "12. Copyright",
        items: [
          {
            type: "p",
            text: "Copyright in the text, images, illustrations, logos, design and quiz content published on this Site belongs to the operator or the rightful rights holder.",
          },
          {
            type: "p",
            text: "Except where permitted by law, reproduction, redistribution and commercial use without permission are prohibited. When quoting, please cite the source and stay within the limits of copyright law.",
          },
        ],
      },
      {
        heading: "13. Changes to this policy",
        items: [
          {
            type: "p",
            text: "This policy may be revised in response to changes in law or to the external services and features we use. When we make a significant change, we will update the last-updated date on this page.",
          },
        ],
      },
      {
        heading: "14. Contact and operator",
        items: [
          {
            type: "ul",
            items: [
              "Site name: Koitype",
              "URL: https://koitype.com",
              "Operator: Koitype Operations Office",
              "Content planning and production: Koitype Editorial Team",
            ],
          },
          {
            type: "pLink",
            before: "For enquiries about this policy or the Site, please use the ",
            linkText: "contact form",
            after: ". Please note that a reply may take some time.",
          },
        ],
      },
    ],
  },

  ko: {
    title: "개인정보처리방침",
    updated: "최종 업데이트: 2026년 9월 18일",
    intro:
      "Koitype(이하 '본 사이트')는 무료 연애 진단·심리 테스트와 연애 칼럼을 제공하는 웹사이트입니다. 본 방침에서는 본 사이트가 실제로 수집하는 정보, 이용 목적, 외부 서비스로의 전송, 쿠키와 광고의 취급에 대해 설명합니다.",
    sections: [
      {
        heading: "1. 수집하는 정보",
        items: [
          {
            type: "p",
            text: "본 사이트는 회원가입이 필요하지 않습니다. 열람만 하실 경우 이름이나 주소 등 개인정보를 입력하실 필요가 없습니다. 실제로 수집하는 정보는 다음과 같습니다.",
          },
          {
            type: "ul",
            items: [
              "문의 양식에 입력하신 이름(닉네임 포함), 이메일 주소, 제목, 문의 내용",
              "접속 분석을 통해 자동으로 수집되는 열람 페이지, 유입 경로, 대략적인 지역, 브라우저·기기 종류 등의 통계 정보",
              "광고 게재 및 접속 분석에 사용되는 쿠키와 광고 식별자",
              "서버 접속 로그(IP 주소, 접속 일시, 사용자 에이전트 등)",
            ],
          },
          {
            type: "p",
            text: "접속 분석·광고·접속 로그에서 다루는 정보는 그 자체로 특정 개인을 식별하는 것을 목적으로 하지 않습니다.",
          },
        ],
      },
      {
        heading: "2. 문의 양식의 정보와 외부 전송",
        items: [
          {
            type: "p",
            text: "문의 양식에 입력된 내용은 본 사이트의 서버를 경유하지 않고, 메일 전송 서비스 'Formspree'(Formspree, Inc. / 미국)로 직접 전송되어 운영자에게 전달됩니다. 전송되는 항목은 이름, 이메일 주소, 제목, 문의 내용입니다.",
          },
          {
            type: "p",
            text: "수집한 정보는 문의에 대한 답변과 그에 필요한 연락에만 이용합니다. 내용은 대응에 필요한 기간 동안 보관하고, 불필요해진 시점에 삭제합니다.",
          },
          {
            type: "extLink",
            before: "Formspree의 정보 취급에 대해서는 해당 사의 ",
            linkText: "개인정보처리방침",
            href: URL_FORMSPREE_PRIVACY,
            after: "을 확인해 주세요.",
          },
          {
            type: "p",
            text: "문의 시 비밀번호, 신용카드 번호 등 민감한 정보는 입력하지 말아 주세요.",
          },
        ],
      },
      {
        heading: "3. 진단·심리 테스트 답변의 취급",
        items: [
          {
            type: "p",
            text: "연애 진단·심리 테스트·연애 운세의 답변은 사용하시는 브라우저 안에서만 처리되며, 본 사이트의 서버나 외부 서비스로 전송·저장되지 않습니다. 답변 내용이 운영자에게 전달되는 일도 없습니다.",
          },
          {
            type: "p",
            text: "결과 공유용 URL(끝에 result= 가 붙은 URL)에는 판정된 유형의 식별자만 포함됩니다. 각 문항에 어떻게 답했는지는 포함되지 않습니다. 공유 URL을 SNS 등에 게시하면 해당 결과 유형이 공개되므로 유의해 주세요.",
          },
          {
            type: "p",
            text: "본 사이트의 진단·심리 테스트는 오락 및 자기 이해의 계기로 제공되는 것입니다. 의학적·심리학적 검사가 아니며, 답변 내용을 건강 상태나 인격 평가에 사용하지 않습니다.",
          },
        ],
      },
      {
        heading: "4. 쿠키와 기기에 저장되는 정보",
        items: [
          {
            type: "p",
            text: "쿠키란 브라우저에 저장되는 작은 데이터 파일입니다. 본 사이트에서는 광고 게재와 접속 분석을 위해 쿠키를 이용하고 있습니다.",
          },
          {
            type: "p",
            text: "또한 편의를 위해 다음 정보를 사용자의 기기 내(로컬 스토리지 / 세션 스토리지)에 저장합니다. 이는 기기 내에 머무르며 운영자가 읽을 수 없습니다.",
          },
          {
            type: "ul",
            items: [
              "표시 언어 선택",
              "연애 블로그의 즐겨찾기 기사",
              "동일 세션 내에서 열람한 기사(조회수 중복 집계 방지용)",
            ],
          },
          {
            type: "p",
            text: "쿠키는 브라우저 설정에서 비활성화할 수 있습니다. 비활성화해도 진단과 기사 열람은 이용하실 수 있지만, 일부 기능이 정상적으로 동작하지 않을 수 있습니다.",
          },
        ],
      },
      {
        heading: "5. 광고 게재에 대하여 (Google AdSense)",
        items: [
          {
            type: "p",
            text: "본 사이트에서는 제3자 광고 서비스인 Google AdSense를 이용하고 있습니다.",
          },
          {
            type: "p",
            text: "Google을 포함한 제3자 광고 사업자는 쿠키를 사용하여, 사용자가 본 사이트나 다른 웹사이트에 과거 방문한 정보를 바탕으로 광고를 게재하는 경우가 있습니다.",
          },
          {
            type: "p",
            text: "Google이 광고 쿠키를 사용함으로써, Google과 그 파트너는 사용자가 본 사이트나 다른 사이트를 방문했을 때의 정보를 바탕으로 적절한 광고를 표시할 수 있게 됩니다.",
          },
          {
            type: "extLink",
            before: "맞춤 광고는 ",
            linkText: "Google 광고 설정",
            href: URL_MY_AD_CENTER,
            after: "에서 언제든지 비활성화할 수 있습니다.",
          },
          {
            type: "extLink",
            before: "또한 Google 이외의 제3자 광고 사업자의 쿠키를 비활성화하려면 ",
            linkText: "aboutads.info 옵트아웃 페이지",
            href: URL_ABOUT_ADS,
            after: "를 이용해 주세요.",
          },
          {
            type: "extLink",
            before: "Google이 광고에서 데이터를 어떻게 다루는지에 대해서는 ",
            linkText: "'Google 서비스를 사용하는 사이트 및 앱에서 수집한 정보의 사용'",
            href: URL_GOOGLE_ADS_POLICY,
            after: "을 참고해 주세요.",
          },
        ],
      },
      {
        heading: "6. 접속 분석에 대하여 (Google 애널리틱스)",
        items: [
          {
            type: "p",
            text: "본 사이트에서는 이용 상황을 파악하고 개선에 활용하기 위해 Google 애널리틱스 4(GA4)를 이용하고 있습니다. GA4는 쿠키를 이용하여 열람 페이지와 체류 시간 등의 트래픽 데이터를 수집합니다.",
          },
          {
            type: "p",
            text: "수집되는 데이터는 통계적인 것으로, 이름이나 이메일 주소 등 개인을 직접 특정하는 정보는 포함되지 않습니다.",
          },
          {
            type: "extLink",
            before: "Google 애널리틱스의 데이터 수집을 중지하고 싶으신 경우 ",
            linkText: "Google 애널리틱스 옵트아웃 부가기능",
            href: URL_GA_OPTOUT,
            after: "을 이용하시거나 브라우저에서 쿠키를 비활성화해 주세요.",
          },
          {
            type: "extLink",
            before: "Google의 데이터 취급에 대해서는 ",
            linkText: "Google 개인정보처리방침",
            href: URL_GOOGLE_PRIVACY,
            after: "을 확인해 주세요.",
          },
        ],
      },
      {
        heading: "7. 유럽경제지역(EEA)·영국·스위스 사용자분들께",
        items: [
          {
            type: "p",
            text: "EEA·영국·스위스에서 접속하신 경우, 광고 및 접속 분석을 위한 쿠키 사용에 대해 Google 인증 동의 관리 플랫폼(CMP)을 통해 동의를 확인합니다.",
          },
          {
            type: "p",
            text: "동의하지 않으실 경우 맞춤 광고는 게재되지 않습니다(광고 자체가 표시되지 않거나 맞춤화되지 않은 광고가 표시됩니다). 동의 내용은 표시되는 동의 메시지에서 언제든지 변경하실 수 있습니다.",
          },
        ],
      },
      {
        heading: "8. 이용 중인 외부 서비스",
        items: [
          {
            type: "p",
            text: "본 사이트 운영에 있어 다음 외부 서비스를 이용하고 있습니다. 각 서비스에서의 정보 취급은 각각의 개인정보처리방침에 따릅니다.",
          },
          {
            type: "extLink",
            before: "Vercel(호스팅. 접속 로그 포함) / ",
            linkText: "개인정보처리방침",
            href: URL_VERCEL_PRIVACY,
            after: "",
          },
          {
            type: "extLink",
            before: "Google AdSense·Google 애널리틱스(광고 게재와 접속 분석) / ",
            linkText: "개인정보처리방침",
            href: URL_GOOGLE_PRIVACY,
            after: "",
          },
          {
            type: "extLink",
            before: "Formspree(문의 양식 전송) / ",
            linkText: "개인정보처리방침",
            href: URL_FORMSPREE_PRIVACY,
            after: "",
          },
          {
            type: "extLink",
            before: "microCMS(연애 블로그 기사 관리·배포. 열람자의 정보는 다루지 않습니다) / ",
            linkText: "개인정보처리방침",
            href: URL_MICROCMS_PRIVACY,
            after: "",
          },
          {
            type: "extLink",
            before: "Supabase(기사별 조회수 저장. 기사 식별자와 횟수만 저장하며 열람자 정보는 저장하지 않습니다) / ",
            linkText: "개인정보처리방침",
            href: URL_SUPABASE_PRIVACY,
            after: "",
          },
        ],
      },
      {
        heading: "9. 개인정보의 제3자 제공",
        items: [
          {
            type: "p",
            text: "문의를 통해 받은 개인정보는 다음의 경우를 제외하고 제3자에게 제공하지 않습니다. 본 방침 제2조·제8조에 기재한, 서비스 제공을 위해 필요한 외부 서비스로의 전송은 이 '제3자 제공'에 포함되지 않습니다.",
          },
          {
            type: "ul",
            items: [
              "본인의 동의가 있는 경우",
              "법령에 근거하여 공개가 필요한 경우",
              "사람의 생명·신체·재산 보호를 위해 필요하며 본인의 동의를 얻기 어려운 경우",
            ],
          },
          {
            type: "p",
            text: "개인정보를 판매하거나 광고 목적으로 제3자에게 제공하는 일은 없습니다.",
          },
        ],
      },
      {
        heading: "10. 열람·정정·삭제 요청",
        items: [
          {
            type: "pLink",
            before: "보관 중인 개인정보의 열람·정정·이용 정지·삭제를 원하시는 경우 ",
            linkText: "문의 양식",
            after: "을 통해 연락해 주세요. 본인의 요청임을 확인한 후 신속히 대응하겠습니다.",
          },
          {
            type: "p",
            text: "기사나 진단 내용에서 오류를 발견하신 경우에도 같은 창구로 알려 주세요. 확인 후 수정 또는 삭제하겠습니다.",
          },
        ],
      },
      {
        heading: "11. 면책사항",
        items: [
          {
            type: "p",
            text: "본 사이트에 게재하는 정보는 가능한 한 정확한 내용을 제공하도록 노력하고 있으나, 그 정확성·안전성·유용성을 보증하는 것은 아닙니다.",
          },
          {
            type: "p",
            text: "본 사이트의 연애 진단·심리 테스트·연애 운세·칼럼은 오락 및 자기 이해의 계기로 제공되는 것이며, 의학적·심리학적·전문적인 진단이나 조언이 아닙니다. 심신의 이상이나 본인 또는 주변 분의 안전에 관한 고민은 의료기관이나 공적 상담 창구에 상담해 주세요.",
          },
          {
            type: "p",
            text: "본 사이트의 정보를 이용함으로써 발생한 손해에 대해 운영자는 책임지지 않습니다. 또한 링크된 사이트의 정보·서비스 등에 대해서도 책임지지 않습니다.",
          },
        ],
      },
      {
        heading: "12. 저작권",
        items: [
          {
            type: "p",
            text: "본 사이트에 게재된 문장·이미지·일러스트·로고·디자인·진단 콘텐츠 등의 저작권은 운영자 또는 정당한 권리자에게 귀속됩니다.",
          },
          {
            type: "p",
            text: "법령에서 인정되는 경우를 제외하고 무단 전재·복제·재배포·상업적 이용을 금지합니다. 인용 시에는 출처를 명시하고 저작권법의 범위 내에서 이용해 주세요.",
          },
        ],
      },
      {
        heading: "13. 본 방침의 변경",
        items: [
          {
            type: "p",
            text: "본 방침은 법령 개정이나 이용하는 외부 서비스·기능의 변경에 따라 개정될 수 있습니다. 중요한 변경이 있을 경우 본 페이지의 최종 업데이트 날짜를 갱신합니다.",
          },
        ],
      },
      {
        heading: "14. 문의·운영자",
        items: [
          {
            type: "ul",
            items: [
              "사이트명: Koitype",
              "URL: https://koitype.com",
              "운영자: Koitype 운영사무국",
              "콘텐츠 기획·제작: Koitype 편집부",
            ],
          },
          {
            type: "pLink",
            before: "본 방침 및 본 사이트에 관한 문의는 ",
            linkText: "문의 양식",
            after: "을 이용해 주세요. 답변에는 시간이 걸릴 수 있습니다.",
          },
        ],
      },
    ],
  },

  "zh-TW": {
    title: "隱私權政策",
    updated: "最後更新日：2026年9月18日",
    intro:
      "Koitype（以下稱「本站」）是提供免費戀愛測驗、心理測驗與戀愛專欄的網站。本政策說明本站實際收集的資訊、使用目的、傳送至外部服務的情形，以及 Cookie 與廣告的處理方式。",
    sections: [
      {
        heading: "1. 本站收集的資訊",
        items: [
          {
            type: "p",
            text: "本站不需要註冊會員。僅瀏覽時無須輸入姓名或地址等個人資料。實際收集的資訊如下。",
          },
          {
            type: "ul",
            items: [
              "您在聯絡表單中輸入的姓名（含暱稱）、電子郵件地址、主旨與詢問內容",
              "由分析工具自動收集的瀏覽頁面、來源網站、大致地區、瀏覽器與裝置類型等統計資訊",
              "用於廣告投放與流量分析的 Cookie 及廣告識別碼",
              "伺服器存取紀錄（IP 位址、存取時間、使用者代理程式等）",
            ],
          },
          {
            type: "p",
            text: "流量分析、廣告與存取紀錄所處理的資訊，其目的並非單獨識別特定個人。",
          },
        ],
      },
      {
        heading: "2. 聯絡表單的資訊與外部傳送",
        items: [
          {
            type: "p",
            text: "透過聯絡表單輸入的內容不會經由本站伺服器，而是直接傳送至郵件轉寄服務「Formspree」（Formspree, Inc.／美國），再由該公司轉交營運者。傳送的項目為姓名、電子郵件地址、主旨與詢問內容。",
          },
          {
            type: "p",
            text: "所取得的資訊僅用於回覆您的詢問及為此所需的聯絡。內容保存至處理完成所需的期間，不再需要時即予刪除。",
          },
          {
            type: "extLink",
            before: "關於 Formspree 的資訊處理方式，請參閱該公司的",
            linkText: "隱私權政策",
            href: URL_FORMSPREE_PRIVACY,
            after: "。",
          },
          {
            type: "p",
            text: "詢問時請勿輸入密碼、信用卡號等敏感資訊。",
          },
        ],
      },
      {
        heading: "3. 測驗作答的處理方式",
        items: [
          {
            type: "p",
            text: "戀愛測驗、心理測驗與戀愛御籤的作答僅在您的瀏覽器內處理，不會傳送或儲存至本站伺服器或外部服務，也不會傳達給營運者。",
          },
          {
            type: "p",
            text: "結果分享用的網址（結尾含 result= 的網址）僅包含判定結果類型的識別碼，不包含您如何回答每一題。請注意，將分享網址發布至社群媒體會使該結果類型公開。",
          },
          {
            type: "p",
            text: "本站的測驗是為了娛樂與作為自我理解的契機而提供，並非醫學或心理學檢測，作答內容不會用於評估健康狀態或人格。",
          },
        ],
      },
      {
        heading: "4. Cookie 與儲存於裝置的資訊",
        items: [
          {
            type: "p",
            text: "Cookie 是儲存在瀏覽器中的小型資料檔案。本站為了廣告投放與流量分析而使用 Cookie。",
          },
          {
            type: "p",
            text: "此外，為提升便利性，下列資訊會儲存在您的裝置內（本機儲存空間／工作階段儲存空間）。這些資訊僅留存於您的裝置，營運者無法讀取。",
          },
          {
            type: "ul",
            items: [
              "顯示語言的選擇",
              "戀愛部落格的收藏文章",
              "同一工作階段內已瀏覽的文章（用於避免重複計算瀏覽次數）",
            ],
          },
          {
            type: "p",
            text: "您可於瀏覽器設定中停用 Cookie。停用後仍可使用測驗與閱讀文章，但部分功能可能無法正常運作。",
          },
        ],
      },
      {
        heading: "5. 關於廣告投放（Google AdSense）",
        items: [
          {
            type: "p",
            text: "本站使用第三方廣告服務 Google AdSense。",
          },
          {
            type: "p",
            text: "包含 Google 在內的第三方廣告供應商會使用 Cookie，根據使用者過去造訪本站或其他網站的資訊來放送廣告。",
          },
          {
            type: "p",
            text: "透過 Google 使用廣告 Cookie，Google 及其合作夥伴得以根據使用者造訪本站或其他網站的資訊，顯示合適的廣告。",
          },
          {
            type: "extLink",
            before: "您可隨時透過",
            linkText: "Google 廣告設定",
            href: URL_MY_AD_CENTER,
            after: "停用個人化廣告。",
          },
          {
            type: "extLink",
            before: "若想停用 Google 以外第三方廣告供應商的 Cookie，請使用",
            linkText: "aboutads.info 的停用頁面",
            href: URL_ABOUT_ADS,
            after: "。",
          },
          {
            type: "extLink",
            before: "關於 Google 在廣告中如何處理資料，請參閱",
            linkText: "「Google 如何使用來自採用 Google 服務的網站或應用程式的資訊」",
            href: URL_GOOGLE_ADS_POLICY,
            after: "。",
          },
        ],
      },
      {
        heading: "6. 關於流量分析（Google Analytics）",
        items: [
          {
            type: "p",
            text: "本站使用 Google Analytics 4（GA4）以掌握使用狀況並用於改善。GA4 使用 Cookie 收集瀏覽頁面、停留時間等流量資料。",
          },
          {
            type: "p",
            text: "所收集的資料為統計性質，不包含姓名或電子郵件地址等可直接識別個人的資訊。",
          },
          {
            type: "extLink",
            before: "若想停止 Google Analytics 的資料收集，可使用",
            linkText: "Google Analytics 停用瀏覽器外掛程式",
            href: URL_GA_OPTOUT,
            after: "，或於瀏覽器停用 Cookie。",
          },
          {
            type: "extLink",
            before: "關於 Google 的資料處理方式，請參閱",
            linkText: "Google 隱私權政策",
            href: URL_GOOGLE_PRIVACY,
            after: "。",
          },
        ],
      },
      {
        heading: "7. 致歐洲經濟區（EEA）、英國與瑞士的使用者",
        items: [
          {
            type: "p",
            text: "若您從 EEA、英國或瑞士連線，本站會透過 Google 認證的同意管理平台（CMP）取得您對廣告與流量分析 Cookie 使用的同意。",
          },
          {
            type: "p",
            text: "未獲得您的同意時，將不會放送個人化廣告（可能不顯示廣告，或顯示非個人化廣告）。您可隨時透過同意訊息變更您的選擇。",
          },
        ],
      },
      {
        heading: "8. 本站使用的外部服務",
        items: [
          {
            type: "p",
            text: "本站營運使用下列外部服務。各服務的資訊處理方式依其各自的隱私權政策辦理。",
          },
          {
            type: "extLink",
            before: "Vercel（主機代管，含存取紀錄）／",
            linkText: "隱私權政策",
            href: URL_VERCEL_PRIVACY,
            after: "",
          },
          {
            type: "extLink",
            before: "Google AdSense、Google Analytics（廣告投放與流量分析）／",
            linkText: "隱私權政策",
            href: URL_GOOGLE_PRIVACY,
            after: "",
          },
          {
            type: "extLink",
            before: "Formspree（聯絡表單的傳送）／",
            linkText: "隱私權政策",
            href: URL_FORMSPREE_PRIVACY,
            after: "",
          },
          {
            type: "extLink",
            before: "microCMS（戀愛部落格文章的管理與發布，不處理瀏覽者資訊）／",
            linkText: "隱私權政策",
            href: URL_MICROCMS_PRIVACY,
            after: "",
          },
          {
            type: "extLink",
            before: "Supabase（各篇文章瀏覽次數的儲存，僅儲存文章識別碼與次數，不儲存瀏覽者資訊）／",
            linkText: "隱私權政策",
            href: URL_SUPABASE_PRIVACY,
            after: "",
          },
        ],
      },
      {
        heading: "9. 個人資料的第三方提供",
        items: [
          {
            type: "p",
            text: "透過詢問所取得的個人資料，除下列情形外不會提供給第三方。本政策第2條與第8條所述、為提供服務所必需的外部服務傳送，不屬於此處的「第三方提供」。",
          },
          {
            type: "ul",
            items: [
              "取得本人同意時",
              "依法令需要揭露時",
              "為保護人的生命、身體或財產所必需，且難以取得本人同意時",
            ],
          },
          {
            type: "p",
            text: "本站絕不販售個人資料，也不會為廣告目的提供給第三方。",
          },
        ],
      },
      {
        heading: "10. 查詢、更正與刪除的請求",
        items: [
          {
            type: "pLink",
            before: "若您希望查詢、更正、停止使用或刪除本站保存的個人資料，請透過",
            linkText: "聯絡表單",
            after: "與我們聯繫。確認為本人請求後，我們將儘速處理。",
          },
          {
            type: "p",
            text: "若您在文章或測驗內容中發現錯誤，也請透過同一窗口告知。我們會確認後進行修正或刪除。",
          },
        ],
      },
      {
        heading: "11. 免責聲明",
        items: [
          {
            type: "p",
            text: "本站刊載的資訊力求正確，但不保證其正確性、安全性或實用性。",
          },
          {
            type: "p",
            text: "本站的戀愛測驗、心理測驗、戀愛御籤與專欄是為娛樂及自我理解的契機而提供，並非醫學、心理學或專業的診斷與建議。關於身心不適，或涉及您本人或周遭人士安全的煩惱，請諮詢醫療機構或公立諮詢窗口。",
          },
          {
            type: "p",
            text: "因使用本站資訊而產生的損害，營運者概不負責。對於連結網站的資訊與服務等亦不負責。",
          },
        ],
      },
      {
        heading: "12. 著作權",
        items: [
          {
            type: "p",
            text: "本站刊載的文章、圖片、插畫、標誌、設計與測驗內容等著作權，歸屬營運者或正當權利人所有。",
          },
          {
            type: "p",
            text: "除法令允許的情形外，禁止未經授權的轉載、複製、再散布與商業利用。引用時請註明出處，並於著作權法範圍內使用。",
          },
        ],
      },
      {
        heading: "13. 本政策的變更",
        items: [
          {
            type: "p",
            text: "本政策可能因法令修訂或本站所使用的外部服務與功能變更而修訂。進行重要變更時，將更新本頁的最後更新日期。",
          },
        ],
      },
      {
        heading: "14. 聯絡方式與營運者",
        items: [
          {
            type: "ul",
            items: [
              "網站名稱：Koitype",
              "網址：https://koitype.com",
              "營運者：Koitype 營運事務局",
              "內容企劃與製作：Koitype 編輯部",
            ],
          },
          {
            type: "pLink",
            before: "關於本政策及本站的詢問，請透過",
            linkText: "聯絡表單",
            after: "提出。回覆可能需要一些時間，敬請見諒。",
          },
        ],
      },
    ],
  },

  "zh-CN": {
    title: "隐私政策",
    updated: "最后更新日期：2026年9月18日",
    intro:
      "Koitype（以下称“本站”）是提供免费恋爱测试、心理测试与恋爱专栏的网站。本政策说明本站实际收集的信息、使用目的、向外部服务的传输，以及 Cookie 与广告的处理方式。",
    sections: [
      {
        heading: "1. 本站收集的信息",
        items: [
          {
            type: "p",
            text: "本站无需注册会员。仅浏览时无需输入姓名或地址等个人信息。实际收集的信息如下。",
          },
          {
            type: "ul",
            items: [
              "您在联系表单中填写的姓名（含昵称）、电子邮箱、主题与咨询内容",
              "由分析工具自动收集的浏览页面、来源网站、大致地区、浏览器与设备类型等统计信息",
              "用于广告投放与访问分析的 Cookie 及广告标识符",
              "服务器访问日志（IP 地址、访问时间、用户代理等）",
            ],
          },
          {
            type: "p",
            text: "访问分析、广告与访问日志所处理的信息，其目的并非单独识别特定个人。",
          },
        ],
      },
      {
        heading: "2. 联系表单的信息与外部传输",
        items: [
          {
            type: "p",
            text: "通过联系表单填写的内容不经由本站服务器，而是直接发送至邮件转发服务“Formspree”（Formspree, Inc./美国），再由该公司转交运营者。发送的项目为姓名、电子邮箱、主题与咨询内容。",
          },
          {
            type: "p",
            text: "所获取的信息仅用于回复您的咨询及为此所需的联络。内容保存至处理完成所需的期间，不再需要时即予删除。",
          },
          {
            type: "extLink",
            before: "关于 Formspree 的信息处理方式，请查阅该公司的",
            linkText: "隐私政策",
            href: URL_FORMSPREE_PRIVACY,
            after: "。",
          },
          {
            type: "p",
            text: "咨询时请勿填写密码、信用卡号等敏感信息。",
          },
        ],
      },
      {
        heading: "3. 测试作答的处理方式",
        items: [
          {
            type: "p",
            text: "恋爱测试、心理测试与恋爱签的作答仅在您的浏览器内处理，不会发送或保存至本站服务器或外部服务，也不会传达给运营者。",
          },
          {
            type: "p",
            text: "结果分享用的网址（结尾含 result= 的网址）仅包含判定结果类型的标识符，不包含您如何回答每一道题。请注意，将分享网址发布至社交媒体会使该结果类型公开。",
          },
          {
            type: "p",
            text: "本站的测试是为了娱乐与作为自我理解的契机而提供，并非医学或心理学检测，作答内容不会用于评估健康状况或人格。",
          },
        ],
      },
      {
        heading: "4. Cookie 与保存在设备上的信息",
        items: [
          {
            type: "p",
            text: "Cookie 是保存在浏览器中的小型数据文件。本站为了广告投放与访问分析而使用 Cookie。",
          },
          {
            type: "p",
            text: "此外，为提升便利性，下列信息会保存在您的设备内（本地存储／会话存储）。这些信息仅留存于您的设备，运营者无法读取。",
          },
          {
            type: "ul",
            items: [
              "显示语言的选择",
              "恋爱博客的收藏文章",
              "同一会话内已浏览的文章（用于避免重复计算浏览次数）",
            ],
          },
          {
            type: "p",
            text: "您可在浏览器设置中停用 Cookie。停用后仍可使用测试与阅读文章，但部分功能可能无法正常运行。",
          },
        ],
      },
      {
        heading: "5. 关于广告投放（Google AdSense）",
        items: [
          {
            type: "p",
            text: "本站使用第三方广告服务 Google AdSense。",
          },
          {
            type: "p",
            text: "包括 Google 在内的第三方广告供应商会使用 Cookie，根据用户过去访问本站或其他网站的信息来投放广告。",
          },
          {
            type: "p",
            text: "通过 Google 使用广告 Cookie，Google 及其合作伙伴得以根据用户访问本站或其他网站的信息，显示合适的广告。",
          },
          {
            type: "extLink",
            before: "您可随时通过",
            linkText: "Google 广告设置",
            href: URL_MY_AD_CENTER,
            after: "停用个性化广告。",
          },
          {
            type: "extLink",
            before: "若想停用 Google 以外第三方广告供应商的 Cookie，请使用",
            linkText: "aboutads.info 的停用页面",
            href: URL_ABOUT_ADS,
            after: "。",
          },
          {
            type: "extLink",
            before: "关于 Google 在广告中如何处理数据，请参阅",
            linkText: "“Google 如何使用来自采用 Google 服务的网站或应用的信息”",
            href: URL_GOOGLE_ADS_POLICY,
            after: "。",
          },
        ],
      },
      {
        heading: "6. 关于访问分析（Google Analytics）",
        items: [
          {
            type: "p",
            text: "本站使用 Google Analytics 4（GA4）以掌握使用情况并用于改进。GA4 使用 Cookie 收集浏览页面、停留时间等流量数据。",
          },
          {
            type: "p",
            text: "所收集的数据为统计性质，不包含姓名或电子邮箱等可直接识别个人的信息。",
          },
          {
            type: "extLink",
            before: "若想停止 Google Analytics 的数据收集，可使用",
            linkText: "Google Analytics 停用浏览器插件",
            href: URL_GA_OPTOUT,
            after: "，或在浏览器中停用 Cookie。",
          },
          {
            type: "extLink",
            before: "关于 Google 的数据处理方式，请查阅",
            linkText: "Google 隐私政策",
            href: URL_GOOGLE_PRIVACY,
            after: "。",
          },
        ],
      },
      {
        heading: "7. 致欧洲经济区（EEA）、英国与瑞士的用户",
        items: [
          {
            type: "p",
            text: "若您从 EEA、英国或瑞士访问，本站会通过 Google 认证的同意管理平台（CMP）获取您对广告与访问分析 Cookie 使用的同意。",
          },
          {
            type: "p",
            text: "未获得您的同意时，将不会投放个性化广告（可能不显示广告，或显示非个性化广告）。您可随时通过同意消息更改您的选择。",
          },
        ],
      },
      {
        heading: "8. 本站使用的外部服务",
        items: [
          {
            type: "p",
            text: "本站运营使用下列外部服务。各服务的信息处理方式依其各自的隐私政策执行。",
          },
          {
            type: "extLink",
            before: "Vercel（托管，含访问日志）／",
            linkText: "隐私政策",
            href: URL_VERCEL_PRIVACY,
            after: "",
          },
          {
            type: "extLink",
            before: "Google AdSense、Google Analytics（广告投放与访问分析）／",
            linkText: "隐私政策",
            href: URL_GOOGLE_PRIVACY,
            after: "",
          },
          {
            type: "extLink",
            before: "Formspree（联系表单的发送）／",
            linkText: "隐私政策",
            href: URL_FORMSPREE_PRIVACY,
            after: "",
          },
          {
            type: "extLink",
            before: "microCMS（恋爱博客文章的管理与分发，不处理浏览者信息）／",
            linkText: "隐私政策",
            href: URL_MICROCMS_PRIVACY,
            after: "",
          },
          {
            type: "extLink",
            before: "Supabase（各篇文章浏览次数的保存，仅保存文章标识符与次数，不保存浏览者信息）／",
            linkText: "隐私政策",
            href: URL_SUPABASE_PRIVACY,
            after: "",
          },
        ],
      },
      {
        heading: "9. 个人信息的第三方提供",
        items: [
          {
            type: "p",
            text: "通过咨询获取的个人信息，除下列情形外不会提供给第三方。本政策第2条与第8条所述、为提供服务所必需的外部服务传输，不属于此处的“第三方提供”。",
          },
          {
            type: "ul",
            items: [
              "获得本人同意时",
              "依法律法规需要披露时",
              "为保护人的生命、身体或财产所必需，且难以取得本人同意时",
            ],
          },
          {
            type: "p",
            text: "本站绝不出售个人信息，也不会为广告目的提供给第三方。",
          },
        ],
      },
      {
        heading: "10. 查询、更正与删除的请求",
        items: [
          {
            type: "pLink",
            before: "若您希望查询、更正、停止使用或删除本站保存的个人信息，请通过",
            linkText: "联系表单",
            after: "与我们联系。确认为本人请求后，我们将尽快处理。",
          },
          {
            type: "p",
            text: "若您在文章或测试内容中发现错误，也请通过同一窗口告知。我们会确认后进行修正或删除。",
          },
        ],
      },
      {
        heading: "11. 免责声明",
        items: [
          {
            type: "p",
            text: "本站刊载的信息力求准确，但不保证其准确性、安全性或实用性。",
          },
          {
            type: "p",
            text: "本站的恋爱测试、心理测试、恋爱签与专栏是为娱乐及自我理解的契机而提供，并非医学、心理学或专业的诊断与建议。关于身心不适，或涉及您本人或周围人士安全的烦恼，请咨询医疗机构或公共咨询窗口。",
          },
          {
            type: "p",
            text: "因使用本站信息而产生的损害，运营者概不负责。对于链接网站的信息与服务等亦不负责。",
          },
        ],
      },
      {
        heading: "12. 著作权",
        items: [
          {
            type: "p",
            text: "本站刊载的文章、图片、插画、标志、设计与测试内容等著作权，归属运营者或正当权利人所有。",
          },
          {
            type: "p",
            text: "除法律法规允许的情形外，禁止未经授权的转载、复制、再分发与商业利用。引用时请注明出处，并在著作权法范围内使用。",
          },
        ],
      },
      {
        heading: "13. 本政策的变更",
        items: [
          {
            type: "p",
            text: "本政策可能因法律法规修订或本站所使用的外部服务与功能变更而修订。进行重要变更时，将更新本页的最后更新日期。",
          },
        ],
      },
      {
        heading: "14. 联系方式与运营者",
        items: [
          {
            type: "ul",
            items: [
              "网站名称：Koitype",
              "网址：https://koitype.com",
              "运营者：Koitype 运营事务局",
              "内容策划与制作：Koitype 编辑部",
            ],
          },
          {
            type: "pLink",
            before: "关于本政策及本站的咨询，请通过",
            linkText: "联系表单",
            after: "提交。回复可能需要一些时间，敬请谅解。",
          },
        ],
      },
    ],
  },
};

export function getPrivacyPolicyContent(locale: Locale): PrivacyPolicyContent {
  return content[locale] ?? content.ja;
}
