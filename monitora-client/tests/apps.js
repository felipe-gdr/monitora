import _ from 'lodash'

const appList = {
  'App1': {
    '.key': 'empresa1_aplicativo',
    'nome': 'aplicativo',
    'cliente': 'empresa1',
    'url': 'http//www.app1.com',
    'status': 'up',
    'detalhesServidor': {
      'versaoPopulis': '1.0.0',
      'nomePcServidor': 'server01',
      'ipServidor': '192.168.1.10',
      'calculos': [
        {
          'emUsoPopulisCalculo': 'S',
          'statusPopulisCalculo': '1',
          'servicoVersionPopulisCalculo': 'v1r20m26_p0104',
          'statusStrPopulisCalculo': 'Disponível'
        },
        {
          'emUsoPopulisCalculo': 'S',
          'statusPopulisCalculo': '1',
          'servicoVersionPopulisCalculo': 'v1r20m26_p0104',
          'statusStrPopulisCalculo': 'Disponível'
        }        
      ]
    }
  },
  'App2': {
    '.key': 'empresa2_aplicativo',
    'nome': 'aplicativo',
    'cliente': 'empresa2',
    'url': 'http//www.app2.com',
    'status': 'up',
    'detalhesServidor': {
      'versaoPopulis': '1.0.0',
      'nomePcServidor': 'server01',
      'ipServidor': '192.168.1.10'
    },
    'cluster': {
      'master': {
        'nomeNode': 'master',
        'status': 'up',
        'url': 'http://192.168.1.10:8080/app2'
      },
      'slave': {
        'nomeNode': 'slave',
        'status': 'up',
        'url': 'http://192.168.1.11:8080/app2'
      }      
    }
  }
}

const appComplete = {
        'nome': 'aplicativo',
        'cliente': 'empresa2',
        'url': 'http//www.app2.com',
        'status': 'up',
        'detalhesServidor': {
          'versaoPopulis': '1.0.0',
          'nomePcServidor': 'server01',
          'ipServidor': '192.168.1.10',
          'calculos': [
            {
              'emUsoPopulisCalculo': 'S',
              'statusPopulisCalculo': '1'
            },
            {
              'emUsoPopulisCalculo': 'S',
              'statusPopulisCalculo': '1'
            }        
          ]
        },
        'cluster': {
          'master': {
            'nomeNode': 'master',
            'status': 'up'
          },
          'slave': {
            'nomeNode': 'slave',
            'status': 'up'
          }      
        }
      }    
  
module.exports = {
  appComplete: () => _.cloneDeep(appComplete),
  appList: () => _.cloneDeep(appList)
}
