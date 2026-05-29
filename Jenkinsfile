pipeline {
    agent any
    tools {
        nodejs 'NodeJS-18'
    }
    environment {
        AWS_REGION = 'eu-north-1'
        S3_BUCKET  = 'new-static-s3-bucket'
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/HarshithNA/S3-bucket-static-website'
                git credentials: 'git-dredentials'
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
                    string(credentialsId: 'AWS-credentials',     variable: 'AWS-credentials'),
                ]) {
                    sh """
                        aws configure set aws_access_key_id \$AWS_ACCESS_KEY_ID
                        aws configure set aws_secret_access_key \$AWS_SECRET_ACCESS_KEY
                        aws configure set region \${AWS_REGION}
                        aws s3 sync dist/ s3://new-static-s3-bucket/ --delete --acl public-read
                    """
                }
            }
        }
    }
    post {
        success { echo 'http://new-static-s3-bucket.s3-website.eu-north-1.amazonaws.com' }
        failure { echo 'Build Failed!' }
        always  { cleanWs() }
    }
}
