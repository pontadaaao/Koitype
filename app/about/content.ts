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

export type AboutContentData = {
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
};

const content: Record<Locale, AboutContentData> = {
  ja: {
    title: "運営者情報・サイトについて",
    updated: "最終更新日：2026年9月18日",
    intro:
      "Koitype（コイタイプ）は、恋愛のタイプや相性を「診断」と「心理テスト」で気軽に確かめられる無料のWebメディアです。片思い中の方から、パートナーとの関係を見つめ直したい方まで、自分の恋愛の傾向を言葉にするきっかけを提供しています。登録もアプリのインストールも必要ありません。",
    sections: [
      {
        heading: "提供しているコンテンツ",
        items: [
          {
            type: "p",
            text: "本サイトでは、次の4種類のコンテンツを公開しています。いずれも無料で、すべてKoitype編集部が企画・制作したオリジナルです。",
          },
          {
            type: "ul",
            items: [
              "恋愛診断（全37種）：5〜10問程度の設問に答えると、愛着スタイル・恋愛スタイル・束縛度などの観点から複数タイプのいずれかを判定します。結果では、そのタイプの特徴、恋愛でのクセ、相性、関わり方のヒントまで読めます。",
              "恋愛心理テスト（全79種）：1問だけに答える、数十秒で終わる手軽なテストです。診断ほど詳しくはありませんが、話のきっかけとして楽しめます。",
              "恋みくじ：その日の恋愛運をおみくじ形式で引けるコンテンツです。",
              "恋愛ブログ：片思い・カップル・復縁・マッチングアプリなどのテーマごとに、具体的な場面と対処を扱う読み物を掲載しています。",
            ],
          },
        ],
      },
      {
        heading: "診断・心理テストの位置づけ",
        items: [
          {
            type: "p",
            text: "本サイトの診断・心理テストは、恋愛でよく見られる行動や考え方のパターンを、編集部が独自に整理して分類したものです。心理学の一般的な考え方（愛着理論など）を参考にした設問はありますが、学術的な検査を再現したものではなく、精度の検証や専門家による監修は行っていません。",
          },
          {
            type: "p",
            text: "そのため、結果は「自分を説明する正解」ではなく、自分の傾向を言葉にして眺めてみるためのきっかけとしてお使いください。当てはまらないと感じた部分は、そのまま流していただいてかまいません。",
          },
          {
            type: "p",
            text: "本サイトのコンテンツは医学的・心理学的な診断や治療の代わりにはなりません。気分の落ち込みが続く、日常生活に支障が出ているなど、心身の不調を感じる場合は、医療機関や公的な相談窓口にご相談ください。",
          },
        ],
      },
      {
        heading: "コンテンツの制作方針",
        items: [
          {
            type: "p",
            text: "記事や診断をつくるときに、編集部で決めているルールです。",
          },
          {
            type: "ul",
            items: [
              "体験談・アンケート結果・監修者など、実在しないものを装って書かない。",
              "統計や専門的な主張を使うときは、確認できる出典を本文に示す。",
              "「男はこう」「女はこう」といった決めつけや、相手を思いどおりに動かすための手口は扱わない。",
              "相手の同意を軽んじる行動や、相手を傷つける手段をすすめない。",
              "タイトルと本文の内容を一致させ、読んで分からないままにしない。",
              "他サイトの文章を転載せず、すべて編集部が書き下ろす。",
            ],
          },
        ],
      },
      {
        heading: "内容の訂正・ご指摘について",
        items: [
          {
            type: "pLink",
            before:
              "掲載内容に誤りや、事実と異なる記述を見つけられた場合は、",
            linkText: "お問い合わせフォーム",
            after:
              "からお知らせください。確認のうえ、記事の修正・追記、または該当箇所の削除を行います。診断の判定がおかしいと感じた場合のご報告も、同じ窓口で受け付けています。",
          },
        ],
      },
      {
        heading: "広告について",
        items: [
          {
            type: "p",
            text: "本サイトは、第三者配信の広告（Google AdSense）による収益で運営しています。広告の内容は配信事業者が自動的に決定するもので、Koitypeが個別の商品・サービスを推薦したり、内容を保証したりするものではありません。",
          },
          {
            type: "intLink",
            before:
              "Cookieの利用や広告配信の詳細、オプトアウトの方法については、",
            linkText: "プライバシーポリシー",
            href: "/privacy-policy",
            after: "をご覧ください。",
          },
        ],
      },
      {
        heading: "サイト情報",
        items: [
          {
            type: "ul",
            items: [
              "サイト名：Koitype（コイタイプ）",
              "URL：https://koitype.com",
              "開設：2026年7月",
              "運営者：Koitype運営事務局",
              "コンテンツの企画・制作：Koitype編集部",
            ],
          },
          {
            type: "pLink",
            before: "ご連絡は、",
            linkText: "お問い合わせフォーム",
            after: "よりお願いいたします。",
          },
        ],
      },
    ],
  },

  en: {
    title: "About Koitype",
    updated: "Last updated: September 18, 2026",
    intro:
      "Koitype is a free web media where you can explore your love style and compatibility through quizzes and psychological tests. From those with a secret crush to those rethinking a current relationship, we help you put your own tendencies in love into words. No sign-up and no app required.",
    sections: [
      {
        heading: "What we publish",
        items: [
          {
            type: "p",
            text: "The Site publishes four kinds of content. All of it is free and originally planned and written by the Koitype editorial team.",
          },
          {
            type: "ul",
            items: [
              "Love quizzes (37 in total): answer roughly 5–10 questions and you are matched to one of several types, viewed through lenses such as attachment style, love style or possessiveness. The result explains that type's traits, habits in relationships, compatibility and how to work with it.",
              "Psychological tests (79 in total): a single question that takes less than a minute. Lighter than the quizzes, and made to be a conversation starter.",
              "Koi-mikuji: a fortune-slip style reading of the day's romantic luck.",
              "Blog: articles organised by theme — unrequited love, couples, getting back together, dating apps — dealing with concrete situations and what to do about them.",
            ],
          },
        ],
      },
      {
        heading: "How to read the results",
        items: [
          {
            type: "p",
            text: "Our quizzes and tests are the editorial team's own way of organising patterns of behaviour and thinking that are common in relationships. Some questions draw on general ideas from psychology, such as attachment theory, but they do not reproduce any academic instrument. We have not validated their accuracy, and they are not supervised by a specialist.",
          },
          {
            type: "p",
            text: "So please treat a result not as the correct answer about who you are, but as a prompt for looking at your own tendencies in words. If part of it does not fit you, feel free to leave it.",
          },
          {
            type: "p",
            text: "This content is not a substitute for medical or psychological diagnosis or treatment. If you feel persistently low, or daily life has become difficult, please consult a medical institution or an official support service.",
          },
        ],
      },
      {
        heading: "Our editorial rules",
        items: [
          {
            type: "p",
            text: "These are the rules the editorial team works to when writing articles and quizzes.",
          },
          {
            type: "ul",
            items: [
              "Never invent personal accounts, survey results or expert supervisors that do not exist.",
              "When using statistics or specialist claims, cite a source the reader can check.",
              "Avoid blanket statements about how \"men\" or \"women\" are, and avoid tactics for manipulating another person.",
              "Never recommend behaviour that disregards the other person's consent or that would hurt them.",
              "Keep the title and the body consistent, and answer the question the title raises.",
              "Write everything ourselves; never republish text from other sites.",
            ],
          },
        ],
      },
      {
        heading: "Corrections",
        items: [
          {
            type: "pLink",
            before:
              "If you find an error or a statement that does not match the facts, please tell us through the ",
            linkText: "contact form",
            after:
              ". We will check it and correct, add to, or remove the content in question. Reports that a quiz result seems wrong are welcome at the same address.",
          },
        ],
      },
      {
        heading: "Advertising",
        items: [
          {
            type: "p",
            text: "The Site is funded by third-party advertising (Google AdSense). Ad content is selected automatically by the ad provider; Koitype does not endorse or guarantee any individual product or service shown.",
          },
          {
            type: "intLink",
            before:
              "For details of cookie use, ad delivery and how to opt out, please see our ",
            linkText: "privacy policy",
            href: "/privacy-policy",
            after: ".",
          },
        ],
      },
      {
        heading: "Site information",
        items: [
          {
            type: "ul",
            items: [
              "Site name: Koitype",
              "URL: https://koitype.com",
              "Launched: July 2026",
              "Operator: Koitype Operations Office",
              "Content planning and production: Koitype Editorial Team",
            ],
          },
          {
            type: "pLink",
            before: "To get in touch, please use the ",
            linkText: "contact form",
            after: ".",
          },
        ],
      },
    ],
  },

  ko: {
    title: "운영자 정보·사이트 소개",
    updated: "최종 업데이트: 2026년 9월 18일",
    intro:
      "Koitype(코이타입)는 연애 유형과 궁합을 '진단'과 '심리 테스트'로 가볍게 확인할 수 있는 무료 웹 미디어입니다. 짝사랑 중인 분부터 연인과의 관계를 다시 살펴보고 싶은 분까지, 자신의 연애 성향을 말로 표현해 볼 계기를 제공합니다. 회원가입이나 앱 설치는 필요하지 않습니다.",
    sections: [
      {
        heading: "제공하는 콘텐츠",
        items: [
          {
            type: "p",
            text: "본 사이트에서는 다음 네 가지 콘텐츠를 공개하고 있습니다. 모두 무료이며, 전부 Koitype 편집부가 기획·제작한 오리지널입니다.",
          },
          {
            type: "ul",
            items: [
              "연애 진단(총 37종): 5~10문항 정도에 답하면 애착 스타일, 연애 스타일, 구속 정도 등의 관점에서 여러 유형 중 하나를 판정합니다. 결과에서는 해당 유형의 특징, 연애에서의 습관, 궁합, 관계를 풀어가는 힌트까지 읽을 수 있습니다.",
              "연애 심리 테스트(총 79종): 한 문항만 답하는, 수십 초면 끝나는 가벼운 테스트입니다. 진단만큼 상세하지는 않지만 대화의 계기로 즐길 수 있습니다.",
              "연애 운세: 그날의 연애운을 제비뽑기 형식으로 볼 수 있는 콘텐츠입니다.",
              "연애 블로그: 짝사랑·커플·재회·소개팅 앱 등 주제별로 구체적인 상황과 대처를 다루는 읽을거리를 게재합니다.",
            ],
          },
        ],
      },
      {
        heading: "진단·심리 테스트의 위치",
        items: [
          {
            type: "p",
            text: "본 사이트의 진단·심리 테스트는 연애에서 흔히 보이는 행동과 사고 패턴을 편집부가 독자적으로 정리해 분류한 것입니다. 애착 이론 등 심리학의 일반적인 개념을 참고한 문항은 있으나, 학술적인 검사를 재현한 것은 아니며 정확성 검증이나 전문가 감수는 이루어지지 않았습니다.",
          },
          {
            type: "p",
            text: "따라서 결과는 '나를 설명하는 정답'이 아니라, 자신의 성향을 말로 옮겨 바라보기 위한 계기로 사용해 주세요. 맞지 않는다고 느껴지는 부분은 그대로 흘려보내셔도 괜찮습니다.",
          },
          {
            type: "p",
            text: "본 사이트의 콘텐츠는 의학적·심리학적 진단이나 치료를 대신하지 않습니다. 기분 저하가 지속되거나 일상생활에 지장이 있는 등 심신의 이상을 느끼신다면 의료기관이나 공적 상담 창구에 상담해 주세요.",
          },
        ],
      },
      {
        heading: "콘텐츠 제작 방침",
        items: [
          {
            type: "p",
            text: "기사와 진단을 만들 때 편집부가 지키는 규칙입니다.",
          },
          {
            type: "ul",
            items: [
              "체험담·설문 결과·감수자 등 실재하지 않는 것을 있는 것처럼 쓰지 않는다.",
              "통계나 전문적 주장을 사용할 때는 확인 가능한 출처를 본문에 제시한다.",
              "'남자는 이렇다', '여자는 이렇다' 같은 단정이나, 상대를 뜻대로 움직이기 위한 수법은 다루지 않는다.",
              "상대의 동의를 가볍게 여기는 행동이나 상대에게 상처를 주는 수단을 권하지 않는다.",
              "제목과 본문의 내용을 일치시키고, 읽고 나서도 답을 알 수 없게 두지 않는다.",
              "다른 사이트의 문장을 전재하지 않고 모두 편집부가 직접 쓴다.",
            ],
          },
        ],
      },
      {
        heading: "내용 정정 및 지적",
        items: [
          {
            type: "pLink",
            before: "게재 내용에 오류나 사실과 다른 기술을 발견하신 경우 ",
            linkText: "문의 양식",
            after:
              "을 통해 알려 주세요. 확인 후 기사의 수정·추가 또는 해당 부분의 삭제를 진행합니다. 진단 판정이 이상하다고 느끼신 경우의 제보도 같은 창구에서 받고 있습니다.",
          },
        ],
      },
      {
        heading: "광고에 대하여",
        items: [
          {
            type: "p",
            text: "본 사이트는 제3자 광고(Google AdSense) 수익으로 운영되고 있습니다. 광고 내용은 광고 사업자가 자동으로 결정하는 것으로, Koitype가 개별 상품·서비스를 추천하거나 내용을 보증하는 것은 아닙니다.",
          },
          {
            type: "intLink",
            before: "쿠키 이용과 광고 게재의 상세, 옵트아웃 방법에 대해서는 ",
            linkText: "개인정보처리방침",
            href: "/privacy-policy",
            after: "을 참고해 주세요.",
          },
        ],
      },
      {
        heading: "사이트 정보",
        items: [
          {
            type: "ul",
            items: [
              "사이트명: Koitype(코이타입)",
              "URL: https://koitype.com",
              "개설: 2026년 7월",
              "운영자: Koitype 운영사무국",
              "콘텐츠 기획·제작: Koitype 편집부",
            ],
          },
          {
            type: "pLink",
            before: "연락은 ",
            linkText: "문의 양식",
            after: "을 이용해 주세요.",
          },
        ],
      },
    ],
  },

  "zh-TW": {
    title: "營運者資訊・關於本站",
    updated: "最後更新日：2026年9月18日",
    intro:
      "Koitype 是能透過「測驗」與「心理測驗」輕鬆了解戀愛類型與契合度的免費網路媒體。從正在單戀的人，到想重新檢視與伴侶關係的人，我們提供一個把自己的戀愛傾向化為文字的契機。無須註冊，也不用安裝應用程式。",
    sections: [
      {
        heading: "本站提供的內容",
        items: [
          {
            type: "p",
            text: "本站公開下列四種內容，全部免費，且皆由 Koitype 編輯部企劃與製作的原創作品。",
          },
          {
            type: "ul",
            items: [
              "戀愛測驗（共 37 種）：回答約 5～10 題後，會從依附風格、戀愛風格、佔有慾等角度判定您屬於哪一種類型。結果會說明該類型的特徵、戀愛中的習慣、契合度，以及相處的提示。",
              "戀愛心理測驗（共 79 種）：只需回答一題、數十秒即可完成的輕鬆測驗。雖不如測驗詳盡，但很適合當作聊天的開場。",
              "戀愛御籤：以抽籤形式查看當日戀愛運勢的內容。",
              "戀愛部落格：依單戀、情侶、復合、交友軟體等主題，刊載處理具體情境與應對方式的文章。",
            ],
          },
        ],
      },
      {
        heading: "測驗結果的定位",
        items: [
          {
            type: "p",
            text: "本站的測驗與心理測驗，是編輯部自行整理戀愛中常見的行為與思考模式後所做的分類。部分題目參考了依附理論等心理學的一般概念，但並非重現學術量表，也未進行準確性驗證或專家審訂。",
          },
          {
            type: "p",
            text: "因此請把結果當作把自身傾向化為文字、重新審視自己的契機，而不是「說明您是誰的正確答案」。若覺得某些描述不符合您，略過即可。",
          },
          {
            type: "p",
            text: "本站內容無法取代醫學或心理學的診斷與治療。若持續情緒低落，或日常生活出現困難等身心不適，請諮詢醫療機構或公立諮詢窗口。",
          },
        ],
      },
      {
        heading: "內容製作方針",
        items: [
          {
            type: "p",
            text: "這是編輯部在撰寫文章與測驗時遵守的規則。",
          },
          {
            type: "ul",
            items: [
              "不虛構體驗談、問卷結果或審訂者等不存在的事物。",
              "使用統計或專業主張時，於內文標示可查證的出處。",
              "不採用「男生就是這樣」「女生就是那樣」的武斷說法，也不介紹操控對方的手段。",
              "不建議輕忽對方意願的行為，或會傷害對方的做法。",
              "讓標題與內文一致，不讓讀者看完仍得不到答案。",
              "不轉載其他網站的文字，全部由編輯部親自撰寫。",
            ],
          },
        ],
      },
      {
        heading: "內容的更正與指正",
        items: [
          {
            type: "pLink",
            before: "若您發現刊載內容有誤或與事實不符，請透過",
            linkText: "聯絡表單",
            after:
              "告知我們。我們會確認後進行修正、補充，或刪除該部分。若您覺得測驗判定有問題，也歡迎透過同一窗口回報。",
          },
        ],
      },
      {
        heading: "關於廣告",
        items: [
          {
            type: "p",
            text: "本站以第三方廣告（Google AdSense）的收益營運。廣告內容由廣告供應商自動決定，Koitype 並不推薦或保證其中的個別商品與服務。",
          },
          {
            type: "intLink",
            before: "關於 Cookie 的使用、廣告投放細節與停用方式，請參閱",
            linkText: "隱私權政策",
            href: "/privacy-policy",
            after: "。",
          },
        ],
      },
      {
        heading: "網站資訊",
        items: [
          {
            type: "ul",
            items: [
              "網站名稱：Koitype",
              "網址：https://koitype.com",
              "開站：2026年7月",
              "營運者：Koitype 營運事務局",
              "內容企劃與製作：Koitype 編輯部",
            ],
          },
          {
            type: "pLink",
            before: "如需聯繫，請使用",
            linkText: "聯絡表單",
            after: "。",
          },
        ],
      },
    ],
  },

  "zh-CN": {
    title: "运营者信息・关于本站",
    updated: "最后更新日期：2026年9月18日",
    intro:
      "Koitype 是能通过“测试”与“心理测试”轻松了解恋爱类型与契合度的免费网络媒体。从正在暗恋的人，到想重新审视与伴侣关系的人，我们提供一个把自己的恋爱倾向化为文字的契机。无需注册，也不用安装应用。",
    sections: [
      {
        heading: "本站提供的内容",
        items: [
          {
            type: "p",
            text: "本站公开下列四种内容，全部免费，且均为 Koitype 编辑部策划与制作的原创作品。",
          },
          {
            type: "ul",
            items: [
              "恋爱测试（共 37 种）：回答约 5～10 道题后，会从依恋风格、恋爱风格、占有欲等角度判定您属于哪一种类型。结果会说明该类型的特征、恋爱中的习惯、契合度，以及相处的提示。",
              "恋爱心理测试（共 79 种）：只需回答一道题、数十秒即可完成的轻松测试。虽不如测试详尽，但很适合作为聊天的开场。",
              "恋爱签：以抽签形式查看当日恋爱运势的内容。",
              "恋爱博客：按暗恋、情侣、复合、交友软件等主题，刊载处理具体情境与应对方式的文章。",
            ],
          },
        ],
      },
      {
        heading: "测试结果的定位",
        items: [
          {
            type: "p",
            text: "本站的测试与心理测试，是编辑部自行整理恋爱中常见的行为与思考模式后所做的分类。部分题目参考了依恋理论等心理学的一般概念，但并非重现学术量表，也未进行准确性验证或专家审订。",
          },
          {
            type: "p",
            text: "因此请把结果当作把自身倾向化为文字、重新审视自己的契机，而不是“说明您是谁的正确答案”。若觉得某些描述不符合您，略过即可。",
          },
          {
            type: "p",
            text: "本站内容无法取代医学或心理学的诊断与治疗。若持续情绪低落，或日常生活出现困难等身心不适，请咨询医疗机构或公共咨询窗口。",
          },
        ],
      },
      {
        heading: "内容制作方针",
        items: [
          {
            type: "p",
            text: "这是编辑部在撰写文章与测试时遵守的规则。",
          },
          {
            type: "ul",
            items: [
              "不虚构体验谈、问卷结果或审订者等不存在的事物。",
              "使用统计或专业主张时，在正文中标明可查证的出处。",
              "不采用“男生就是这样”“女生就是那样”的武断说法，也不介绍操控对方的手段。",
              "不建议轻视对方意愿的行为，或会伤害对方的做法。",
              "让标题与正文一致，不让读者看完仍得不到答案。",
              "不转载其他网站的文字，全部由编辑部亲自撰写。",
            ],
          },
        ],
      },
      {
        heading: "内容的更正与指正",
        items: [
          {
            type: "pLink",
            before: "若您发现刊载内容有误或与事实不符，请通过",
            linkText: "联系表单",
            after:
              "告知我们。我们会确认后进行修正、补充，或删除该部分。若您觉得测试判定有问题，也欢迎通过同一窗口反馈。",
          },
        ],
      },
      {
        heading: "关于广告",
        items: [
          {
            type: "p",
            text: "本站以第三方广告（Google AdSense）的收益运营。广告内容由广告供应商自动决定，Koitype 并不推荐或保证其中的个别商品与服务。",
          },
          {
            type: "intLink",
            before: "关于 Cookie 的使用、广告投放细节与停用方式，请参阅",
            linkText: "隐私政策",
            href: "/privacy-policy",
            after: "。",
          },
        ],
      },
      {
        heading: "网站信息",
        items: [
          {
            type: "ul",
            items: [
              "网站名称：Koitype",
              "网址：https://koitype.com",
              "开站：2026年7月",
              "运营者：Koitype 运营事务局",
              "内容策划与制作：Koitype 编辑部",
            ],
          },
          {
            type: "pLink",
            before: "如需联系，请使用",
            linkText: "联系表单",
            after: "。",
          },
        ],
      },
    ],
  },
};

export function getAboutContent(locale: Locale): AboutContentData {
  return content[locale] ?? content.ja;
}
