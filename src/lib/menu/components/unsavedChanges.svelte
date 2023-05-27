<script>
    import { browser } from "$app/environment";
    import { beforeNavigate } from "$app/navigation";
    import { onDestroy } from "svelte";

    export let unsavedChanges = true;

    if (browser) {
        /** @param {BeforeUnloadEvent} e */
        function confirmLeavePage(e) {
            if (!unsavedChanges) {
                return undefined;
            }
            var confirmationMessage =
                "It looks like you have been editing something. " +
                "If you leave before saving, your changes will be lost.";
            (e || window.event).returnValue = confirmationMessage; //Gecko + IE
            return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
        }
        window.addEventListener("beforeunload", confirmLeavePage);
        onDestroy(() => {
            window.removeEventListener("beforeunload", confirmLeavePage);
        });
        beforeNavigate((navigation) => {
            console.log("before");
            if (!unsavedChanges) {
                return;
            }
            if (!window.confirm("Do you really want to leave?")) {
                navigation.cancel();
            }
        });
    }
</script>
