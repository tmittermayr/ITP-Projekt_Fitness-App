module.exports  = {
    publicPath: process.env.NODE_ENV  ===  'production'  ?  './'  :  '/',
    devServer: {
        proxy: {
            '/realms': {
                target: 'https://student.cloud.htl-leonding.ac.at/nextfit-keycloak', // Replace with your backend API endpoint
                changeOrigin: true,
                secure: false
            },
            '/admin': {
                target: 'https://student.cloud.htl-leonding.ac.at/nextfit-keycloak', // Replace with your backend API endpoint
                changeOrigin: true,
                secure: false
            }
        }
    }
}