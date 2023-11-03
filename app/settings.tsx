import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import SettingsCard from '../components/SettingsCard';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
       <Text style={styles.title}>ACCOUNT</Text>
       <SettingsCard title="Edit Profile" subTitle='Change your profile details' icon="person-outline" />
       <SettingsCard title="Privacy" subTitle='Manage your privacy settings' icon="lock-closed-outline" />
        <SettingsCard title="Security" subTitle='Manage your security settings' icon="shield-checkmark-outline" />
        <View style={styles.separator} />
       <Text style={styles.title}>ABOUT</Text>
       <SettingsCard title="Notifications" subTitle='Manage your notifications' icon="notifications-outline" />

       <SettingsCard title='Support' subTitle='Contact us for help' icon='help-circle-outline'/>
       <SettingsCard title="Terms and Conditions" subTitle='Read our terms and conditions' icon="document-text-outline" />

       <View style={styles.separator} />
       <SettingsCard title="Logout" icon="log-out-outline" subTitle='Logout from your account' />

       <View style={styles.separator} />
        <Text style={styles.title}>You joined a-round on November 5, 2021 </Text>

       

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,

  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: 'grey',
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: '80%',
  },
});
