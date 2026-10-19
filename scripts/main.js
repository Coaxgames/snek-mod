"use strict";
let {chainContainerBuilding, chainCoreBuilding} = require("chain_buildings");

const stopCoresAtCapacitySetting = "snek-mod-stop-cores-at-capacity";

Events.on(EventType.ClientLoadEvent, cons(e => {
    if (Core.settings.getBool(stopCoresAtCapacitySetting, false)) {
        Vars.content.blocks().each(block => {
            if (block instanceof Incinerator) {
                let requirements = new Seq();
                for (let i = 0; i < block.requirements.length; i++) {
                    let requirement = block.requirements[i];
                    if (requirement.item != Items.graphite) {
                        requirements.add(requirement);
                    }
                }
                block.requirements = requirements.toArray(ItemStack);
            }
        });
    }

    Vars.ui.settings.addCategory("Container Chaining", cons(table => {
        table.checkPref(stopCoresAtCapacitySetting, false, value => {
            Vars.ui.showConfirm(
                "Restart required",
                "Restart Mindustry now to apply this setting and the incinerator cost change?",
                () => Core.app.exit()
            );
        });
    }));

    Vars.content.blocks().each(block => {
        if (block instanceof StorageBlock) {
            
            block.coreMerge = true;
            
            if (block instanceof CoreBlock) {
                block.buildType = chainCoreBuilding(block);
            } else {
                block.buildType = chainContainerBuilding(block);
            }
        }
    });
}));
