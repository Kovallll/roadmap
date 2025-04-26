import { useUserStore } from '@/features/user/model';
import { UserMaps } from '@/widgets/UserMaps/ui/UserMaps';

const UserMapsPage = () => {
  const user = useUserStore.use.user();

  if (!user) return <div>Загрузка...</div>;
  return <UserMaps user={user} />;
};

export default UserMapsPage;
