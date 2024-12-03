# execute in bubblewrap output directory
keytool -export -rfc -keystore android.keystore -alias android -file upload_certificate.pem
# then upload as documented in https://support.google.com/googleplay/android-developer/answer/9842756#create
# to compare the fingerprints run
 keytool -list -v -keystore android.keystore -alias android