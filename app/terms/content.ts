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
    };

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

const p = (text: string): ContentItem => ({ type: "p", text });
const ul = (...items: string[]): ContentItem => ({ type: "ul", items });
// お問い合わせフォーム（/contact）へのリンク付き段落
const contact = (before: string, linkText: string, after: string): ContentItem => ({
  type: "pLink",
  before,
  linkText,
  after,
});
const privacy = (before: string, linkText: string, after: string): ContentItem => ({
  type: "intLink",
  before,
  linkText,
  href: "/privacy-policy",
  after,
});

const content: Record<Locale, TermsContent> = {
  ja: {
    title: "利用規約",
    updated: "最終更新日：2026年9月23日",
    intro:
      "この利用規約（以下「本規約」）は、Koitype（以下「本サービス」）の利用条件を定めるものです。本サービスを利用するすべての方（以下「利用者」）に適用されます。本サービスを利用する前に、本規約をお読みください。",
    sections: [
      {
        heading: "第1条（定義）",
        items: [
          p("本規約で使う用語の意味は、次のとおりです。"),
          ul(
            "「本サービス」：Koitype（https://koitype.com）で運営者が提供する、恋愛診断・心理テスト・恋みくじ・恋愛ブログその他すべてのサービス",
            "「運営者」：本サービスを運営するKoitype運営事務局",
            "「利用者」：本サービスを閲覧または利用するすべての方",
            "「コンテンツ」：本サービスに掲載される文章、画像、イラスト、診断・テストの設問と結果、デザイン、ロゴなど",
          ),
        ],
      },
      {
        heading: "第2条（本規約への同意と適用）",
        items: [
          p("利用者は、本規約に同意したうえで本サービスを利用するものとします。本サービスを利用した時点で、本規約に同意したものとみなします。"),
          p("運営者が本サービス上に掲載するプライバシーポリシーやその他の案内は、本規約の一部となります。本規約と個別の案内の内容が異なる場合は、個別の案内が優先します。"),
          p("未成年の方は、保護者の同意を得たうえで本サービスを利用してください。"),
        ],
      },
      {
        heading: "第3条（サービスの内容と性質）",
        items: [
          p("本サービスは、恋愛診断・心理テスト・性格診断・恋みくじ・恋愛コラムなどのエンターテインメントコンテンツを、会員登録なしで無料で提供します。本サービスを利用するための機器と通信料金は、利用者の負担とします。"),
          p("診断・テストの結果やコラムの内容は、娯楽と自己理解のきっかけとして提供するものです。医学的・心理学的その他の専門的な診断や助言、将来の予測ではありません。"),
          p("恋愛や人間関係に関わる大切な判断は、結果だけに頼らず、ご自身で行ってください。心身の不調、DV・ストーカー被害など安全に関わる悩みは、医療機関や公的な相談窓口に相談してください。"),
        ],
      },
      {
        heading: "第4条（禁止事項）",
        items: [
          p("利用者は、本サービスの利用にあたり、次の行為をしてはなりません。"),
          ul(
            "法令または公序良俗に違反する行為、犯罪行為に関係する行為",
            "運営者、他の利用者、第三者の著作権・商標権・肖像権・プライバシーその他の権利や利益を侵害する行為",
            "診断結果やコンテンツを使って、特定の人を誹謗中傷する、差別する、嫌がらせをする行為",
            "診断・テストを受けることや結果を見せることを、他人に強要する行為",
            "サーバーやネットワークに過度な負荷をかける行為、不正アクセス、脆弱性の悪用、有害なプログラムの送信",
            "運営者の許可なく、クローラーやスクレイピングツールなどの自動化された手段でコンテンツを大量に取得する行為（一般的な検索エンジンによる収集を除きます）",
            "本サービス上の広告を不正にクリックする行為、他人にクリックを依頼または誘導する行為",
            "運営者や第三者になりすます行為、本サービスと関係があるかのように誤解させる行為",
            "お問い合わせフォームから、虚偽の内容、迷惑メール、営業目的の大量送信などを行う行為",
            "その他、本サービスの運営を妨げる行為、または運営者が合理的な理由に基づき不適切と判断する行為",
          ),
        ],
      },
      {
        heading: "第5条（知的財産権とコンテンツの利用）",
        items: [
          p("コンテンツの著作権その他の知的財産権は、運営者または正当な権利者に帰属します。"),
          p("法令で認められる場合と本規約で認める場合を除き、コンテンツの無断転載、複製、改変、再配布、商用利用を禁止します。"),
          p("引用する場合は、出典を明記するなど、著作権法の定める要件を満たす範囲で行ってください。"),
          p("本サービスへのリンクは、原則として自由です。ただし、本サービスのページを他サイトのフレーム内に表示するなど、運営者のコンテンツであることが分かりにくくなる方法でのリンクはご遠慮ください。"),
        ],
      },
      {
        heading: "第6条（診断結果のシェア）",
        items: [
          p("利用者は、本サービスの共有機能やスクリーンショットを使って、ご自身の診断・テスト結果をSNSなどで非営利の目的で共有できます。"),
          p("共有した内容は、第三者が見られる状態になります。共有によって生じたトラブルには、利用者ご自身の責任で対応してください。"),
          p("他人の診断結果を、その方の同意なく公開しないでください。"),
        ],
      },
      {
        heading: "第7条（広告）",
        items: [
          p("本サービスは、第三者配信の広告サービス Google AdSense を利用して運営しています。広告の内容は配信事業者が自動的に決めるもので、運営者が個別の商品・サービスを推薦・保証するものではありません。"),
          p("広告のリンク先の商品・サービスについては、各提供元にお問い合わせください。"),
          privacy("広告に使われるCookieとオプトアウトの方法は、", "プライバシーポリシー", "に記載しています。"),
        ],
      },
      {
        heading: "第8条（外部サイト・外部サービス）",
        items: [
          p("本サービスからリンクしている外部サイトや、共有先のSNSなどの外部サービスについて、運営者はその内容や安全性を保証しません。外部サービスを利用する際は、各サービスの利用規約などに従ってください。"),
        ],
      },
      {
        heading: "第9条（サービスの変更・中断・終了）",
        items: [
          p("運営者は、事前に通知することなく、本サービスの内容の全部または一部を変更、追加、または終了できるものとします。"),
          p("次のいずれかに当てはまる場合、運営者は本サービスの全部または一部を一時的に中断することがあります。"),
          ul(
            "システムの保守・点検・更新を行う場合",
            "天災、停電、通信障害などの不可抗力により提供が難しい場合",
            "ホスティングなど、本サービスが利用する外部サービスに障害が起きた場合",
            "その他、運営者がやむを得ないと判断した場合",
          ),
        ],
      },
      {
        heading: "第10条（免責事項）",
        items: [
          p("運営者は、コンテンツの正確性、完全性、有用性、特定の目的への適合性や、本サービスが中断なく利用できることを保証しません。"),
          p("運営者は、本サービスの利用、または本サービスを利用できなかったことによって利用者に生じた損害について、責任を負いません。"),
          p("ただし、運営者の故意または重大な過失による場合など、消費者契約法その他の法令により運営者の責任を免除できない場合には、前項は適用しません。この場合でも、運営者の軽過失による損害の賠償は、通常生じる損害の範囲に限ります（特別な事情から生じた損害を除きます）。"),
          p("利用者同士、または利用者と第三者との間で生じたトラブルについて、運営者は関与せず、責任を負いません。"),
        ],
      },
      {
        heading: "第11条（利用の制限）",
        items: [
          p("利用者が本規約に違反した場合、または違反するおそれがあると運営者が判断した場合、運営者は事前に通知することなく、その利用者による本サービスへのアクセスの制限など、必要な措置をとることができます。"),
        ],
      },
      {
        heading: "第12条（個人情報の取り扱い）",
        items: [
          privacy("利用者の個人情報とCookieなどの取り扱いは、別に定める", "プライバシーポリシー", "に従います。"),
        ],
      },
      {
        heading: "第13条（本規約の変更）",
        items: [
          p("運営者は、法令の改正やサービス内容の変更などにより必要が生じた場合、民法第548条の4の規定に基づき、本規約を変更することがあります。"),
          p("本規約を変更する場合は、変更の内容と効力が生じる日を、その日より前の相当な期間に本ページで告知します。効力が生じた日以降に本サービスを利用した場合、利用者は変更後の規約に同意したものとみなします。"),
        ],
      },
      {
        heading: "第14条（分離可能性）",
        items: [
          p("本規約のいずれかの条項やその一部が、法令などにより無効または執行できないと判断された場合でも、その他の部分は引き続き効力を持ちます。"),
        ],
      },
      {
        heading: "第15条（言語）",
        items: [
          p("本規約は日本語を正文とします。翻訳版と日本語版の内容が異なる場合は、日本語版が優先します。"),
        ],
      },
      {
        heading: "第16条（準拠法・管轄）",
        items: [
          p("本規約は日本法に準拠し、日本法に従って解釈されます。"),
          p("本サービスに関して紛争が生じた場合は、運営者の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。"),
        ],
      },
      {
        heading: "第17条（お問い合わせ）",
        items: [
          contact("本規約に関するお問い合わせは、", "お問い合わせフォーム", "からお願いいたします。"),
        ],
      },
    ],
  },

  en: {
    title: "Terms of Use",
    updated: "Last updated: September 23, 2026",
    intro:
      "These Terms of Use (\"these Terms\") set out the conditions for using Koitype (\"the Service\"). They apply to everyone who uses the Service (\"users\"). Please read these Terms before using the Service. These Terms are a translation of the Japanese original; see Article 15.",
    sections: [
      {
        heading: "Article 1 (Definitions)",
        items: [
          p("In these Terms, the following words have the meanings below."),
          ul(
            "\"the Service\": all services the operator provides at Koitype (https://koitype.com), including love quizzes, personality tests, love fortunes (Koi-mikuji), and the love blog",
            "\"the operator\": the Koitype Administration Office, which runs the Service",
            "\"users\": everyone who views or uses the Service",
            "\"content\": text, images, illustrations, quiz questions and results, designs, logos, and other material published on the Service",
          ),
        ],
      },
      {
        heading: "Article 2 (Agreement and Scope)",
        items: [
          p("Users use the Service after agreeing to these Terms. By using the Service, you are deemed to have agreed to these Terms."),
          p("The Privacy Policy and any other notices the operator posts on the Service form part of these Terms. If a specific notice differs from these Terms, the specific notice takes precedence."),
          p("If you are a minor, please use the Service with the consent of a parent or guardian."),
        ],
      },
      {
        heading: "Article 3 (Nature of the Service)",
        items: [
          p("The Service provides entertainment content such as love quizzes, personality tests, love fortunes, and columns about relationships, free of charge and without registration. Users are responsible for the devices and data charges needed to use the Service."),
          p("Quiz and test results and column content are provided for entertainment and as a starting point for self-reflection. They are not medical, psychological, or other professional diagnoses or advice, and they do not predict the future."),
          p("Please make important decisions about relationships yourself, rather than relying on results alone. For health concerns, or worries involving safety such as domestic violence or stalking, please consult a medical institution or a public support service."),
        ],
      },
      {
        heading: "Article 4 (Prohibited Activities)",
        items: [
          p("When using the Service, users must not:"),
          ul(
            "violate laws or public order and morals, or engage in activities related to crime;",
            "infringe the copyrights, trademarks, portrait rights, privacy, or other rights or interests of the operator, other users, or third parties;",
            "use results or content to defame, discriminate against, or harass any person;",
            "force anyone to take a quiz or to show their results;",
            "place excessive load on servers or networks, gain unauthorized access, exploit vulnerabilities, or transmit harmful programs;",
            "collect content in bulk by automated means such as crawlers or scraping tools without the operator's permission (excluding ordinary search engine indexing);",
            "click ads fraudulently, or ask or encourage others to click ads;",
            "impersonate the operator or a third party, or falsely suggest a connection with the Service;",
            "send false content, spam, or bulk sales messages through the contact form; or",
            "otherwise interfere with the operation of the Service, or do anything the operator reasonably judges inappropriate.",
          ),
        ],
      },
      {
        heading: "Article 5 (Intellectual Property and Use of Content)",
        items: [
          p("Copyrights and other intellectual property rights in the content belong to the operator or the rightful owners."),
          p("Except as permitted by law or by these Terms, reproducing, republishing, modifying, redistributing, or commercially using the content without permission is prohibited."),
          p("If you quote content, do so within the limits of copyright law, including clearly citing the source."),
          p("You may link to the Service freely. However, please do not link in ways that make it unclear that the content belongs to the operator, such as displaying our pages inside a frame on another site."),
        ],
      },
      {
        heading: "Article 6 (Sharing Results)",
        items: [
          p("Users may share their own quiz and test results on social media and elsewhere for non-commercial purposes, using the Service's share features or screenshots."),
          p("Shared content becomes visible to third parties. Users are responsible for handling any trouble that arises from sharing."),
          p("Please do not publish another person's results without their consent."),
        ],
      },
      {
        heading: "Article 7 (Advertising)",
        items: [
          p("The Service is supported by Google AdSense, a third-party advertising service. Ads are selected automatically by the ad provider, and the operator does not recommend or guarantee any advertised product or service."),
          p("For questions about advertised products or services, please contact the respective provider."),
          privacy("How advertising cookies are used and how to opt out is explained in our ", "Privacy Policy", "."),
        ],
      },
      {
        heading: "Article 8 (External Sites and Services)",
        items: [
          p("The operator does not guarantee the content or safety of external sites linked from the Service, or of external services such as the social networks you share to. When using an external service, please follow its own terms."),
        ],
      },
      {
        heading: "Article 9 (Changes, Suspension, and Termination of the Service)",
        items: [
          p("The operator may change, add to, or end all or part of the Service without prior notice."),
          p("The operator may temporarily suspend all or part of the Service in any of the following cases:"),
          ul(
            "system maintenance, inspection, or updates;",
            "force majeure such as natural disasters, power outages, or network failures;",
            "failures of external services the Service depends on, such as hosting; or",
            "other cases the operator judges unavoidable.",
          ),
        ],
      },
      {
        heading: "Article 10 (Disclaimer)",
        items: [
          p("The operator does not guarantee the accuracy, completeness, usefulness, or fitness for a particular purpose of the content, or that the Service will be available without interruption."),
          p("The operator is not liable for damages users suffer from using, or being unable to use, the Service."),
          p("However, the preceding paragraph does not apply where the operator's liability cannot be excluded under the Consumer Contract Act of Japan or other laws, such as in cases of intent or gross negligence by the operator. Even then, liability for the operator's ordinary negligence is limited to damages that would normally arise (excluding damages arising from special circumstances)."),
          p("The operator is not involved in, and is not liable for, disputes between users or between users and third parties."),
        ],
      },
      {
        heading: "Article 11 (Restriction of Use)",
        items: [
          p("If a user violates these Terms, or the operator judges that a violation is likely, the operator may, without prior notice, restrict that user's access to the Service or take other necessary measures."),
        ],
      },
      {
        heading: "Article 12 (Personal Information)",
        items: [
          privacy("Personal information, cookies, and similar data are handled according to our separate ", "Privacy Policy", "."),
        ],
      },
      {
        heading: "Article 13 (Changes to These Terms)",
        items: [
          p("The operator may change these Terms when necessary, such as when laws or the Service change, in accordance with Article 548-4 of the Civil Code of Japan."),
          p("When these Terms change, the operator will announce the changes and their effective date on this page a reasonable period in advance. By using the Service on or after the effective date, users are deemed to have agreed to the revised Terms."),
        ],
      },
      {
        heading: "Article 14 (Severability)",
        items: [
          p("If any provision of these Terms, or any part of one, is held invalid or unenforceable under law, the remaining provisions stay in effect."),
        ],
      },
      {
        heading: "Article 15 (Language)",
        items: [
          p("The Japanese version of these Terms is the original. If a translation differs from the Japanese version, the Japanese version prevails."),
        ],
      },
      {
        heading: "Article 16 (Governing Law and Jurisdiction)",
        items: [
          p("These Terms are governed by and interpreted under the laws of Japan."),
          p("Any dispute relating to the Service shall be subject to the exclusive jurisdiction, in the first instance, of the court having jurisdiction over the operator's location."),
        ],
      },
      {
        heading: "Article 17 (Contact)",
        items: [
          contact("For questions about these Terms, please use our ", "contact form", "."),
        ],
      },
    ],
  },

  ko: {
    title: "이용약관",
    updated: "최종 업데이트: 2026년 9월 23일",
    intro:
      "본 이용약관(이하 「본 약관」)은 Koitype(이하 「본 서비스」)의 이용 조건을 정한 것으로, 본 서비스를 이용하는 모든 분(이하 「이용자」)에게 적용됩니다. 본 서비스를 이용하기 전에 본 약관을 읽어 주십시오. 본 약관은 일본어 원문의 번역본입니다(제15조 참조).",
    sections: [
      {
        heading: "제1조(정의)",
        items: [
          p("본 약관에서 사용하는 용어의 뜻은 다음과 같습니다."),
          ul(
            "「본 서비스」: Koitype(https://koitype.com)에서 운영자가 제공하는 연애 진단·심리 테스트·연애 제비뽑기·연애 블로그 등 모든 서비스",
            "「운영자」: 본 서비스를 운영하는 Koitype 운영사무국",
            "「이용자」: 본 서비스를 열람하거나 이용하는 모든 분",
            "「콘텐츠」: 본 서비스에 게재된 문장, 이미지, 일러스트, 진단·테스트의 문항과 결과, 디자인, 로고 등",
          ),
        ],
      },
      {
        heading: "제2조(약관 동의 및 적용)",
        items: [
          p("이용자는 본 약관에 동의한 후 본 서비스를 이용합니다. 본 서비스를 이용한 시점에 본 약관에 동의한 것으로 간주합니다."),
          p("운영자가 본 서비스에 게재하는 개인정보처리방침 및 기타 안내는 본 약관의 일부를 구성합니다. 본 약관과 개별 안내의 내용이 다른 경우 개별 안내가 우선합니다."),
          p("미성년자는 보호자의 동의를 얻은 후 본 서비스를 이용해 주십시오."),
        ],
      },
      {
        heading: "제3조(서비스의 내용과 성격)",
        items: [
          p("본 서비스는 연애 진단·심리 테스트·성격 진단·연애 제비뽑기·연애 칼럼 등의 엔터테인먼트 콘텐츠를 회원가입 없이 무료로 제공합니다. 본 서비스 이용에 필요한 기기와 통신 요금은 이용자가 부담합니다."),
          p("진단·테스트 결과와 칼럼의 내용은 오락과 자기 이해의 계기로 제공하는 것이며, 의학적·심리학적 또는 기타 전문적인 진단이나 조언, 미래 예측이 아닙니다."),
          p("연애나 인간관계에 관한 중요한 판단은 결과에만 의존하지 말고 스스로 내려 주십시오. 심신의 불편, 가정폭력·스토킹 피해 등 안전에 관한 고민은 의료기관이나 공공 상담 창구에 상담해 주십시오."),
        ],
      },
      {
        heading: "제4조(금지 사항)",
        items: [
          p("이용자는 본 서비스를 이용할 때 다음 행위를 해서는 안 됩니다."),
          ul(
            "법령 또는 공서양속에 위반되는 행위, 범죄 행위와 관련된 행위",
            "운영자, 다른 이용자 또는 제3자의 저작권·상표권·초상권·프라이버시 및 기타 권리나 이익을 침해하는 행위",
            "진단 결과나 콘텐츠를 이용하여 특정인을 비방·차별하거나 괴롭히는 행위",
            "진단·테스트 응시나 결과 공개를 타인에게 강요하는 행위",
            "서버나 네트워크에 과도한 부하를 주는 행위, 부정 접속, 취약점 악용, 유해한 프로그램 전송",
            "운영자의 허가 없이 크롤러나 스크래핑 도구 등 자동화된 수단으로 콘텐츠를 대량으로 수집하는 행위(일반적인 검색 엔진의 수집은 제외)",
            "본 서비스의 광고를 부정하게 클릭하는 행위, 타인에게 클릭을 요청하거나 유도하는 행위",
            "운영자나 제3자를 사칭하는 행위, 본 서비스와 관계가 있는 것처럼 오인하게 하는 행위",
            "문의 양식을 통해 허위 내용, 스팸, 영업 목적의 대량 발송 등을 하는 행위",
            "그 밖에 본 서비스 운영을 방해하는 행위, 또는 운영자가 합리적인 이유로 부적절하다고 판단하는 행위",
          ),
        ],
      },
      {
        heading: "제5조(지식재산권과 콘텐츠 이용)",
        items: [
          p("콘텐츠의 저작권 및 기타 지식재산권은 운영자 또는 정당한 권리자에게 귀속됩니다."),
          p("법령 또는 본 약관에서 허용하는 경우를 제외하고, 콘텐츠의 무단 전재·복제·수정·재배포·상업적 이용을 금지합니다."),
          p("인용할 때는 출처를 명시하는 등 저작권법이 정하는 요건을 충족하는 범위에서 해 주십시오."),
          p("본 서비스로의 링크는 원칙적으로 자유입니다. 다만, 본 서비스의 페이지를 다른 사이트의 프레임 안에 표시하는 등 운영자의 콘텐츠임을 알기 어렵게 하는 방식의 링크는 삼가 주십시오."),
        ],
      },
      {
        heading: "제6조(진단 결과 공유)",
        items: [
          p("이용자는 본 서비스의 공유 기능이나 스크린숏을 이용하여 자신의 진단·테스트 결과를 SNS 등에 비영리 목적으로 공유할 수 있습니다."),
          p("공유한 내용은 제3자가 볼 수 있는 상태가 됩니다. 공유로 인해 발생한 문제는 이용자 본인의 책임으로 대응해 주십시오."),
          p("타인의 진단 결과를 본인의 동의 없이 공개하지 마십시오."),
        ],
      },
      {
        heading: "제7조(광고)",
        items: [
          p("본 서비스는 제3자 광고 서비스인 Google AdSense를 이용하여 운영하고 있습니다. 광고 내용은 광고 사업자가 자동으로 결정하며, 운영자가 개별 상품·서비스를 추천하거나 보증하는 것이 아닙니다."),
          p("광고 링크 대상의 상품·서비스에 관한 문의는 각 제공자에게 해 주십시오."),
          privacy("광고에 사용되는 쿠키와 옵트아웃 방법은 ", "개인정보처리방침", "에 기재되어 있습니다."),
        ],
      },
      {
        heading: "제8조(외부 사이트·외부 서비스)",
        items: [
          p("본 서비스에서 링크된 외부 사이트나 공유 대상 SNS 등 외부 서비스에 대해 운영자는 그 내용이나 안전성을 보증하지 않습니다. 외부 서비스를 이용할 때는 각 서비스의 이용약관 등을 따라 주십시오."),
        ],
      },
      {
        heading: "제9조(서비스의 변경·중단·종료)",
        items: [
          p("운영자는 사전 통지 없이 본 서비스 내용의 전부 또는 일부를 변경·추가·종료할 수 있습니다."),
          p("다음 중 어느 하나에 해당하는 경우 운영자는 본 서비스의 전부 또는 일부를 일시적으로 중단할 수 있습니다."),
          ul(
            "시스템의 유지보수·점검·업데이트를 하는 경우",
            "천재지변, 정전, 통신 장애 등 불가항력으로 제공이 어려운 경우",
            "호스팅 등 본 서비스가 이용하는 외부 서비스에 장애가 발생한 경우",
            "그 밖에 운영자가 부득이하다고 판단한 경우",
          ),
        ],
      },
      {
        heading: "제10조(면책 사항)",
        items: [
          p("운영자는 콘텐츠의 정확성, 완전성, 유용성, 특정 목적에의 적합성, 그리고 본 서비스를 중단 없이 이용할 수 있음을 보증하지 않습니다."),
          p("운영자는 본 서비스의 이용 또는 이용 불능으로 인해 이용자에게 발생한 손해에 대해 책임을 지지 않습니다."),
          p("다만, 운영자의 고의 또는 중대한 과실에 의한 경우 등 일본 소비자계약법 및 기타 법령에 따라 운영자의 책임을 면제할 수 없는 경우에는 전항을 적용하지 않습니다. 이 경우에도 운영자의 경과실로 인한 손해배상은 통상 발생하는 손해의 범위(특별한 사정으로 인한 손해 제외)로 한정됩니다."),
          p("이용자 간 또는 이용자와 제3자 간에 발생한 분쟁에 대해 운영자는 관여하지 않으며 책임을 지지 않습니다."),
        ],
      },
      {
        heading: "제11조(이용 제한)",
        items: [
          p("이용자가 본 약관을 위반한 경우 또는 위반할 우려가 있다고 운영자가 판단한 경우, 운영자는 사전 통지 없이 해당 이용자의 본 서비스 접속 제한 등 필요한 조치를 취할 수 있습니다."),
        ],
      },
      {
        heading: "제12조(개인정보 취급)",
        items: [
          privacy("이용자의 개인정보와 쿠키 등의 취급은 별도로 정한 ", "개인정보처리방침", "에 따릅니다."),
        ],
      },
      {
        heading: "제13조(약관의 변경)",
        items: [
          p("운영자는 법령 개정이나 서비스 내용 변경 등으로 필요한 경우, 일본 민법 제548조의4에 따라 본 약관을 변경할 수 있습니다."),
          p("본 약관을 변경하는 경우, 변경 내용과 효력 발생일을 그 전의 상당한 기간 동안 본 페이지에 공지합니다. 효력 발생일 이후 본 서비스를 이용한 경우, 이용자는 변경된 약관에 동의한 것으로 간주합니다."),
        ],
      },
      {
        heading: "제14조(분리 가능성)",
        items: [
          p("본 약관의 어느 조항 또는 그 일부가 법령 등에 의해 무효 또는 집행 불가능하다고 판단되더라도 나머지 부분은 계속 효력을 가집니다."),
        ],
      },
      {
        heading: "제15조(언어)",
        items: [
          p("본 약관은 일본어판을 정본으로 합니다. 번역본과 일본어판의 내용이 다른 경우 일본어판이 우선합니다."),
        ],
      },
      {
        heading: "제16조(준거법·관할)",
        items: [
          p("본 약관은 일본법에 준거하며 일본법에 따라 해석됩니다."),
          p("본 서비스에 관하여 분쟁이 발생한 경우, 운영자 소재지를 관할하는 법원을 제1심 전속적 합의 관할 법원으로 합니다."),
        ],
      },
      {
        heading: "제17조(문의)",
        items: [
          contact("본 약관에 관한 문의는 ", "문의 양식", "을 통해 해 주십시오."),
        ],
      },
    ],
  },

  "zh-TW": {
    title: "使用條款",
    updated: "最後更新日：2026年9月23日",
    intro:
      "本使用條款（以下簡稱「本條款」）規定 Koitype（以下簡稱「本服務」）的使用條件，適用於所有使用本服務的人（以下簡稱「用戶」）。使用本服務前，請先閱讀本條款。本條款為日文原文的翻譯版本（請參閱第15條）。",
    sections: [
      {
        heading: "第1條（定義）",
        items: [
          p("本條款中使用的用語定義如下。"),
          ul(
            "「本服務」：經營者於 Koitype（https://koitype.com）提供的戀愛診斷、心理測驗、戀愛籤、戀愛部落格等所有服務",
            "「經營者」：經營本服務的 Koitype 營運事務局",
            "「用戶」：瀏覽或使用本服務的所有人",
            "「內容」：本服務上刊登的文字、圖片、插畫、診斷與測驗的題目及結果、設計、標誌等",
          ),
        ],
      },
      {
        heading: "第2條（同意與適用）",
        items: [
          p("用戶應在同意本條款後使用本服務。開始使用本服務時，即視為已同意本條款。"),
          p("經營者於本服務上刊登的隱私權政策及其他說明，構成本條款的一部分。本條款與個別說明內容不一致時，以個別說明為準。"),
          p("未成年人請在取得監護人同意後使用本服務。"),
        ],
      },
      {
        heading: "第3條（服務內容與性質）",
        items: [
          p("本服務免費提供戀愛診斷、心理測驗、性格診斷、戀愛籤、戀愛專欄等娛樂內容，無需註冊會員。使用本服務所需的設備及通訊費用由用戶自行負擔。"),
          p("診斷與測驗結果及專欄內容，是作為娛樂與自我了解的契機而提供，並非醫學、心理學或其他專業的診斷或建議，也不是對未來的預測。"),
          p("有關戀愛或人際關係的重要決定，請勿僅依賴結果，應由您自行判斷。身心不適，或家暴、跟蹤騷擾等涉及安全的煩惱，請諮詢醫療機構或公共諮詢窗口。"),
        ],
      },
      {
        heading: "第4條（禁止事項）",
        items: [
          p("用戶使用本服務時，不得有下列行為。"),
          ul(
            "違反法令或公序良俗的行為，或與犯罪相關的行為",
            "侵害經營者、其他用戶或第三方的著作權、商標權、肖像權、隱私或其他權利及利益的行為",
            "利用診斷結果或內容誹謗、歧視或騷擾特定人士的行為",
            "強迫他人接受診斷或測驗，或強迫他人出示結果的行為",
            "對伺服器或網路造成過度負荷、未經授權存取、利用漏洞或傳送有害程式的行為",
            "未經經營者許可，以爬蟲或擷取工具等自動化方式大量取得內容的行為（一般搜尋引擎的收錄除外）",
            "不當點擊本服務上的廣告，或請求、誘導他人點擊的行為",
            "冒充經營者或第三方，或使人誤以為與本服務有關的行為",
            "透過聯絡表單傳送虛假內容、垃圾訊息或大量營業訊息等行為",
            "其他妨礙本服務營運的行為，或經營者基於合理理由認定為不適當的行為",
          ),
        ],
      },
      {
        heading: "第5條（智慧財產權與內容的使用）",
        items: [
          p("內容的著作權及其他智慧財產權，歸經營者或合法權利人所有。"),
          p("除法令或本條款允許的情形外，禁止擅自轉載、複製、修改、再散布或商業使用內容。"),
          p("引用時，請註明出處，並在符合著作權法規定的範圍內進行。"),
          p("原則上可自由連結至本服務。但請避免以不易辨識為經營者內容的方式連結，例如在其他網站的框架內顯示本服務頁面。"),
        ],
      },
      {
        heading: "第6條（分享診斷結果）",
        items: [
          p("用戶可使用本服務的分享功能或螢幕截圖，將自己的診斷與測驗結果以非營利目的分享至社群網站等。"),
          p("分享的內容將處於第三方可瀏覽的狀態。因分享而產生的糾紛，請由用戶自行負責處理。"),
          p("請勿在未經當事人同意的情況下公開他人的診斷結果。"),
        ],
      },
      {
        heading: "第7條（廣告）",
        items: [
          p("本服務使用第三方廣告服務 Google AdSense 營運。廣告內容由廣告業者自動決定，經營者並未推薦或保證個別商品或服務。"),
          p("有關廣告連結所指向的商品或服務，請向各提供者洽詢。"),
          privacy("廣告所使用的 Cookie 及退出方式，記載於", "隱私權政策", "。"),
        ],
      },
      {
        heading: "第8條（外部網站與外部服務）",
        items: [
          p("對於本服務連結的外部網站，以及分享目的地的社群網站等外部服務，經營者不保證其內容或安全性。使用外部服務時，請遵守各服務的使用條款等。"),
        ],
      },
      {
        heading: "第9條（服務的變更、中斷與終止）",
        items: [
          p("經營者得不經事先通知，變更、新增或終止本服務內容的全部或部分。"),
          p("有下列任一情形時，經營者得暫時中斷本服務的全部或部分。"),
          ul(
            "進行系統維護、檢查或更新時",
            "因天災、停電、通訊障礙等不可抗力而難以提供時",
            "主機代管等本服務所使用的外部服務發生故障時",
            "其他經營者認為不得已的情形",
          ),
        ],
      },
      {
        heading: "第10條（免責事項）",
        items: [
          p("經營者不保證內容的正確性、完整性、有用性、對特定目的的適用性，也不保證本服務可不中斷地使用。"),
          p("對於因使用或無法使用本服務而使用戶遭受的損害，經營者不負責任。"),
          p("但因經營者故意或重大過失等，依日本《消費者契約法》或其他法令不得免除經營者責任的情形，不適用前項規定。即使在此情形下，經營者因輕過失所負的賠償責任，以通常可能發生的損害為限（因特殊情事所生的損害除外）。"),
          p("用戶之間，或用戶與第三方之間發生的糾紛，經營者不介入亦不負責任。"),
        ],
      },
      {
        heading: "第11條（使用限制）",
        items: [
          p("用戶違反本條款，或經營者判斷有違反之虞時，經營者得不經事先通知，限制該用戶存取本服務或採取其他必要措施。"),
        ],
      },
      {
        heading: "第12條（個人資料的處理）",
        items: [
          privacy("用戶的個人資料及 Cookie 等的處理，依另行訂定的", "隱私權政策", "辦理。"),
        ],
      },
      {
        heading: "第13條（條款的變更）",
        items: [
          p("因法令修正或服務內容變更等而有必要時，經營者得依日本《民法》第548條之4的規定變更本條款。"),
          p("變更本條款時，將於生效日前的相當期間內，在本頁公告變更內容及生效日。於生效日以後使用本服務者，視為已同意變更後的條款。"),
        ],
      },
      {
        heading: "第14條（可分割性）",
        items: [
          p("即使本條款的任何條文或其一部分依法令等被認定為無效或無法執行，其餘部分仍繼續有效。"),
        ],
      },
      {
        heading: "第15條（語言）",
        items: [
          p("本條款以日文版為正本。翻譯版與日文版內容不一致時，以日文版為準。"),
        ],
      },
      {
        heading: "第16條（準據法與管轄）",
        items: [
          p("本條款以日本法為準據法，並依日本法解釋。"),
          p("與本服務相關的糾紛，以經營者所在地有管轄權的法院為第一審專屬合意管轄法院。"),
        ],
      },
      {
        heading: "第17條（聯絡我們）",
        items: [
          contact("有關本條款的洽詢，請透過", "聯絡表單", "提出。"),
        ],
      },
    ],
  },

  "zh-CN": {
    title: "使用条款",
    updated: "最后更新日期：2026年9月23日",
    intro:
      "本使用条款（以下简称「本条款」）规定 Koitype（以下简称「本服务」）的使用条件，适用于所有使用本服务的人（以下简称「用户」）。使用本服务前，请先阅读本条款。本条款为日文原文的译本（请参阅第15条）。",
    sections: [
      {
        heading: "第1条（定义）",
        items: [
          p("本条款中使用的用语定义如下。"),
          ul(
            "「本服务」：经营者在 Koitype（https://koitype.com）提供的恋爱诊断、心理测试、恋爱签、恋爱博客等所有服务",
            "「经营者」：运营本服务的 Koitype 运营事务局",
            "「用户」：浏览或使用本服务的所有人",
            "「内容」：本服务上发布的文字、图片、插画、诊断与测试的题目及结果、设计、标志等",
          ),
        ],
      },
      {
        heading: "第2条（同意与适用）",
        items: [
          p("用户应在同意本条款后使用本服务。开始使用本服务时，即视为已同意本条款。"),
          p("经营者在本服务上发布的隐私政策及其他说明，构成本条款的一部分。本条款与个别说明内容不一致时，以个别说明为准。"),
          p("未成年人请在取得监护人同意后使用本服务。"),
        ],
      },
      {
        heading: "第3条（服务内容与性质）",
        items: [
          p("本服务免费提供恋爱诊断、心理测试、性格诊断、恋爱签、恋爱专栏等娱乐内容，无需注册会员。使用本服务所需的设备及通信费用由用户自行承担。"),
          p("诊断与测试结果及专栏内容，是作为娱乐与自我了解的契机而提供，并非医学、心理学或其他专业的诊断或建议，也不是对未来的预测。"),
          p("有关恋爱或人际关系的重要决定，请勿仅依赖结果，应由您自行判断。身心不适，或家暴、跟踪骚扰等涉及安全的烦恼，请咨询医疗机构或公共咨询窗口。"),
        ],
      },
      {
        heading: "第4条（禁止事项）",
        items: [
          p("用户使用本服务时，不得有下列行为。"),
          ul(
            "违反法令或公序良俗的行为，或与犯罪相关的行为",
            "侵害经营者、其他用户或第三方的著作权、商标权、肖像权、隐私或其他权利及利益的行为",
            "利用诊断结果或内容诽谤、歧视或骚扰特定人士的行为",
            "强迫他人接受诊断或测试，或强迫他人出示结果的行为",
            "对服务器或网络造成过度负荷、未经授权访问、利用漏洞或发送有害程序的行为",
            "未经经营者许可，以爬虫或抓取工具等自动化方式大量获取内容的行为（一般搜索引擎的收录除外）",
            "不当点击本服务上的广告，或请求、诱导他人点击的行为",
            "冒充经营者或第三方，或使人误以为与本服务有关的行为",
            "通过联系表单发送虚假内容、垃圾信息或大量营销信息等行为",
            "其他妨碍本服务运营的行为，或经营者基于合理理由认定为不适当的行为",
          ),
        ],
      },
      {
        heading: "第5条（知识产权与内容的使用）",
        items: [
          p("内容的著作权及其他知识产权，归经营者或合法权利人所有。"),
          p("除法令或本条款允许的情形外，禁止擅自转载、复制、修改、再分发或商业使用内容。"),
          p("引用时，请注明出处，并在符合著作权法规定的范围内进行。"),
          p("原则上可自由链接至本服务。但请避免以不易辨识为经营者内容的方式链接，例如在其他网站的框架内显示本服务页面。"),
        ],
      },
      {
        heading: "第6条（分享诊断结果）",
        items: [
          p("用户可使用本服务的分享功能或截图，将自己的诊断与测试结果以非营利目的分享至社交网站等。"),
          p("分享的内容将处于第三方可浏览的状态。因分享而产生的纠纷，请由用户自行负责处理。"),
          p("请勿在未经当事人同意的情况下公开他人的诊断结果。"),
        ],
      },
      {
        heading: "第7条（广告）",
        items: [
          p("本服务使用第三方广告服务 Google AdSense 运营。广告内容由广告业者自动决定，经营者并未推荐或保证个别商品或服务。"),
          p("有关广告链接所指向的商品或服务，请向各提供者咨询。"),
          privacy("广告所使用的 Cookie 及退出方式，记载于", "隐私政策", "。"),
        ],
      },
      {
        heading: "第8条（外部网站与外部服务）",
        items: [
          p("对于本服务链接的外部网站，以及分享目的地的社交网站等外部服务，经营者不保证其内容或安全性。使用外部服务时，请遵守各服务的使用条款等。"),
        ],
      },
      {
        heading: "第9条（服务的变更、中断与终止）",
        items: [
          p("经营者可不经事先通知，变更、新增或终止本服务内容的全部或部分。"),
          p("有下列任一情形时，经营者可暂时中断本服务的全部或部分。"),
          ul(
            "进行系统维护、检查或更新时",
            "因天灾、停电、通信故障等不可抗力而难以提供时",
            "托管等本服务所使用的外部服务发生故障时",
            "其他经营者认为不得已的情形",
          ),
        ],
      },
      {
        heading: "第10条（免责事项）",
        items: [
          p("经营者不保证内容的正确性、完整性、有用性、对特定目的的适用性，也不保证本服务可不中断地使用。"),
          p("对于因使用或无法使用本服务而使用户遭受的损害，经营者不承担责任。"),
          p("但因经营者故意或重大过失等，依日本《消费者合同法》或其他法令不得免除经营者责任的情形，不适用前款规定。即使在此情形下，经营者因轻微过失所负的赔偿责任，以通常可能发生的损害为限（因特殊情况所生的损害除外）。"),
          p("用户之间，或用户与第三方之间发生的纠纷，经营者不介入亦不承担责任。"),
        ],
      },
      {
        heading: "第11条（使用限制）",
        items: [
          p("用户违反本条款，或经营者判断有违反之虞时，经营者可不经事先通知，限制该用户访问本服务或采取其他必要措施。"),
        ],
      },
      {
        heading: "第12条（个人信息的处理）",
        items: [
          privacy("用户的个人信息及 Cookie 等的处理，依另行制定的", "隐私政策", "执行。"),
        ],
      },
      {
        heading: "第13条（条款的变更）",
        items: [
          p("因法令修订或服务内容变更等而有必要时，经营者可依日本《民法》第548条之4的规定变更本条款。"),
          p("变更本条款时，将在生效日前的相当期间内，在本页公告变更内容及生效日。在生效日以后使用本服务者，视为已同意变更后的条款。"),
        ],
      },
      {
        heading: "第14条（可分割性）",
        items: [
          p("即使本条款的任何条文或其一部分依法令等被认定为无效或无法执行，其余部分仍继续有效。"),
        ],
      },
      {
        heading: "第15条（语言）",
        items: [
          p("本条款以日文版为正本。译本与日文版内容不一致时，以日文版为准。"),
        ],
      },
      {
        heading: "第16条（准据法与管辖）",
        items: [
          p("本条款以日本法为准据法，并依日本法解释。"),
          p("与本服务相关的纠纷，以经营者所在地有管辖权的法院为第一审专属合意管辖法院。"),
        ],
      },
      {
        heading: "第17条（联系我们）",
        items: [
          contact("有关本条款的咨询，请通过", "联系表单", "提交。"),
        ],
      },
    ],
  },
};

export function getTermsContent(locale: Locale): TermsContent {
  return content[locale] ?? content.ja;
}
