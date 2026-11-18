import { PlaceholderScreen } from "@/components/core";
import { testIds } from "@/constants/test-ids";

export default function ProfileScreen() {
  return (
    <PlaceholderScreen
      title="Profile"
      description="Account screen. Manage user details and preferences here."
      testID={testIds.profile.screen}
      headerTestID={testIds.profile.header}
      titleTestID={testIds.profile.title}
      descriptionTestID={testIds.profile.description}
    />
  );
}
