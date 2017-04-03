const appList = {
  'App1': {
    'nome': 'aplicativo',
    'cliente': 'empresa1',
    'url': 'http//www.app1.com',
    'status': 'up',
    'detalhesServidor': {
      'versaoPopulis': '1.0.0',
      'nomePcServidor': 'server01',
      'ipServidor': '192.168.1.10'
    }
  },
  'App2': {
    'nome': 'aplicativo',
    'cliente': 'empresa2',
    'url': 'http//www.app2.com',
    'status': 'up',
    'detalhesServidor': {
      'versaoPopulis': '1.0.0',
      'nomePcServidor': 'server01',
      'ipServidor': '192.168.1.10'
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
  appComplete,
  appList  
}
