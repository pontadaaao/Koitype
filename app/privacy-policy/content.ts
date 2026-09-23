import type { Locale } from "@/lib/i18n";

type ContentItem =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "pLink"; before: string; linkText: string; after: string }
  | {
      type: "intLink";
      before: string;
      linkText: string;
      href: string;
      after: string;
    }
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
// 個人情報保護委員会「外国制度（アメリカ合衆国）」
const URL_PPC_FOREIGN = "https://www.ppc.go.jp/enforcement/infoprovision/laws/offshore_report_america/";

const p = (text: string): ContentItem => ({ type: "p", text });
const ul = (...items: string[]): ContentItem => ({ type: "ul", items });
// お問い合わせフォーム（/contact）へのリンク付き段落
const contact = (before: string, linkText: string, after: string): ContentItem => ({
  type: "pLink",
  before,
  linkText,
  after,
});
const terms = (before: string, linkText: string, after: string): ContentItem => ({
  type: "intLink",
  before,
  linkText,
  href: "/terms",
  after,
});
const ext = (before: string, linkText: string, href: string, after = ""): ContentItem => ({
  type: "extLink",
  before,
  linkText,
  href,
  after,
});

const content: Record<Locale, PrivacyPolicyContent> = {
  ja: {
    title: "プライバシーポリシー",
    updated: "最終更新日：2026年9月23日",
    intro:
      "Koitype運営事務局（以下「運営者」）は、無料の恋愛診断・心理テストと恋愛コラムを提供するWebサイト「Koitype」（以下「本サイト」）での利用者の情報の取り扱いについて、個人情報の保護に関する法律（個人情報保護法）その他の関係法令を守り、次のとおりプライバシーポリシー（以下「本ポリシー」）を定めます。",
    sections: [
      {
        heading: "1. 本サイトが取得する情報",
        items: [
          p("本サイトは会員登録を必要としません。閲覧するだけで、氏名や住所などの個人情報を入力していただくことはありません。本サイトが取得する情報は次のとおりです。"),
          ul(
            "お問い合わせフォームに入力された、お名前（ハンドルネームを含む）、メールアドレス、件名、お問い合わせ内容",
            "アクセス解析により自動的に収集される、閲覧ページ、参照元、おおまかな地域、ブラウザ・端末の種類などの統計情報",
            "広告配信・アクセス解析に使われるCookieと広告識別子",
            "サーバーのアクセスログ（IPアドレス、アクセス日時、ユーザーエージェントなど）",
          ),
          p("アクセス解析・広告・アクセスログで扱う情報は、単体で特定の個人を識別することを目的としたものではありません。"),
        ],
      },
      {
        heading: "2. 利用目的",
        items: [
          p("取得した情報は、次の目的の範囲内で利用します。"),
          ul(
            "お問い合わせへの回答と、そのために必要な連絡",
            "本サイトの利用状況の分析と、コンテンツ・機能の改善",
            "広告の配信と効果測定",
            "記事の閲覧数の集計（人気記事の表示など）",
            "不正アクセスや迷惑行為の防止など、本サイトの安全な運営",
          ),
          p("利用目的を変更する場合は、変更前の目的と関連性があると合理的に認められる範囲で行い、本ページで公表します。"),
        ],
      },
      {
        heading: "3. お問い合わせフォームの情報",
        items: [
          p("お問い合わせフォームに入力された内容は、本サイトのサーバーを経由せず、フォーム送信サービス「Formspree」（Formspree, Inc.／米国）へ直接送信され、同社を通じて運営者に届きます。送信されるのは、お名前、メールアドレス、件名、お問い合わせ内容です。"),
          p("取得した情報は、お問い合わせへの回答と、そのために必要な連絡にのみ利用します。内容は対応に必要な期間だけ保管し、不要になった時点で削除します。"),
          ext("Formspreeでの情報の取り扱いについては、同社の", "プライバシーポリシー", URL_FORMSPREE_PRIVACY, "をご確認ください。"),
          p("お問い合わせの際に、パスワード、クレジットカード番号、マイナンバー、健康状態などの機微な情報は入力しないでください。"),
        ],
      },
      {
        heading: "4. 診断・心理テストの回答",
        items: [
          p("恋愛診断・心理テスト・恋みくじの設問への回答は、お使いのブラウザの中だけで処理され、本サイトのサーバーや外部サービスに送信・保存されることはありません。回答の内容が運営者に届くこともありません。"),
          p("診断結果を共有するためのURL（末尾に result= が付いたURL）には、判定されたタイプの識別子だけが含まれ、個々の設問への回答は含まれません。共有URLをSNSなどに投稿すると、その結果タイプは公開されますのでご注意ください。"),
          p("本サイトの診断・心理テストは、娯楽と自己理解のきっかけとして提供するものです。医学的・心理学的な検査ではなく、回答内容を健康状態や人格の評価に使うことはありません。"),
        ],
      },
      {
        heading: "5. Cookieと端末に保存される情報",
        items: [
          p("Cookieとは、ブラウザに保存される小さなデータファイルです。本サイトでは、広告配信とアクセス解析のためにCookieを利用しています。"),
          p("また、利便性のために、次の情報をお使いの端末内（ローカルストレージ／セッションストレージ）に保存しています。これらは端末の中にとどまり、運営者や外部サービスに送信されることはありません。"),
          ul(
            "表示言語の選択",
            "恋愛ブログのお気に入り記事",
            "診断を開いた回数（トップページの診断の並び順に使用）",
            "お知らせページを最後に見た日（新着お知らせの表示に使用）",
            "同じセッション内で閲覧済みの記事（閲覧数の重複カウントを防ぐため）",
          ),
          p("Cookieはブラウザの設定から無効にできます。端末に保存された情報は、ブラウザのサイトデータを削除すると消去されます。無効・削除した場合も診断や記事の閲覧はご利用いただけますが、一部の機能が正常に動作しないことがあります。"),
        ],
      },
      {
        heading: "6. 広告配信について（Google AdSense）",
        items: [
          p("本サイトでは、第三者配信の広告サービスとしてGoogle AdSenseを利用しています。"),
          p("Googleなどの第三者配信事業者は、Cookieを使用して、利用者が本サイトや他のウェブサイトに過去にアクセスした際の情報に基づいて広告を配信することがあります。"),
          p("Googleが広告Cookieを使用することにより、Googleとそのパートナーは、利用者が本サイトや他のサイトにアクセスした際の情報に基づいて、適切な広告を表示できるようになります。"),
          ext("パーソナライズ広告は、", "Googleの広告設定", URL_MY_AD_CENTER, "からいつでも無効にできます。"),
          ext("Google以外の第三者配信事業者のCookieを無効にしたい場合は、", "aboutads.info のオプトアウトページ", URL_ABOUT_ADS, "をご利用ください。"),
          ext("Googleが広告でデータをどのように扱うかについては、", "「Google のサービスを使用するサイトやアプリから収集した情報の Google による使用」", URL_GOOGLE_ADS_POLICY, "をご覧ください。"),
        ],
      },
      {
        heading: "7. アクセス解析について（Googleアナリティクス）",
        items: [
          p("本サイトでは、利用状況を把握して改善に役立てるため、Googleアナリティクス4（GA4）を利用しています。GA4はCookieを使って、閲覧ページや滞在時間などのトラフィックデータを収集します。"),
          p("収集されるデータは統計的なもので、氏名やメールアドレスなど、個人を直接特定する情報は含まれません。"),
          ext("Googleアナリティクスによるデータ収集を止めたい場合は、", "Googleアナリティクス オプトアウト アドオン", URL_GA_OPTOUT, "を利用するか、ブラウザでCookieを無効にしてください。"),
        ],
      },
      {
        heading: "8. 欧州経済領域（EEA）・英国・スイスの利用者の方へ",
        items: [
          p("Googleのポリシーにより、EEA・英国・スイスの利用者に対してパーソナライズ広告を配信するには、Cookieなどの使用について利用者の同意が必要です。これらの地域からアクセスされた場合、Googleの認定同意管理プラットフォーム（CMP）による同意メッセージが表示されることがあります。"),
          p("同意がない場合、パーソナライズ広告は配信されません（広告が表示されないか、パーソナライズされていない広告が表示されます）。同意メッセージから選択した内容は、いつでも変更できます。"),
        ],
      },
      {
        heading: "9. 利用者情報の外部送信について",
        items: [
          p("本サイトでは、ページの表示や機能の提供に伴い、利用者の端末から次の外部事業者へ情報が送信されます（電気通信事業法第27条の12に基づく公表事項です）。各事業者での情報の取り扱いは、それぞれのプライバシーポリシーに従います。"),
          ext("Google（Google LLC／米国）：広告配信（Google AdSense）とアクセス解析（Googleアナリティクス）のため、Cookie・広告識別子、閲覧ページのURL、参照元、IPアドレス、ブラウザ・端末の情報、閲覧日時などが送信されます。／", "プライバシーポリシー", URL_GOOGLE_PRIVACY),
          ext("Vercel（Vercel Inc.／米国）：本サイトのホスティングと配信のため、IPアドレス、アクセス日時、閲覧URL、ユーザーエージェントなどがアクセスログとして記録されます。／", "プライバシーポリシー", URL_VERCEL_PRIVACY),
          ext("Supabase（Supabase, Inc.／米国）：記事の閲覧数を集計するため、恋愛ブログの記事を開いたときに、その記事の識別子が送信されます。通信に伴いIPアドレスなどが同社に届きますが、本サイトが保存するのは記事ごとの閲覧回数だけです。／", "プライバシーポリシー", URL_SUPABASE_PRIVACY),
          ext("Formspree（Formspree, Inc.／米国）：お問い合わせフォームを送信したときだけ、入力内容（第3条）と、通信に伴うIPアドレスなどが送信されます。／", "プライバシーポリシー", URL_FORMSPREE_PRIVACY),
          ext("microCMS（株式会社microCMS／日本）：恋愛ブログ記事の管理に利用しています。記事は本サイトのサーバーから配信されるため、利用者の端末から同社へ情報が送信されることはありません。／", "プライバシーポリシー", URL_MICROCMS_PRIVACY),
          p("記事や診断結果のシェアボタン（X・LINE・Facebook）は、押したときに各サービスのページを開くリンクです。ボタンが表示されるだけで各社に情報が送信されることはありません。"),
        ],
      },
      {
        heading: "10. 外国にある事業者の利用",
        items: [
          p("第9条のとおり、本サイトが利用する外部サービスの一部（Google、Vercel、Supabase、Formspree）は米国の事業者であり、お問い合わせの内容を含む情報が米国などのサーバーで取り扱われることがあります。これらの事業者は、それぞれのプライバシーポリシーで、個人情報の保護のための措置を定めています。"),
          ext("米国の個人情報保護制度については、個人情報保護委員会が公表している", "「外国制度（アメリカ合衆国）」", URL_PPC_FOREIGN, "をご参照ください。"),
        ],
      },
      {
        heading: "11. 個人情報の第三者提供",
        items: [
          p("お問い合わせでお預かりした個人情報は、次の場合を除き、第三者へ提供しません。第3条・第9条に記載した、サービスの提供に必要な外部事業者への送信（業務の委託）は、ここでいう第三者提供には含みません。"),
          ul(
            "ご本人の同意がある場合",
            "法令に基づき開示が必要な場合",
            "人の生命・身体・財産の保護のために必要で、ご本人の同意を得ることが難しい場合",
          ),
          p("個人情報を販売したり、広告の目的で第三者に提供したりすることはありません。"),
        ],
      },
      {
        heading: "12. 安全管理",
        items: [
          p("運営者は、お問い合わせでお預かりした個人情報の漏えい・滅失・毀損を防ぎ、安全に管理するため、必要かつ適切な措置を講じるよう努めます。不要になった情報は、第3条のとおり削除します。"),
        ],
      },
      {
        heading: "13. 未成年の方へ",
        items: [
          p("本サイトの閲覧に年齢制限はありませんが、未成年の方がお問い合わせフォームで個人情報を送信する場合は、保護者の同意を得てから送信してください。"),
        ],
      },
      {
        heading: "14. 開示・訂正・利用停止・削除のご請求",
        items: [
          contact("お預かりしている個人情報の開示・訂正・利用停止・削除をご希望の場合は、", "お問い合わせフォーム", "からご連絡ください。ご本人からの請求であることを確認したうえで、速やかに対応します。本人確認のため、必要な範囲で追加の情報をお伺いすることがあります。"),
          p("記事や診断の内容の誤りに気づかれた場合も、同じ窓口からお知らせください。確認のうえ、修正または削除します。"),
        ],
      },
      {
        heading: "15. 免責事項・著作権",
        items: [
          p("本サイトの恋愛診断・心理テスト・恋みくじ・コラムは、娯楽と自己理解のきっかけとして提供するものであり、医学的・心理学的その他の専門的な診断や助言ではありません。心身の不調や、ご自身または周りの方の安全に関わる悩みは、医療機関や公的な相談窓口にご相談ください。"),
          terms("免責事項と、コンテンツの著作権・引用・リンクについては、", "利用規約", "をご覧ください。"),
        ],
      },
      {
        heading: "16. 本ポリシーの変更",
        items: [
          p("本ポリシーは、法令の改正や、利用する外部サービス・機能の変更に応じて改定することがあります。改定した場合は本ページに掲載し、最終更新日を更新します。重要な変更は、本サイト上でお知らせします。"),
        ],
      },
      {
        heading: "17. 運営者・お問い合わせ窓口",
        items: [
          ul(
            "サイト名：Koitype（コイタイプ）",
            "URL：https://koitype.com",
            "運営者：Koitype運営事務局",
            "コンテンツの企画・制作：Koitype編集部",
          ),
          contact("本ポリシーと本サイトに関するお問い合わせは、", "お問い合わせフォーム", "からお願いいたします。返信にお時間をいただく場合があります。"),
          p("本ポリシーは日本語版を正文とします。翻訳版と内容が異なる場合は、日本語版が優先します。"),
        ],
      },
    ],
  },

  en: {
    title: "Privacy Policy",
    updated: "Last updated: September 23, 2026",
    intro:
      "The Koitype Administration Office (\"the operator\") has established this Privacy Policy (\"this Policy\") for Koitype (\"this Site\"), a website offering free love quizzes, personality tests, and relationship columns. It explains how we handle information about users in compliance with Japan's Act on the Protection of Personal Information and other applicable laws.",
    sections: [
      {
        heading: "1. Information We Collect",
        items: [
          p("This Site does not require registration. You are never asked to enter personal information such as your name or address just to browse. We collect the following information:"),
          ul(
            "Your name (or nickname), email address, subject, and message when you use the contact form",
            "Statistical data collected automatically by analytics, such as pages viewed, referrers, approximate region, and browser and device type",
            "Cookies and advertising identifiers used for ad delivery and analytics",
            "Server access logs (IP address, access time, user agent, etc.)",
          ),
          p("Information handled for analytics, advertising, and access logs is not intended to identify any specific individual on its own."),
        ],
      },
      {
        heading: "2. Purposes of Use",
        items: [
          p("We use the information we collect only for the following purposes:"),
          ul(
            "Answering inquiries and contacting you as needed to do so",
            "Analyzing how this Site is used and improving its content and features",
            "Delivering ads and measuring their effectiveness",
            "Counting article views (for example, to show popular articles)",
            "Keeping this Site secure, including preventing unauthorized access and abuse",
          ),
          p("If we change these purposes, we will do so only within a scope reasonably related to the original purposes and will announce the change on this page."),
        ],
      },
      {
        heading: "3. Contact Form Information",
        items: [
          p("Information entered in the contact form does not pass through our servers. It is sent directly to Formspree (Formspree, Inc., USA), a form delivery service, which forwards it to the operator. The data sent is your name, email address, subject, and message."),
          p("We use this information only to answer your inquiry and contact you as needed to do so. We keep it only as long as needed to respond and delete it once it is no longer needed."),
          ext("For how Formspree handles information, please see its ", "Privacy Policy", URL_FORMSPREE_PRIVACY, "."),
          p("Please do not enter sensitive information such as passwords, credit card numbers, government ID numbers, or health information in the contact form."),
        ],
      },
      {
        heading: "4. Quiz and Test Answers",
        items: [
          p("Your answers to love quizzes, personality tests, and Koi-mikuji (love fortunes) are processed only within your browser. They are never sent to or stored on our servers or any external service, and the operator never receives them."),
          p("A result-sharing URL (one ending in result=) contains only an identifier for your result type, not your answers to individual questions. Please note that if you post a sharing URL on social media, your result type becomes public."),
          p("Our quizzes and tests are provided for entertainment and as a starting point for self-reflection. They are not medical or psychological assessments, and we never use your answers to evaluate your health or personality."),
        ],
      },
      {
        heading: "5. Cookies and Data Stored on Your Device",
        items: [
          p("Cookies are small data files stored in your browser. This Site uses cookies for ad delivery and analytics."),
          p("For convenience, we also store the following in your device's local storage or session storage. This data stays on your device and is never sent to the operator or any external service."),
          ul(
            "Your display language",
            "Your favorite love blog articles",
            "How many times you have opened each quiz (used to order quizzes on the home page)",
            "The date you last viewed the notices page (used to show new notices)",
            "Articles already viewed in the current session (to avoid counting the same view twice)",
          ),
          p("You can disable cookies in your browser settings, and clearing your browser's site data deletes the data stored on your device. You can still take quizzes and read articles if you do so, but some features may not work properly."),
        ],
      },
      {
        heading: "6. Advertising (Google AdSense)",
        items: [
          p("This Site uses Google AdSense, a third-party advertising service."),
          p("Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this Site or other websites."),
          p("Google's use of advertising cookies enables it and its partners to serve ads to users based on their visits to this Site and/or other sites on the Internet."),
          ext("You can opt out of personalized advertising at any time in ", "Google's Ad Settings", URL_MY_AD_CENTER, "."),
          ext("To opt out of cookies from third-party vendors other than Google, please visit ", "the aboutads.info opt-out page", URL_ABOUT_ADS, "."),
          ext("For how Google uses data in advertising, please see ", "\"How Google uses information from sites or apps that use our services\"", URL_GOOGLE_ADS_POLICY, "."),
        ],
      },
      {
        heading: "7. Analytics (Google Analytics)",
        items: [
          p("This Site uses Google Analytics 4 (GA4) to understand how the Site is used and to improve it. GA4 uses cookies to collect traffic data such as pages viewed and time spent on the Site."),
          p("The data collected is statistical and does not include information that directly identifies you, such as your name or email address."),
          ext("To stop Google Analytics from collecting data, please use the ", "Google Analytics Opt-out Browser Add-on", URL_GA_OPTOUT, " or disable cookies in your browser."),
        ],
      },
      {
        heading: "8. Users in the European Economic Area (EEA), the UK, and Switzerland",
        items: [
          p("Under Google's policies, personalized ads can be shown to users in the EEA, the UK, and Switzerland only with their consent to the use of cookies and similar technologies. If you access this Site from these regions, a consent message from a Google-certified consent management platform (CMP) may be displayed."),
          p("Without your consent, personalized ads will not be shown (either no ads or non-personalized ads will be displayed). You can change the choice you made in the consent message at any time."),
        ],
      },
      {
        heading: "9. Transmission of User Information to External Services",
        items: [
          p("When pages are displayed or features are used, information is sent from your device to the following external providers (this disclosure is made under Article 27-12 of Japan's Telecommunications Business Act). Each provider handles information according to its own privacy policy."),
          ext("Google (Google LLC, USA): for ad delivery (Google AdSense) and analytics (Google Analytics), cookies and advertising identifiers, page URLs, referrers, IP address, browser and device information, and access times are sent. / ", "Privacy Policy", URL_GOOGLE_PRIVACY),
          ext("Vercel (Vercel Inc., USA): for hosting and delivering this Site, IP address, access time, requested URL, user agent, and similar data are recorded as access logs. / ", "Privacy Policy", URL_VERCEL_PRIVACY),
          ext("Supabase (Supabase, Inc., USA): to count article views, the article's identifier is sent when you open a love blog article. Your IP address and similar data reach the provider as part of the connection, but this Site stores only the view count for each article. / ", "Privacy Policy", URL_SUPABASE_PRIVACY),
          ext("Formspree (Formspree, Inc., USA): only when you submit the contact form, the information you entered (see Section 3) and connection data such as your IP address are sent. / ", "Privacy Policy", URL_FORMSPREE_PRIVACY),
          ext("microCMS (microCMS, Inc., Japan): used to manage love blog articles. Articles are delivered from this Site's servers, so no information is sent from your device to this provider. / ", "Privacy Policy", URL_MICROCMS_PRIVACY),
          p("The share buttons for articles and results (X, LINE, Facebook) are links that open each service's page only when you tap them. Merely displaying the buttons does not send any information to those services."),
        ],
      },
      {
        heading: "10. Use of Providers Located Outside Japan",
        items: [
          p("As described in Section 9, some of the external services we use (Google, Vercel, Supabase, and Formspree) are US companies, and information, including contact form messages, may be processed on servers in the United States and elsewhere. Each of these providers sets out measures for protecting personal information in its privacy policy."),
          ext("For information on the personal information protection system in the United States, please see the ", "Foreign Systems (United States)", URL_PPC_FOREIGN, " page published by Japan's Personal Information Protection Commission (in Japanese)."),
        ],
      },
      {
        heading: "11. Disclosure of Personal Information to Third Parties",
        items: [
          p("We do not provide personal information received through inquiries to third parties except in the following cases. Transmissions to the external providers described in Sections 3 and 9, which are necessary to provide our services (entrustment), are not considered provision to third parties here."),
          ul(
            "When you have given consent",
            "When disclosure is required by law",
            "When necessary to protect a person's life, body, or property and it is difficult to obtain your consent",
          ),
          p("We never sell personal information or provide it to third parties for advertising purposes."),
        ],
      },
      {
        heading: "12. Security",
        items: [
          p("The operator strives to take necessary and appropriate measures to prevent the leakage, loss, or damage of personal information received through inquiries and to manage it securely. Information that is no longer needed is deleted as described in Section 3."),
        ],
      },
      {
        heading: "13. Minors",
        items: [
          p("There is no age restriction for browsing this Site, but if you are a minor, please obtain a parent's or guardian's consent before sending personal information through the contact form."),
        ],
      },
      {
        heading: "14. Requests for Disclosure, Correction, Suspension of Use, or Deletion",
        items: [
          contact("To request disclosure, correction, suspension of use, or deletion of personal information we hold about you, please contact us via our ", "contact form", ". We will respond promptly after confirming that the request comes from you. To verify your identity, we may ask for additional information to the extent necessary."),
          p("If you find an error in an article or quiz, please let us know through the same form. We will review it and correct or remove it."),
        ],
      },
      {
        heading: "15. Disclaimer and Copyright",
        items: [
          p("Our love quizzes, personality tests, Koi-mikuji, and columns are provided for entertainment and as a starting point for self-reflection, and are not medical, psychological, or other professional diagnoses or advice. For health concerns or worries involving your safety or that of people around you, please consult a medical institution or a public support service."),
          terms("For our disclaimer and for copyright, quotation, and linking rules, please see our ", "Terms of Use", "."),
        ],
      },
      {
        heading: "16. Changes to This Policy",
        items: [
          p("We may revise this Policy in response to changes in law or in the external services and features we use. When we do, we will post the revised Policy on this page and update the last-updated date. We will announce significant changes on this Site."),
        ],
      },
      {
        heading: "17. Operator and Contact",
        items: [
          ul(
            "Site name: Koitype",
            "URL: https://koitype.com",
            "Operator: Koitype Administration Office",
            "Content planning and production: Koitype Editorial Team",
          ),
          contact("For questions about this Policy or this Site, please use our ", "contact form", ". Please allow some time for a reply."),
          p("The Japanese version of this Policy is the original. If a translation differs from it, the Japanese version prevails."),
        ],
      },
    ],
  },

  ko: {
    title: "개인정보처리방침",
    updated: "최종 업데이트: 2026년 9월 23일",
    intro:
      "Koitype 운영사무국(이하 「운영자」)은 무료 연애 진단·심리 테스트와 연애 칼럼을 제공하는 웹사이트 「Koitype」(이하 「본 사이트」)에서의 이용자 정보 취급에 관하여, 일본 개인정보 보호에 관한 법률 및 기타 관계 법령을 준수하고 다음과 같이 개인정보처리방침(이하 「본 방침」)을 정합니다.",
    sections: [
      {
        heading: "1. 본 사이트가 수집하는 정보",
        items: [
          p("본 사이트는 회원가입이 필요하지 않습니다. 열람만으로 이름이나 주소 등 개인정보를 입력하실 일은 없습니다. 본 사이트가 수집하는 정보는 다음과 같습니다."),
          ul(
            "문의 양식에 입력하신 이름(닉네임 포함), 이메일 주소, 제목, 문의 내용",
            "접속 분석으로 자동 수집되는 열람 페이지, 유입 경로, 대략적인 지역, 브라우저·기기 종류 등의 통계 정보",
            "광고 게재·접속 분석에 사용되는 쿠키와 광고 식별자",
            "서버 접속 로그(IP 주소, 접속 일시, 사용자 에이전트 등)",
          ),
          p("접속 분석·광고·접속 로그에서 다루는 정보는 그 자체로 특정 개인을 식별하는 것을 목적으로 하지 않습니다."),
        ],
      },
      {
        heading: "2. 이용 목적",
        items: [
          p("수집한 정보는 다음 목적의 범위 안에서 이용합니다."),
          ul(
            "문의에 대한 답변과 이를 위해 필요한 연락",
            "본 사이트 이용 현황 분석과 콘텐츠·기능 개선",
            "광고 게재와 효과 측정",
            "기사 조회수 집계(인기 기사 표시 등)",
            "부정 접속이나 방해 행위 방지 등 본 사이트의 안전한 운영",
          ),
          p("이용 목적을 변경하는 경우, 변경 전 목적과 관련성이 있다고 합리적으로 인정되는 범위에서 하며 본 페이지에 공표합니다."),
        ],
      },
      {
        heading: "3. 문의 양식의 정보",
        items: [
          p("문의 양식에 입력하신 내용은 본 사이트의 서버를 거치지 않고 양식 전송 서비스 「Formspree」(Formspree, Inc./미국)로 직접 전송되며, 해당 회사를 통해 운영자에게 전달됩니다. 전송되는 정보는 이름, 이메일 주소, 제목, 문의 내용입니다."),
          p("수집한 정보는 문의에 대한 답변과 이를 위해 필요한 연락에만 이용합니다. 대응에 필요한 기간 동안만 보관하며, 필요 없어진 시점에 삭제합니다."),
          ext("Formspree의 정보 취급에 대해서는 해당 회사의 ", "개인정보처리방침", URL_FORMSPREE_PRIVACY, "을 확인해 주십시오."),
          p("문의 시 비밀번호, 신용카드 번호, 주민등록번호, 건강 상태 등 민감한 정보는 입력하지 마십시오."),
        ],
      },
      {
        heading: "4. 진단·심리 테스트의 답변",
        items: [
          p("연애 진단·심리 테스트·연애 제비뽑기의 문항에 대한 답변은 사용 중인 브라우저 안에서만 처리되며, 본 사이트의 서버나 외부 서비스로 전송·저장되지 않습니다. 답변 내용이 운영자에게 전달되는 일도 없습니다."),
          p("진단 결과 공유용 URL(끝에 result=가 붙은 URL)에는 판정된 유형의 식별자만 포함되며, 각 문항에 대한 답변은 포함되지 않습니다. 공유 URL을 SNS 등에 게시하면 그 결과 유형이 공개되므로 주의해 주십시오."),
          p("본 사이트의 진단·심리 테스트는 오락과 자기 이해의 계기로 제공하는 것입니다. 의학적·심리학적 검사가 아니며, 답변 내용을 건강 상태나 인격 평가에 이용하지 않습니다."),
        ],
      },
      {
        heading: "5. 쿠키와 기기에 저장되는 정보",
        items: [
          p("쿠키는 브라우저에 저장되는 작은 데이터 파일입니다. 본 사이트는 광고 게재와 접속 분석을 위해 쿠키를 이용합니다."),
          p("또한 편의를 위해 다음 정보를 사용 중인 기기(로컬 스토리지/세션 스토리지)에 저장합니다. 이 정보는 기기 안에만 머물며 운영자나 외부 서비스로 전송되지 않습니다."),
          ul(
            "표시 언어 선택",
            "연애 블로그 즐겨찾기 기사",
            "각 진단을 연 횟수(홈 화면의 진단 정렬 순서에 사용)",
            "알림 페이지를 마지막으로 본 날짜(새 알림 표시에 사용)",
            "같은 세션에서 이미 본 기사(조회수 중복 집계 방지용)",
          ),
          p("쿠키는 브라우저 설정에서 비활성화할 수 있으며, 브라우저의 사이트 데이터를 삭제하면 기기에 저장된 정보도 삭제됩니다. 이 경우에도 진단과 기사 열람은 이용할 수 있지만 일부 기능이 정상적으로 작동하지 않을 수 있습니다."),
        ],
      },
      {
        heading: "6. 광고 게재(Google AdSense)",
        items: [
          p("본 사이트는 제3자 광고 서비스인 Google AdSense를 이용하고 있습니다."),
          p("Google을 포함한 제3자 광고 사업자는 쿠키를 사용하여 이용자가 본 사이트나 다른 웹사이트를 과거에 방문했을 때의 정보를 바탕으로 광고를 게재할 수 있습니다."),
          p("Google은 광고 쿠키를 사용함으로써 Google과 그 파트너가 이용자의 본 사이트 및 다른 사이트 방문 정보를 바탕으로 적절한 광고를 표시할 수 있습니다."),
          ext("맞춤 광고는 ", "Google 광고 설정", URL_MY_AD_CENTER, "에서 언제든지 해제할 수 있습니다."),
          ext("Google 이외의 제3자 광고 사업자의 쿠키를 해제하려면 ", "aboutads.info 옵트아웃 페이지", URL_ABOUT_ADS, "를 이용해 주십시오."),
          ext("Google이 광고에서 데이터를 어떻게 다루는지에 대해서는 ", "「Google 서비스를 사용하는 사이트 또는 앱에서 수집한 정보를 Google이 사용하는 방법」", URL_GOOGLE_ADS_POLICY, "을 참조해 주십시오."),
        ],
      },
      {
        heading: "7. 접속 분석(Google 애널리틱스)",
        items: [
          p("본 사이트는 이용 현황을 파악하여 개선에 활용하기 위해 Google 애널리틱스 4(GA4)를 이용합니다. GA4는 쿠키를 사용하여 열람 페이지나 체류 시간 등의 트래픽 데이터를 수집합니다."),
          p("수집되는 데이터는 통계적인 것으로, 이름이나 이메일 주소 등 개인을 직접 특정하는 정보는 포함되지 않습니다."),
          ext("Google 애널리틱스의 데이터 수집을 중지하려면 ", "Google 애널리틱스 차단 브라우저 부가기능", URL_GA_OPTOUT, "을 이용하거나 브라우저에서 쿠키를 비활성화해 주십시오."),
        ],
      },
      {
        heading: "8. 유럽경제지역(EEA)·영국·스위스 이용자분께",
        items: [
          p("Google 정책에 따라 EEA·영국·스위스 이용자에게 맞춤 광고를 게재하려면 쿠키 등의 사용에 대한 이용자의 동의가 필요합니다. 이들 지역에서 접속하시는 경우 Google 인증 동의 관리 플랫폼(CMP)의 동의 메시지가 표시될 수 있습니다."),
          p("동의가 없으면 맞춤 광고는 게재되지 않습니다(광고가 표시되지 않거나 맞춤화되지 않은 광고가 표시됩니다). 동의 메시지에서 선택한 내용은 언제든지 변경할 수 있습니다."),
        ],
      },
      {
        heading: "9. 이용자 정보의 외부 전송",
        items: [
          p("본 사이트에서는 페이지 표시나 기능 제공에 따라 이용자의 기기에서 다음 외부 사업자에게 정보가 전송됩니다(일본 전기통신사업법 제27조의12에 따른 공표 사항입니다). 각 사업자의 정보 취급은 각각의 개인정보처리방침에 따릅니다."),
          ext("Google(Google LLC/미국): 광고 게재(Google AdSense)와 접속 분석(Google 애널리틱스)을 위해 쿠키·광고 식별자, 열람 페이지 URL, 유입 경로, IP 주소, 브라우저·기기 정보, 열람 일시 등이 전송됩니다. / ", "개인정보처리방침", URL_GOOGLE_PRIVACY),
          ext("Vercel(Vercel Inc./미국): 본 사이트의 호스팅과 전송을 위해 IP 주소, 접속 일시, 열람 URL, 사용자 에이전트 등이 접속 로그로 기록됩니다. / ", "개인정보처리방침", URL_VERCEL_PRIVACY),
          ext("Supabase(Supabase, Inc./미국): 기사 조회수 집계를 위해 연애 블로그 기사를 열 때 해당 기사의 식별자가 전송됩니다. 통신 과정에서 IP 주소 등이 해당 회사에 전달되지만, 본 사이트가 저장하는 것은 기사별 조회수뿐입니다. / ", "개인정보처리방침", URL_SUPABASE_PRIVACY),
          ext("Formspree(Formspree, Inc./미국): 문의 양식을 전송할 때만 입력 내용(제3조)과 통신에 따른 IP 주소 등이 전송됩니다. / ", "개인정보처리방침", URL_FORMSPREE_PRIVACY),
          ext("microCMS(주식회사 microCMS/일본): 연애 블로그 기사 관리에 이용합니다. 기사는 본 사이트의 서버에서 전송되므로 이용자의 기기에서 해당 회사로 정보가 전송되지 않습니다. / ", "개인정보처리방침", URL_MICROCMS_PRIVACY),
          p("기사나 진단 결과의 공유 버튼(X·LINE·Facebook)은 눌렀을 때 각 서비스의 페이지를 여는 링크입니다. 버튼이 표시되는 것만으로 각 회사에 정보가 전송되지는 않습니다."),
        ],
      },
      {
        heading: "10. 해외 사업자 이용",
        items: [
          p("제9조와 같이 본 사이트가 이용하는 외부 서비스 중 일부(Google, Vercel, Supabase, Formspree)는 미국 사업자이며, 문의 내용을 포함한 정보가 미국 등의 서버에서 처리될 수 있습니다. 이들 사업자는 각자의 개인정보처리방침에서 개인정보 보호를 위한 조치를 정하고 있습니다."),
          ext("미국의 개인정보 보호 제도에 대해서는 일본 개인정보보호위원회가 공표한 ", "「외국 제도(미국)」", URL_PPC_FOREIGN, "(일본어)를 참조해 주십시오."),
        ],
      },
      {
        heading: "11. 개인정보의 제3자 제공",
        items: [
          p("문의를 통해 받은 개인정보는 다음의 경우를 제외하고 제3자에게 제공하지 않습니다. 제3조·제9조에 기재한, 서비스 제공에 필요한 외부 사업자로의 전송(업무 위탁)은 여기서 말하는 제3자 제공에 포함되지 않습니다."),
          ul(
            "본인의 동의가 있는 경우",
            "법령에 따라 공개가 필요한 경우",
            "사람의 생명·신체·재산 보호를 위해 필요하며 본인의 동의를 얻기 어려운 경우",
          ),
          p("개인정보를 판매하거나 광고 목적으로 제3자에게 제공하는 일은 없습니다."),
        ],
      },
      {
        heading: "12. 안전 관리",
        items: [
          p("운영자는 문의를 통해 받은 개인정보의 유출·멸실·훼손을 방지하고 안전하게 관리하기 위해 필요하고 적절한 조치를 취하도록 노력합니다. 필요 없어진 정보는 제3조에 따라 삭제합니다."),
        ],
      },
      {
        heading: "13. 미성년자분께",
        items: [
          p("본 사이트 열람에는 연령 제한이 없지만, 미성년자가 문의 양식으로 개인정보를 보내는 경우에는 보호자의 동의를 얻은 후 보내 주십시오."),
        ],
      },
      {
        heading: "14. 공개·정정·이용 정지·삭제 요청",
        items: [
          contact("보관 중인 개인정보의 공개·정정·이용 정지·삭제를 원하시는 경우 ", "문의 양식", "으로 연락해 주십시오. 본인의 요청임을 확인한 후 신속하게 대응합니다. 본인 확인을 위해 필요한 범위에서 추가 정보를 여쭐 수 있습니다."),
          p("기사나 진단 내용의 오류를 발견하신 경우에도 같은 창구로 알려 주십시오. 확인 후 수정 또는 삭제합니다."),
        ],
      },
      {
        heading: "15. 면책 사항·저작권",
        items: [
          p("본 사이트의 연애 진단·심리 테스트·연애 제비뽑기·칼럼은 오락과 자기 이해의 계기로 제공하는 것이며, 의학적·심리학적 또는 기타 전문적인 진단이나 조언이 아닙니다. 심신의 불편이나 본인 또는 주변 사람의 안전에 관한 고민은 의료기관이나 공공 상담 창구에 상담해 주십시오."),
          terms("면책 사항과 콘텐츠의 저작권·인용·링크에 대해서는 ", "이용약관", "을 참조해 주십시오."),
        ],
      },
      {
        heading: "16. 본 방침의 변경",
        items: [
          p("본 방침은 법령 개정이나 이용하는 외부 서비스·기능의 변경에 따라 개정될 수 있습니다. 개정한 경우 본 페이지에 게재하고 최종 업데이트 날짜를 갱신합니다. 중요한 변경은 본 사이트에서 알려 드립니다."),
        ],
      },
      {
        heading: "17. 운영자·문의 창구",
        items: [
          ul(
            "사이트명: Koitype(코이타입)",
            "URL: https://koitype.com",
            "운영자: Koitype 운영사무국",
            "콘텐츠 기획·제작: Koitype 편집부",
          ),
          contact("본 방침과 본 사이트에 관한 문의는 ", "문의 양식", "으로 부탁드립니다. 답변에 시간이 걸릴 수 있습니다."),
          p("본 방침은 일본어판을 정본으로 합니다. 번역본과 내용이 다른 경우 일본어판이 우선합니다."),
        ],
      },
    ],
  },

  "zh-TW": {
    title: "隱私權政策",
    updated: "最後更新日：2026年9月23日",
    intro:
      "Koitype 營運事務局（以下簡稱「經營者」）就提供免費戀愛診斷、心理測驗及戀愛專欄的網站「Koitype」（以下簡稱「本網站」）中用戶資訊的處理，遵守日本《個人資料保護法》及其他相關法令，訂定本隱私權政策（以下簡稱「本政策」）如下。",
    sections: [
      {
        heading: "1. 本網站取得的資訊",
        items: [
          p("本網站無需註冊會員，僅瀏覽時不會要求您輸入姓名、地址等個人資料。本網站取得的資訊如下。"),
          ul(
            "您在聯絡表單中輸入的姓名（含暱稱）、電子郵件地址、主旨及洽詢內容",
            "透過流量分析自動收集的瀏覽頁面、來源網址、大致地區、瀏覽器及裝置類型等統計資訊",
            "用於廣告投放及流量分析的 Cookie 與廣告識別碼",
            "伺服器存取紀錄（IP 位址、存取時間、使用者代理程式等）",
          ),
          p("流量分析、廣告及存取紀錄所處理的資訊，並非以單獨識別特定個人為目的。"),
        ],
      },
      {
        heading: "2. 使用目的",
        items: [
          p("取得的資訊僅在下列目的範圍內使用。"),
          ul(
            "回覆洽詢及為此所需的聯絡",
            "分析本網站的使用狀況，並改善內容與功能",
            "投放廣告及衡量成效",
            "統計文章瀏覽次數（顯示熱門文章等）",
            "防止未經授權存取或騷擾行為等，確保本網站安全營運",
          ),
          p("變更使用目的時，將在與變更前目的具有合理關聯的範圍內進行，並於本頁公告。"),
        ],
      },
      {
        heading: "3. 聯絡表單的資訊",
        items: [
          p("您在聯絡表單中輸入的內容不經本網站伺服器，而是直接傳送至表單傳送服務「Formspree」（Formspree, Inc.／美國），再經由該公司送達經營者。傳送的資訊為姓名、電子郵件地址、主旨及洽詢內容。"),
          p("取得的資訊僅用於回覆洽詢及為此所需的聯絡。僅在處理所需期間內保存，不再需要時即予刪除。"),
          ext("關於 Formspree 的資訊處理，請參閱該公司的", "隱私權政策", URL_FORMSPREE_PRIVACY, "。"),
          p("洽詢時請勿輸入密碼、信用卡號碼、身分證字號、健康狀況等敏感資訊。"),
        ],
      },
      {
        heading: "4. 診斷與心理測驗的回答",
        items: [
          p("戀愛診斷、心理測驗及戀愛籤的題目回答，僅在您的瀏覽器中處理，不會傳送或儲存至本網站的伺服器或外部服務，也不會送達經營者。"),
          p("用於分享診斷結果的網址（結尾帶有 result= 的網址）僅包含判定類型的識別碼，不包含各題的回答。若將分享網址發布到社群網站等，該結果類型將會公開，敬請留意。"),
          p("本網站的診斷與心理測驗是作為娛樂及自我了解的契機而提供，並非醫學或心理學檢查，也不會將回答內容用於評估健康狀況或人格。"),
        ],
      },
      {
        heading: "5. Cookie 與儲存在裝置上的資訊",
        items: [
          p("Cookie 是儲存在瀏覽器中的小型資料檔案。本網站為投放廣告及流量分析而使用 Cookie。"),
          p("此外，為了方便使用，本網站會將下列資訊儲存在您的裝置中（本機儲存空間／工作階段儲存空間）。這些資訊只保留在裝置內，不會傳送至經營者或外部服務。"),
          ul(
            "顯示語言的選擇",
            "戀愛部落格的收藏文章",
            "開啟各項診斷的次數（用於首頁診斷的排列順序）",
            "最後一次查看通知頁面的日期（用於顯示新通知）",
            "同一工作階段內已瀏覽的文章（用於防止重複計算瀏覽次數）",
          ),
          p("您可以在瀏覽器設定中停用 Cookie；刪除瀏覽器的網站資料時，儲存在裝置上的資訊也會一併刪除。即使如此仍可使用診斷及閱讀文章，但部分功能可能無法正常運作。"),
        ],
      },
      {
        heading: "6. 廣告投放（Google AdSense）",
        items: [
          p("本網站使用第三方廣告服務 Google AdSense。"),
          p("包括 Google 在內的第三方廣告業者，可能會使用 Cookie，根據用戶過去造訪本網站或其他網站的資訊投放廣告。"),
          p("Google 透過使用廣告 Cookie，使 Google 及其合作夥伴能夠根據用戶造訪本網站或其他網站的資訊，顯示適當的廣告。"),
          ext("您可以隨時透過", "Google 廣告設定", URL_MY_AD_CENTER, "停用個人化廣告。"),
          ext("若要停用 Google 以外第三方廣告業者的 Cookie，請使用", "aboutads.info 的退出頁面", URL_ABOUT_ADS, "。"),
          ext("關於 Google 如何在廣告中處理資料，請參閱", "「Google 如何使用來自採用 Google 服務的網站或應用程式的資訊」", URL_GOOGLE_ADS_POLICY, "。"),
        ],
      },
      {
        heading: "7. 流量分析（Google Analytics）",
        items: [
          p("本網站為掌握使用狀況並加以改善，使用 Google Analytics 4（GA4）。GA4 使用 Cookie 收集瀏覽頁面、停留時間等流量資料。"),
          p("收集的資料為統計性質，不包含姓名、電子郵件地址等可直接識別個人的資訊。"),
          ext("若要停止 Google Analytics 收集資料，請使用", "Google Analytics 不透露資訊外掛程式", URL_GA_OPTOUT, "，或在瀏覽器中停用 Cookie。"),
        ],
      },
      {
        heading: "8. 致歐洲經濟區（EEA）、英國及瑞士的用戶",
        items: [
          p("依 Google 的政策，向 EEA、英國及瑞士的用戶投放個人化廣告時，須取得用戶對使用 Cookie 等的同意。從這些地區存取本網站時，可能會顯示 Google 認證同意管理平台（CMP）的同意訊息。"),
          p("未取得同意時，將不會投放個人化廣告（不顯示廣告，或顯示非個人化廣告）。您在同意訊息中所做的選擇可隨時變更。"),
        ],
      },
      {
        heading: "9. 用戶資訊的外部傳送",
        items: [
          p("本網站在顯示頁面或提供功能時，會從您的裝置向下列外部業者傳送資訊（此為依日本《電氣通信事業法》第27條之12所公布的事項）。各業者對資訊的處理，依其各自的隱私權政策辦理。"),
          ext("Google（Google LLC／美國）：為投放廣告（Google AdSense）及流量分析（Google Analytics），會傳送 Cookie 與廣告識別碼、瀏覽頁面網址、來源網址、IP 位址、瀏覽器與裝置資訊、瀏覽時間等。／", "隱私權政策", URL_GOOGLE_PRIVACY),
          ext("Vercel（Vercel Inc.／美國）：為本網站的主機代管與傳送，IP 位址、存取時間、瀏覽網址、使用者代理程式等會記錄為存取紀錄。／", "隱私權政策", URL_VERCEL_PRIVACY),
          ext("Supabase（Supabase, Inc.／美國）：為統計文章瀏覽次數，開啟戀愛部落格文章時會傳送該文章的識別碼。通訊過程中 IP 位址等會送達該公司，但本網站僅儲存各文章的瀏覽次數。／", "隱私權政策", URL_SUPABASE_PRIVACY),
          ext("Formspree（Formspree, Inc.／美國）：僅在送出聯絡表單時，傳送輸入內容（第3條）及通訊所伴隨的 IP 位址等。／", "隱私權政策", URL_FORMSPREE_PRIVACY),
          ext("microCMS（株式會社 microCMS／日本）：用於管理戀愛部落格文章。文章由本網站的伺服器傳送，因此不會從您的裝置向該公司傳送資訊。／", "隱私權政策", URL_MICROCMS_PRIVACY),
          p("文章及診斷結果的分享按鈕（X、LINE、Facebook）是在點按時開啟各服務頁面的連結。僅顯示按鈕並不會向各公司傳送資訊。"),
        ],
      },
      {
        heading: "10. 使用位於外國的業者",
        items: [
          p("如第9條所述，本網站使用的部分外部服務（Google、Vercel、Supabase、Formspree）為美國業者，包含洽詢內容在內的資訊可能會在美國等地的伺服器上處理。這些業者均在各自的隱私權政策中訂有保護個人資料的措施。"),
          ext("關於美國的個人資料保護制度，請參閱日本個人資訊保護委員會公布的", "「外國制度（美國）」", URL_PPC_FOREIGN, "（日文）。"),
        ],
      },
      {
        heading: "11. 向第三方提供個人資料",
        items: [
          p("透過洽詢取得的個人資料，除下列情形外，不會提供給第三方。第3條及第9條所記載、為提供服務所必需而傳送至外部業者（業務委託）的情形，不屬於此處所稱的第三方提供。"),
          ul(
            "經本人同意時",
            "依法令需要揭露時",
            "為保護人的生命、身體或財產所必需，且難以取得本人同意時",
          ),
          p("本網站絕不販售個人資料，也不會為廣告目的將其提供給第三方。"),
        ],
      },
      {
        heading: "12. 安全管理",
        items: [
          p("經營者致力於採取必要且適當的措施，防止透過洽詢取得的個人資料外洩、滅失或毀損，並安全地加以管理。不再需要的資訊，將依第3條予以刪除。"),
        ],
      },
      {
        heading: "13. 致未成年人",
        items: [
          p("瀏覽本網站沒有年齡限制，但未成年人透過聯絡表單傳送個人資料時，請先取得監護人的同意。"),
        ],
      },
      {
        heading: "14. 揭露、更正、停止使用及刪除的請求",
        items: [
          contact("如欲請求揭露、更正、停止使用或刪除本網站所保存的個人資料，請透過", "聯絡表單", "與我們聯繫。確認為本人請求後，將迅速處理。為確認身分，可能會在必要範圍內請您提供其他資訊。"),
          p("若發現文章或診斷內容有誤，也請透過相同窗口告知，確認後將予以更正或刪除。"),
        ],
      },
      {
        heading: "15. 免責事項與著作權",
        items: [
          p("本網站的戀愛診斷、心理測驗、戀愛籤及專欄，是作為娛樂及自我了解的契機而提供，並非醫學、心理學或其他專業的診斷或建議。身心不適，或涉及您本人或身邊的人安全的煩惱，請諮詢醫療機構或公共諮詢窗口。"),
          terms("關於免責事項，以及內容的著作權、引用與連結，請參閱", "使用條款", "。"),
        ],
      },
      {
        heading: "16. 本政策的變更",
        items: [
          p("本政策可能因法令修正或所使用的外部服務、功能變更而修訂。修訂時將刊登於本頁並更新最後更新日；重要變更將在本網站上公告。"),
        ],
      },
      {
        heading: "17. 經營者與聯絡窗口",
        items: [
          ul(
            "網站名稱：Koitype",
            "網址：https://koitype.com",
            "經營者：Koitype 營運事務局",
            "內容企劃與製作：Koitype 編輯部",
          ),
          contact("有關本政策及本網站的洽詢，請透過", "聯絡表單", "提出。回覆可能需要一些時間，敬請見諒。"),
          p("本政策以日文版為正本。翻譯版與日文版內容不一致時，以日文版為準。"),
        ],
      },
    ],
  },

  "zh-CN": {
    title: "隐私政策",
    updated: "最后更新日期：2026年9月23日",
    intro:
      "Koitype 运营事务局（以下简称「经营者」）就提供免费恋爱诊断、心理测试及恋爱专栏的网站「Koitype」（以下简称「本网站」）中用户信息的处理，遵守日本《个人信息保护法》及其他相关法令，制定本隐私政策（以下简称「本政策」）如下。",
    sections: [
      {
        heading: "1. 本网站获取的信息",
        items: [
          p("本网站无需注册会员，仅浏览时不会要求您输入姓名、地址等个人信息。本网站获取的信息如下。"),
          ul(
            "您在联系表单中输入的姓名（含昵称）、电子邮件地址、主题及咨询内容",
            "通过访问分析自动收集的浏览页面、来源网址、大致地区、浏览器及设备类型等统计信息",
            "用于广告投放及访问分析的 Cookie 与广告标识符",
            "服务器访问日志（IP 地址、访问时间、用户代理等）",
          ),
          p("访问分析、广告及访问日志所处理的信息，并非以单独识别特定个人为目的。"),
        ],
      },
      {
        heading: "2. 使用目的",
        items: [
          p("获取的信息仅在下列目的范围内使用。"),
          ul(
            "回复咨询及为此所需的联系",
            "分析本网站的使用情况，并改进内容与功能",
            "投放广告及衡量效果",
            "统计文章浏览次数（显示热门文章等）",
            "防止未经授权访问或骚扰行为等，确保本网站安全运营",
          ),
          p("变更使用目的时，将在与变更前目的具有合理关联的范围内进行，并在本页公布。"),
        ],
      },
      {
        heading: "3. 联系表单的信息",
        items: [
          p("您在联系表单中输入的内容不经本网站服务器，而是直接发送至表单发送服务「Formspree」（Formspree, Inc.／美国），再经由该公司送达经营者。发送的信息为姓名、电子邮件地址、主题及咨询内容。"),
          p("获取的信息仅用于回复咨询及为此所需的联系。仅在处理所需期间内保存，不再需要时即予删除。"),
          ext("关于 Formspree 的信息处理，请参阅该公司的", "隐私政策", URL_FORMSPREE_PRIVACY, "。"),
          p("咨询时请勿输入密码、信用卡号码、身份证号码、健康状况等敏感信息。"),
        ],
      },
      {
        heading: "4. 诊断与心理测试的回答",
        items: [
          p("恋爱诊断、心理测试及恋爱签的题目回答，仅在您的浏览器中处理，不会发送或存储至本网站的服务器或外部服务，也不会送达经营者。"),
          p("用于分享诊断结果的网址（结尾带有 result= 的网址）仅包含判定类型的标识符，不包含各题的回答。若将分享网址发布到社交网站等，该结果类型将会公开，敬请留意。"),
          p("本网站的诊断与心理测试是作为娱乐及自我了解的契机而提供，并非医学或心理学检查，也不会将回答内容用于评估健康状况或人格。"),
        ],
      },
      {
        heading: "5. Cookie 与存储在设备上的信息",
        items: [
          p("Cookie 是存储在浏览器中的小型数据文件。本网站为投放广告及访问分析而使用 Cookie。"),
          p("此外，为了方便使用，本网站会将下列信息存储在您的设备中（本地存储／会话存储）。这些信息只保留在设备内，不会发送至经营者或外部服务。"),
          ul(
            "显示语言的选择",
            "恋爱博客的收藏文章",
            "打开各项诊断的次数（用于首页诊断的排列顺序）",
            "最后一次查看通知页面的日期（用于显示新通知）",
            "同一会话内已浏览的文章（用于防止重复计算浏览次数）",
          ),
          p("您可以在浏览器设置中禁用 Cookie；删除浏览器的网站数据时，存储在设备上的信息也会一并删除。即使如此仍可使用诊断及阅读文章，但部分功能可能无法正常运行。"),
        ],
      },
      {
        heading: "6. 广告投放（Google AdSense）",
        items: [
          p("本网站使用第三方广告服务 Google AdSense。"),
          p("包括 Google 在内的第三方广告业者，可能会使用 Cookie，根据用户过去访问本网站或其他网站的信息投放广告。"),
          p("Google 通过使用广告 Cookie，使 Google 及其合作伙伴能够根据用户访问本网站或其他网站的信息，显示适当的广告。"),
          ext("您可以随时通过", "Google 广告设置", URL_MY_AD_CENTER, "停用个性化广告。"),
          ext("若要停用 Google 以外第三方广告业者的 Cookie，请使用", "aboutads.info 的退出页面", URL_ABOUT_ADS, "。"),
          ext("关于 Google 如何在广告中处理数据，请参阅", "「Google 如何使用来自使用 Google 服务的网站或应用的信息」", URL_GOOGLE_ADS_POLICY, "。"),
        ],
      },
      {
        heading: "7. 访问分析（Google Analytics）",
        items: [
          p("本网站为掌握使用情况并加以改进，使用 Google Analytics 4（GA4）。GA4 使用 Cookie 收集浏览页面、停留时间等流量数据。"),
          p("收集的数据为统计性质，不包含姓名、电子邮件地址等可直接识别个人的信息。"),
          ext("若要停止 Google Analytics 收集数据，请使用", "Google Analytics 停用浏览器插件", URL_GA_OPTOUT, "，或在浏览器中禁用 Cookie。"),
        ],
      },
      {
        heading: "8. 致欧洲经济区（EEA）、英国及瑞士的用户",
        items: [
          p("根据 Google 的政策，向 EEA、英国及瑞士的用户投放个性化广告时，须取得用户对使用 Cookie 等的同意。从这些地区访问本网站时，可能会显示 Google 认证同意管理平台（CMP）的同意消息。"),
          p("未取得同意时，将不会投放个性化广告（不显示广告，或显示非个性化广告）。您在同意消息中所做的选择可随时变更。"),
        ],
      },
      {
        heading: "9. 用户信息的外部发送",
        items: [
          p("本网站在显示页面或提供功能时，会从您的设备向下列外部业者发送信息（此为依日本《电气通信事业法》第27条之12所公布的事项）。各业者对信息的处理，依其各自的隐私政策执行。"),
          ext("Google（Google LLC／美国）：为投放广告（Google AdSense）及访问分析（Google Analytics），会发送 Cookie 与广告标识符、浏览页面网址、来源网址、IP 地址、浏览器与设备信息、浏览时间等。／", "隐私政策", URL_GOOGLE_PRIVACY),
          ext("Vercel（Vercel Inc.／美国）：为本网站的托管与分发，IP 地址、访问时间、浏览网址、用户代理等会记录为访问日志。／", "隐私政策", URL_VERCEL_PRIVACY),
          ext("Supabase（Supabase, Inc.／美国）：为统计文章浏览次数，打开恋爱博客文章时会发送该文章的标识符。通信过程中 IP 地址等会送达该公司，但本网站仅存储各文章的浏览次数。／", "隐私政策", URL_SUPABASE_PRIVACY),
          ext("Formspree（Formspree, Inc.／美国）：仅在提交联系表单时，发送输入内容（第3条）及通信所伴随的 IP 地址等。／", "隐私政策", URL_FORMSPREE_PRIVACY),
          ext("microCMS（株式会社 microCMS／日本）：用于管理恋爱博客文章。文章由本网站的服务器分发，因此不会从您的设备向该公司发送信息。／", "隐私政策", URL_MICROCMS_PRIVACY),
          p("文章及诊断结果的分享按钮（X、LINE、Facebook）是在点击时打开各服务页面的链接。仅显示按钮并不会向各公司发送信息。"),
        ],
      },
      {
        heading: "10. 使用位于外国的业者",
        items: [
          p("如第9条所述，本网站使用的部分外部服务（Google、Vercel、Supabase、Formspree）为美国业者，包含咨询内容在内的信息可能会在美国等地的服务器上处理。这些业者均在各自的隐私政策中制定了保护个人信息的措施。"),
          ext("关于美国的个人信息保护制度，请参阅日本个人信息保护委员会公布的", "「外国制度（美国）」", URL_PPC_FOREIGN, "（日文）。"),
        ],
      },
      {
        heading: "11. 向第三方提供个人信息",
        items: [
          p("通过咨询获取的个人信息，除下列情形外，不会提供给第三方。第3条及第9条所记载、为提供服务所必需而发送至外部业者（业务委托）的情形，不属于此处所称的第三方提供。"),
          ul(
            "经本人同意时",
            "依法令需要披露时",
            "为保护人的生命、身体或财产所必需，且难以取得本人同意时",
          ),
          p("本网站绝不出售个人信息，也不会为广告目的将其提供给第三方。"),
        ],
      },
      {
        heading: "12. 安全管理",
        items: [
          p("经营者致力于采取必要且适当的措施，防止通过咨询获取的个人信息泄露、灭失或毁损，并安全地加以管理。不再需要的信息，将依第3条予以删除。"),
        ],
      },
      {
        heading: "13. 致未成年人",
        items: [
          p("浏览本网站没有年龄限制，但未成年人通过联系表单发送个人信息时，请先取得监护人的同意。"),
        ],
      },
      {
        heading: "14. 披露、更正、停止使用及删除的请求",
        items: [
          contact("如欲请求披露、更正、停止使用或删除本网站所保存的个人信息，请通过", "联系表单", "与我们联系。确认为本人请求后，将迅速处理。为确认身份，可能会在必要范围内请您提供其他信息。"),
          p("若发现文章或诊断内容有误，也请通过相同窗口告知，确认后将予以更正或删除。"),
        ],
      },
      {
        heading: "15. 免责事项与著作权",
        items: [
          p("本网站的恋爱诊断、心理测试、恋爱签及专栏，是作为娱乐及自我了解的契机而提供，并非医学、心理学或其他专业的诊断或建议。身心不适，或涉及您本人或身边的人安全的烦恼，请咨询医疗机构或公共咨询窗口。"),
          terms("关于免责事项，以及内容的著作权、引用与链接，请参阅", "使用条款", "。"),
        ],
      },
      {
        heading: "16. 本政策的变更",
        items: [
          p("本政策可能因法令修订或所使用的外部服务、功能变更而修订。修订时将刊登于本页并更新最后更新日期；重要变更将在本网站上公告。"),
        ],
      },
      {
        heading: "17. 经营者与联系窗口",
        items: [
          ul(
            "网站名称：Koitype",
            "网址：https://koitype.com",
            "经营者：Koitype 运营事务局",
            "内容策划与制作：Koitype 编辑部",
          ),
          contact("有关本政策及本网站的咨询，请通过", "联系表单", "提交。回复可能需要一些时间，敬请谅解。"),
          p("本政策以日文版为正本。译本与日文版内容不一致时，以日文版为准。"),
        ],
      },
    ],
  },
};

export function getPrivacyPolicyContent(locale: Locale): PrivacyPolicyContent {
  return content[locale] ?? content.ja;
}
