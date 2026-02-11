// src/models/Order.js (DEFINIÇÃO FINAL SINCRONIZADA COM A TABELA MYSQL)

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  // ATENÇÃO: A ordem dos campos na definição do modelo não afeta o funcionamento,
  // mas o nome e o tipo TÊM de corresponder à tabela

  // 1. id (Chave Primária)
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  // 2. NUM_O.S.
  num_o_s: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  // 3. cliente (Nome do Cliente)
  cliente: {
    type: DataTypes.STRING(100), // Baseado no screenshot
    allowNull: true,
  },

  // 4. desc_trab (Descrição do Trabalho)
  desc_trab: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  // 5. data_aber
  data_aber: {
    type: DataTypes.DATEONLY, // Assumindo apenas a data
    allowNull: true,
  },

  // 6. data_recep
  data_recep: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },

  // 7. num_orc (Nº Orçamento)
  num_orc: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  // 8. formato
  formato: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },

  // 9. cores_miolo
  cores_miolo_frente: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  cores_miolo_verso: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },

  cores_especiais_miolo_frente: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  cores_especiais_miolo_verso: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },

  // Cores Capa (Frente e Verso)
  cores_capa_frente: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  cores_capa_verso: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  cores_especiais_capa_frente: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  cores_especiais_capa_verso: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },

  // 11. num_pag
  num_pag: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },

  // 12. lombada
  lombada: {
    type: DataTypes.DOUBLE, // ou FLOAT, dependendo da precisão
    allowNull: true,
  },

  // 13. observacoes_gerais
  observacoes_gerais: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  // 14. impressão
  impressao: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },

  // 15. impressão
  maquina: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },

  // 7. lineatura (Lineatura)
  lineatura_capa: {
    type: DataTypes.INTEGER,
    allowNull: true,
    set(value) {
      // Se for enviado vazio do formulário, grava NULL na BD
      this.setDataValue('lineatura_capa', value === '' ? null : value);
    }
    },

    lineatura_miolo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      set(value) {
        this.setDataValue('lineatura_miolo', value === '' ? null : value);
      }
    },

    // 16. papel_miolo
    papel_miolo: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    // 17. miolo_gramas
    miolo_gramas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    // 18. bobine_miolo
    bobine_miolo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    // 19. papel_capa
    papel_capa: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    // 20. capa_gramas
    capa_gramas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    // 21. bobine_capa
    bobine_capa: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    // 22. tiragem
    tiragem: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    // 23. provas_cor
    provas_cor: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    // 24. ozalide_digital
    ozalide_digital: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    // 25. provas_konica
    provas_konica: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    // 26. verniz_capa
    verniz_capa: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    // 27. verniz_capa_brilho_mate
    verniz_capa_brilho_mate: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    // 28. verniz_capa_geral_reservado
    verniz_capa_geral_reservado: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    // 29. verniz_capa_f_v
    verniz_capa_f_v: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    // 30. observacoes_capa
    observacoes_capa: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    // 31. verniz_miolo
    verniz_miolo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    // 32. verniz_miolo_brilho_mate
    verniz_miolo_brilho_mate: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    verniz_miolo_f_v: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    // 33. verniz_miolo_geral_reservado
    verniz_miolo_geral_reservado: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    // 34. tipo_acabamento_miolo
    tipo_acabamento_miolo: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    // 35. observacoes_miolo
    observacoes_verniz_miolo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    // 36. local_entrega
    local_entrega: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    // 37. forma_expedição
    forma_expedicao: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    // 38. quantidade_chapas
    quantidade_chapas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    // 39. operador
    operador: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    // 40. tempo_operador
    tempo_operador: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    // 41. estado (Status)
    estado: {
      type: DataTypes.STRING(30),
      defaultValue: 'Pendente',
      allowNull: true,
    },

    // 42. createdAt (Sequelize gere isto normalmente, mas é bom definir se existir na tabela)
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    // 43. updatedAt (Sequelize gere isto normalmente, mas é bom definir se existir na tabela)
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    // 44. deposito legal (Nº Orçamento)
    deposito_legal: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },


  },

  {
    // CONFIGURAÇÕES ADICIONAIS NECESSÁRIAS

    // O nome da tabela é crucial para a sincronização
    tableName: 'Orders',
    freezeTableName: true,

    // Se a sua tabela não usar as colunas createdAt e updatedAt:
    timestamps: true, // Mantenha a true se as colunas existirem, caso contrário, defina a false.
    underscored: false, // Garante que ele mantém os nomes como escreveu (num_o_s)

    // Mapeamento extra (Se as colunas tiverem nomes diferentes no modelo vs na tabela):
    // field: 'nome_da_coluna_na_bd'

    // Exemplo de mapeamento para as colunas de data/hora (se não usarem o nome por defeito):
    // createdAt: {
    //   field: 'createdAt', // Se o nome for este, não precisa
    //   type: DataTypes.DATE,
    // },
    // updatedAt: {
    //   field: 'updatedAt', // Se o nome for este, não precisa
    //   type: DataTypes.DATE,
    // },
  });





module.exports = Order;




