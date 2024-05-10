pipeline {
    agent any

    stages {
        stage('Test Frontend') {
            steps {
                script {
                    git branch: 'main', url: 'https://github.com/MedianetConsulting/SI_ENFANCE_Parent_Front.git'
                    sh 'npm install'
                    sh 'npm run test' // Commande pour exécuter les tests du frontend
                }
            }
        }

        stage('Test Backend') {
            steps {
                script {
                    git branch: 'main', url: 'https://github.com/MedianetConsulting/SI_ENFANCE_Parent_Back.git'
                    sh 'dotnet restore'
                    sh 'dotnet test' // Commande pour exécuter les tests du backend
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    sh 'npm install'
                    sh 'ng build --prod'
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    sh 'dotnet restore'
                    sh 'dotnet build'
                }
            }
        }
    }

    post {
        always {
            // Actions post-build
        }
    }
}
