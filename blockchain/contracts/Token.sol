// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    /// @dev Constructor of erc20 token contract
    /// @param name Name of token
    /// @param symbol Symbol of token
    /// @param initialAmount Amount of tokens created initially on the wallet of the contract creator
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialAmount
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialAmount);
    }
}
