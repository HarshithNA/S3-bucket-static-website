pipeline {
    agent any
    environment {
        AWS_REGION = 'us-east-1'
        S3_BUCKET  = 'chirag-static'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Chigich/static-websites-s3.git',
                    credentialsId: 'git-credentials'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install && npm run build'
            }
        }
        stage('Deploy') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access-key-id',     variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-access-key', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    sh """
                        aws configure set aws_access_key_id \$AWS_ACCESS_KEY_ID
                        aws configure set aws_secret_access_key \$AWS_SECRET_ACCESS_KEY
                        aws configure set region \${AWS_REGION}
                        aws s3 sync dist/ s3://chirag-static/ --delete
                    """
                }
            }
        }
    }
    post {
        success { echo "Deployed: http://chirag-static.s3-website-us-east-1.amazonaws.com" }
        failure { echo 'Build Failed!' }
        always  { cleanWs() }
    }
}
