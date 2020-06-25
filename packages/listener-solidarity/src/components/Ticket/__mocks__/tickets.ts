export default {
  tickets: {
    case_one: [
      {
        id: 16866,
        external_id: "1273183",
        created_at: "2020-01-29T20:47:52Z",
        subject: "[Psicológico] Teste, Curitiba - PR",
        description: "Importado pelo BONDE.",
        status: "new",
        requester_id: 393261194131,
        submitter_id: 393261194131,
        organization_id: 360273031591,
        fields: [
          { id: 360017056851, value: "2020-01-27" },
          { id: 360014379412, value: "solicitação_recebida" },
          { id: 360016681971, value: "Teste" }
        ]
      },
      {
        id: 20073,
        external_id: "1274029",
        created_at: "2020-06-10T15:31:25Z",
        subject: "[Psicológico] Teste, Curitiba - PR",
        description:
          "MSR já possui uma solicitação com o mesmo tipo de pedido de acolhimento nos seguintes tickets: 16866",
        status: "pending",
        requester_id: 393261194131,
        submitter_id: 393261194131,
        organization_id: 360273031591,
        fields: [
          { id: 360017056851, value: "2020-02-06" },
          { id: 360014379412, value: "solicitação_repetida" },
          { id: 360032229831, value: "16866" },
          { id: 360016681971, value: "Teste" }
        ]
      }
    ],
    case_two: [
      {
        id: 19895,
        created_at: "2020-06-04T18:41:25Z",
        subject: "[Psicológico] Camila, Cuiabá - MT",
        description: "Importado pelo BONDE.",
        status: "pending",
        requester_id: 398420465092,
        organization_id: 360273031591,
        fields: [
          { id: 360021879811, value: null },
          { id: 360016631592, value: null },
          { id: 360017432652, value: null },
          { id: 360016631632, value: null },
          { id: 360017056851, value: "2020-05-27" },
          { id: 360021665652, value: null },
          { id: 360014379412, value: "atendimento__iniciado" },
          { id: 360032229831, value: null },
          { id: 360021812712, value: null },
          { id: 360021879791, value: null },
          { id: 360016681971, value: "Camila" }
        ]
      }
    ],
    mixed: [
      {
        id: 19855,
        subject: "[Jurídico] Camila, Cuiabá - MT",
        status: "closed",
        fields: [
          {
            id: 360021879811,
            value: null
          },
          {
            id: 360016631592,
            value: null
          },
          {
            id: 360017432652,
            value: null
          },
          {
            id: 360016631632,
            value: null
          },
          {
            id: 360017056851,
            value: "2020-05-27"
          },
          {
            id: 360021665652,
            value: null
          },
          {
            id: 360014379412,
            value: "solicitação_recebida"
          },
          {
            id: 360021812712,
            value: null
          },
          {
            id: 360021879791,
            value: null
          },
          {
            id: 360016681971,
            value: "Camila"
          }
        ]
      },
      {
        id: 19894,
        subject: "[Psicológico] Igor, Belo Horizonte - MG",
        status: "pending",
        fields: [
          {
            id: 360021879811,
            value: null
          },
          {
            id: 360016631592,
            value: null
          },
          {
            id: 360017432652,
            value: "2020-06-04"
          },
          {
            id: 360016631632,
            value: null
          },
          {
            id: 360017056851,
            value: "2020-05-08"
          },
          {
            id: 360021665652,
            value: null
          },
          {
            id: 360014379412,
            value: "encaminhamento__realizado"
          },
          {
            id: 360021812712,
            value: null
          },
          {
            id: 360021879791,
            value: null
          },
          {
            id: 360016681971,
            value: "Igor"
          }
        ]
      }
    ],
    meets_no_conditions: [
      {
        id: 19892,
        subject: "[Psicológico] Viviane, Taubaté - SP",
        status: "new",
        fields: [
          {
            id: 360021879811,
            value: null
          },
          {
            id: 360016631592,
            value: null
          },
          {
            id: 360017432652,
            value: null
          },
          {
            id: 360016631632,
            value: null
          },
          {
            id: 360017056851,
            value: "2020-05-27"
          },
          {
            id: 360021665652,
            value: null
          },
          {
            id: 360014379412,
            value: "encaminhamento__negado"
          },
          {
            id: 360021812712,
            value: null
          },
          {
            id: 360021879791,
            value: null
          },
          {
            id: 360016681971,
            value: "Viviane"
          }
        ]
      }
    ]
  },
  users: {
    volunteers: [
      {
        name: "Meire Leite",
        role: "end-user",
        organization_id: 360269610652,
        email: "meire@email.com",
        external_id: "2000374",
        phone: "12988805543",
        verified: true,
        user_fields: {
          tipo_de_acolhimento: null,
          condition: "desabilitada",
          state: "",
          city: "",
          cep: "12070650",
          address: "",
          whatsapp: "12988805543",
          registration_number: "21312312",
          occupation_area: null,
          disponibilidade_de_atendimentos: "5_ou_mais",
          data_de_inscricao_no_bonde: "2020-05-29T00:27:23.780153"
        }
      },
      {
        name: "Maoela Coelho",
        role: "end-user",
        organization_id: 360269610652,
        email: "manoela@email.com",
        external_id: "2000375",
        phone: "12988805543",
        verified: true,
        user_fields: {
          tipo_de_acolhimento: null,
          condition: "desabilitada",
          state: "",
          city: "",
          cep: "12050-181",
          address: "",
          whatsapp: "12988805543",
          registration_number: "21312312",
          occupation_area: null,
          disponibilidade_de_atendimentos: "2",
          data_de_inscricao_no_bonde: "2020-05-29T00:28:29.55569"
        }
      }
    ],
    individuals: [
      {
        name: "Igor",
        role: "end-user",
        organization_id: 360273031591,
        email: "igor@nossas.org",
        external_id: "2000302",
        phone: "",
        verified: true,
        user_fields: {
          tipo_de_acolhimento: "psicológico",
          condition: "inscrita",
          state: "MG",
          city: "Belo Horizonte",
          cep: "",
          address: "Belo Horizonte, State of Minas Gerais, Brazil",
          whatsapp: null,
          registration_number: null,
          occupation_area: null,
          disponibilidade_de_atendimentos: "",
          data_de_inscricao_no_bonde: "2020-05-08T12:37:01.553574",
          latitude: "-19.9166813",
          longitude: "-43.9344931"
        },
        tipo_de_acolhimento: "psicológico",
        condition: "inscrita",
        state: "MG",
        city: "Belo Horizonte",
        cep: "",
        address: "Belo Horizonte, State of Minas Gerais, Brazil",
        whatsapp: null,
        registration_number: null,
        occupation_area: null,
        disponibilidade_de_atendimentos: "",
        data_de_inscricao_no_bonde: "2020-05-08T12:37:01.553574",
        latitude: "-19.9166813",
        longitude: "-43.9344931",
        community_id: 40,
        user_id: 398426996571
      },
      {
        name: "Viviane",
        role: "end-user",
        organization_id: 360273031591,
        email: "vivi@gmail.com",
        external_id: "2000364",
        phone: "",
        verified: true,
        user_fields: {
          tipo_de_acolhimento: "psicológico_e_jurídico",
          condition: "inscrita",
          state: "SP",
          city: "Taubaté",
          cep: "",
          address: "Taubaté - State of São Paulo, Brazil",
          whatsapp: null,
          registration_number: null,
          occupation_area: null,
          disponibilidade_de_atendimentos: "",
          data_de_inscricao_no_bonde: "2020-05-27T13:14:24.678628",
          latitude: "-23.0225753",
          longitude: "-45.5486715"
        },
        tipo_de_acolhimento: "psicológico_e_jurídico",
        condition: "inscrita",
        state: "SP",
        city: "Taubaté",
        cep: "",
        address: "Taubaté - State of São Paulo, Brazil",
        whatsapp: null,
        registration_number: null,
        occupation_area: null,
        disponibilidade_de_atendimentos: "",
        data_de_inscricao_no_bonde: "2020-05-27T13:14:24.678628",
        latitude: "-23.0225753",
        longitude: "-45.5486715",
        community_id: 40,
        user_id: 398420465072
      },
      {
        name: "Camila",
        role: "end-user",
        organization_id: 360273031591,
        email: "camila@email.com",
        external_id: "2000365",
        phone: "",
        verified: true,
        user_fields: {
          tipo_de_acolhimento: "psicológico",
          condition: "inscrita",
          state: "MT",
          city: "Cuiabá",
          cep: "",
          address:
            "Cuiabá - Coxipó da Ponte, Cuiabá - State of Mato Grosso, Brazil",
          whatsapp: null,
          registration_number: null,
          occupation_area: null,
          disponibilidade_de_atendimentos: "",
          data_de_inscricao_no_bonde: "2020-05-27T13:15:47.93393",
          latitude: "-15.60086",
          longitude: "-56.0968227"
        },
        tipo_de_acolhimento: "psicológico",
        condition: "inscrita",
        state: "MT",
        city: "Cuiabá",
        cep: "",
        address:
          "Cuiabá - Coxipó da Ponte, Cuiabá - State of Mato Grosso, Brazil",
        whatsapp: null,
        registration_number: null,
        occupation_area: null,
        disponibilidade_de_atendimentos: "",
        data_de_inscricao_no_bonde: "2020-05-27T13:15:47.93393",
        latitude: "-15.60086",
        longitude: "-56.0968227",
        community_id: 40,
        user_id: 398420465092
      }
    ]
  },
  results: [
    {
      comment: {
        body: "Importado pelo BONDE.",
        public: false
      },
      external_id: "2000302",
      requester_id: 398426996571,
      custom_fields: [
        {
          id: 360017056851,
          value: "2020-05-08"
        },
        {
          id: 360014379412,
          value: "solicitação_recebida"
        },
        {
          id: 360016681971,
          value: "Igor"
        }
      ],
      subject: "[Psicológico] Igor, Belo Horizonte - MG"
    },
    {
      comment: {
        body: "Importado pelo BONDE.",
        public: false
      },
      external_id: "2000364",
      requester_id: 398420465072,
      custom_fields: [
        {
          id: 360017056851,
          value: "2020-05-27"
        },
        {
          id: 360014379412,
          value: "solicitação_recebida"
        },
        {
          id: 360016681971,
          value: "Viviane"
        }
      ],
      subject: "[Psicológico] Viviane, Taubaté - SP"
    },
    {
      comment: {
        body: "Importado pelo BONDE.",
        public: false
      },
      requester_id: 398420465072,
      custom_fields: [
        {
          id: 360017056851,
          value: "2020-05-27"
        },
        {
          id: 360014379412,
          value: "solicitação_recebida"
        },
        {
          id: 360016681971,
          value: "Viviane"
        }
      ],
      external_id: "2000364",
      subject: "[Jurídico] Viviane, Taubaté - SP"
    },
    {
      comment: {
        body: "Importado pelo BONDE.",
        public: false
      },
      requester_id: 398420465092,
      custom_fields: [
        {
          id: 360017056851,
          value: "2020-05-27"
        },
        {
          id: 360014379412,
          value: "solicitação_recebida"
        },
        {
          id: 360016681971,
          value: "Camila"
        }
      ],
      external_id: "2000365",
      subject: "[Psicológico] Camila, Cuiabá - MT"
    }
  ]
};
