#[starknet::contract]
mod SimpleStorage {

    #[storage]
    struct Storage {
        /// The data being stored
        stored_data: u128,
        /// The address of the L1 contract that updated the data
        modified_by_l1: felt252,
    }

    /// Sets everything to zero to start off
    #[constructor]
    fn constructor(ref self: ContractState) {
        self.stored_data.write(0);
        self.modified_by_l1.write(0);
    }

    /// Updates the currently stored value and resets [modified_by_l1](self)
    #[external(v0)]
    fn set(ref self: ContractState, val: u128) {
        self.stored_data.write(val);
        self.modified_by_l1.write(0);
    }

    /// Returns currently stored value
    #[external(v0)]
    fn get(self: @ContractState) -> u128 {
        self.stored_data.read()
    }

    /// Returns last [modified_by_l1](self) value
    /// Note that if the last value has been set manually, `modified_by_l1` is effectively 0.
    #[external(v0)]
    fn get_modified_by_l1(self: @ContractState) -> felt252 {
        self.modified_by_l1.read()
    }

    /// Processes value updates sent from L1.
    /// Updates using L1 messages will trigger an update for [modified_by_l1](self) attribute,
    /// effectively setting its value to the L1 contract address.
    #[l1_handler]
    fn handle_message(ref self: ContractState, from_address: felt252, arg: u128) {
        self.stored_data.write(arg);
        self.modified_by_l1.write(from_address);
    }

}