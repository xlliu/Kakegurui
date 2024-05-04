import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Player = {
    $$type: 'Player';
    addr: Address;
    choice: bigint | null;
    ready: boolean;
}

export function storePlayer(src: Player) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.addr);
        if (src.choice !== null && src.choice !== undefined) { b_0.storeBit(true).storeUint(src.choice, 8); } else { b_0.storeBit(false); }
        b_0.storeBit(src.ready);
    };
}

export function loadPlayer(slice: Slice) {
    let sc_0 = slice;
    let _addr = sc_0.loadAddress();
    let _choice = sc_0.loadBit() ? sc_0.loadUintBig(8) : null;
    let _ready = sc_0.loadBit();
    return { $$type: 'Player' as const, addr: _addr, choice: _choice, ready: _ready };
}

function loadTuplePlayer(source: TupleReader) {
    let _addr = source.readAddress();
    let _choice = source.readBigNumberOpt();
    let _ready = source.readBoolean();
    return { $$type: 'Player' as const, addr: _addr, choice: _choice, ready: _ready };
}

function storeTuplePlayer(source: Player) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.addr);
    builder.writeNumber(source.choice);
    builder.writeBoolean(source.ready);
    return builder.build();
}

function dictValueParserPlayer(): DictionaryValue<Player> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePlayer(src)).endCell());
        },
        parse: (src) => {
            return loadPlayer(src.loadRef().beginParse());
        }
    }
}

export type Game = {
    $$type: 'Game';
    player1: Player;
    player2: Player | null;
    betAmount: bigint;
    currentBetAmount: bigint;
    status: bigint;
    creater: Address;
    win_addr: Address | null;
    lose_addr: Address | null;
    win_last_addr: Address | null;
    current_count: bigint;
    count: bigint;
    lose_stop: boolean;
    finish: boolean;
}

export function storeGame(src: Game) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.store(storePlayer(src.player1));
        if (src.player2 !== null && src.player2 !== undefined) { b_0.storeBit(true); b_0.store(storePlayer(src.player2)); } else { b_0.storeBit(false); }
        b_0.storeUint(src.betAmount, 256);
        let b_1 = new Builder();
        b_1.storeUint(src.currentBetAmount, 256);
        b_1.storeUint(src.status, 256);
        b_1.storeAddress(src.creater);
        let b_2 = new Builder();
        b_2.storeAddress(src.win_addr);
        b_2.storeAddress(src.lose_addr);
        b_2.storeAddress(src.win_last_addr);
        b_2.storeUint(src.current_count, 8);
        b_2.storeUint(src.count, 8);
        b_2.storeBit(src.lose_stop);
        b_2.storeBit(src.finish);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGame(slice: Slice) {
    let sc_0 = slice;
    let _player1 = loadPlayer(sc_0);
    let _player2 = sc_0.loadBit() ? loadPlayer(sc_0) : null;
    let _betAmount = sc_0.loadUintBig(256);
    let sc_1 = sc_0.loadRef().beginParse();
    let _currentBetAmount = sc_1.loadUintBig(256);
    let _status = sc_1.loadUintBig(256);
    let _creater = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _win_addr = sc_2.loadMaybeAddress();
    let _lose_addr = sc_2.loadMaybeAddress();
    let _win_last_addr = sc_2.loadMaybeAddress();
    let _current_count = sc_2.loadUintBig(8);
    let _count = sc_2.loadUintBig(8);
    let _lose_stop = sc_2.loadBit();
    let _finish = sc_2.loadBit();
    return { $$type: 'Game' as const, player1: _player1, player2: _player2, betAmount: _betAmount, currentBetAmount: _currentBetAmount, status: _status, creater: _creater, win_addr: _win_addr, lose_addr: _lose_addr, win_last_addr: _win_last_addr, current_count: _current_count, count: _count, lose_stop: _lose_stop, finish: _finish };
}

function loadTupleGame(source: TupleReader) {
    const _player1 = loadTuplePlayer(source.readTuple());
    const _player2_p = source.readTupleOpt();
    const _player2 = _player2_p ? loadTuplePlayer(_player2_p) : null;
    let _betAmount = source.readBigNumber();
    let _currentBetAmount = source.readBigNumber();
    let _status = source.readBigNumber();
    let _creater = source.readAddress();
    let _win_addr = source.readAddressOpt();
    let _lose_addr = source.readAddressOpt();
    let _win_last_addr = source.readAddressOpt();
    let _current_count = source.readBigNumber();
    let _count = source.readBigNumber();
    let _lose_stop = source.readBoolean();
    let _finish = source.readBoolean();
    return { $$type: 'Game' as const, player1: _player1, player2: _player2, betAmount: _betAmount, currentBetAmount: _currentBetAmount, status: _status, creater: _creater, win_addr: _win_addr, lose_addr: _lose_addr, win_last_addr: _win_last_addr, current_count: _current_count, count: _count, lose_stop: _lose_stop, finish: _finish };
}

function storeTupleGame(source: Game) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTuplePlayer(source.player1));
    if (source.player2 !== null && source.player2 !== undefined) {
        builder.writeTuple(storeTuplePlayer(source.player2));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.betAmount);
    builder.writeNumber(source.currentBetAmount);
    builder.writeNumber(source.status);
    builder.writeAddress(source.creater);
    builder.writeAddress(source.win_addr);
    builder.writeAddress(source.lose_addr);
    builder.writeAddress(source.win_last_addr);
    builder.writeNumber(source.current_count);
    builder.writeNumber(source.count);
    builder.writeBoolean(source.lose_stop);
    builder.writeBoolean(source.finish);
    return builder.build();
}

function dictValueParserGame(): DictionaryValue<Game> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGame(src)).endCell());
        },
        parse: (src) => {
            return loadGame(src.loadRef().beginParse());
        }
    }
}

export type GameSafe = {
    $$type: 'GameSafe';
    player1: Player;
    player2: Player | null;
    betAmount: bigint;
    currentBetAmount: bigint;
    status: bigint;
    creater: Address;
    win_addr: Address | null;
    lose_addr: Address | null;
    win_last_addr: Address | null;
    current_count: bigint;
    count: bigint;
    lose_stop: boolean;
    finish: boolean;
    roomId: bigint | null;
}

export function storeGameSafe(src: GameSafe) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.store(storePlayer(src.player1));
        if (src.player2 !== null && src.player2 !== undefined) { b_0.storeBit(true); b_0.store(storePlayer(src.player2)); } else { b_0.storeBit(false); }
        b_0.storeUint(src.betAmount, 256);
        let b_1 = new Builder();
        b_1.storeUint(src.currentBetAmount, 256);
        b_1.storeUint(src.status, 256);
        b_1.storeAddress(src.creater);
        let b_2 = new Builder();
        b_2.storeAddress(src.win_addr);
        b_2.storeAddress(src.lose_addr);
        b_2.storeAddress(src.win_last_addr);
        b_2.storeUint(src.current_count, 8);
        b_2.storeUint(src.count, 8);
        b_2.storeBit(src.lose_stop);
        b_2.storeBit(src.finish);
        let b_3 = new Builder();
        if (src.roomId !== null && src.roomId !== undefined) { b_3.storeBit(true).storeInt(src.roomId, 257); } else { b_3.storeBit(false); }
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGameSafe(slice: Slice) {
    let sc_0 = slice;
    let _player1 = loadPlayer(sc_0);
    let _player2 = sc_0.loadBit() ? loadPlayer(sc_0) : null;
    let _betAmount = sc_0.loadUintBig(256);
    let sc_1 = sc_0.loadRef().beginParse();
    let _currentBetAmount = sc_1.loadUintBig(256);
    let _status = sc_1.loadUintBig(256);
    let _creater = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _win_addr = sc_2.loadMaybeAddress();
    let _lose_addr = sc_2.loadMaybeAddress();
    let _win_last_addr = sc_2.loadMaybeAddress();
    let _current_count = sc_2.loadUintBig(8);
    let _count = sc_2.loadUintBig(8);
    let _lose_stop = sc_2.loadBit();
    let _finish = sc_2.loadBit();
    let sc_3 = sc_2.loadRef().beginParse();
    let _roomId = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    return { $$type: 'GameSafe' as const, player1: _player1, player2: _player2, betAmount: _betAmount, currentBetAmount: _currentBetAmount, status: _status, creater: _creater, win_addr: _win_addr, lose_addr: _lose_addr, win_last_addr: _win_last_addr, current_count: _current_count, count: _count, lose_stop: _lose_stop, finish: _finish, roomId: _roomId };
}

function loadTupleGameSafe(source: TupleReader) {
    const _player1 = loadTuplePlayer(source.readTuple());
    const _player2_p = source.readTupleOpt();
    const _player2 = _player2_p ? loadTuplePlayer(_player2_p) : null;
    let _betAmount = source.readBigNumber();
    let _currentBetAmount = source.readBigNumber();
    let _status = source.readBigNumber();
    let _creater = source.readAddress();
    let _win_addr = source.readAddressOpt();
    let _lose_addr = source.readAddressOpt();
    let _win_last_addr = source.readAddressOpt();
    let _current_count = source.readBigNumber();
    let _count = source.readBigNumber();
    let _lose_stop = source.readBoolean();
    let _finish = source.readBoolean();
    let _roomId = source.readBigNumberOpt();
    return { $$type: 'GameSafe' as const, player1: _player1, player2: _player2, betAmount: _betAmount, currentBetAmount: _currentBetAmount, status: _status, creater: _creater, win_addr: _win_addr, lose_addr: _lose_addr, win_last_addr: _win_last_addr, current_count: _current_count, count: _count, lose_stop: _lose_stop, finish: _finish, roomId: _roomId };
}

function storeTupleGameSafe(source: GameSafe) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTuplePlayer(source.player1));
    if (source.player2 !== null && source.player2 !== undefined) {
        builder.writeTuple(storeTuplePlayer(source.player2));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.betAmount);
    builder.writeNumber(source.currentBetAmount);
    builder.writeNumber(source.status);
    builder.writeAddress(source.creater);
    builder.writeAddress(source.win_addr);
    builder.writeAddress(source.lose_addr);
    builder.writeAddress(source.win_last_addr);
    builder.writeNumber(source.current_count);
    builder.writeNumber(source.count);
    builder.writeBoolean(source.lose_stop);
    builder.writeBoolean(source.finish);
    builder.writeNumber(source.roomId);
    return builder.build();
}

function dictValueParserGameSafe(): DictionaryValue<GameSafe> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGameSafe(src)).endCell());
        },
        parse: (src) => {
            return loadGameSafe(src.loadRef().beginParse());
        }
    }
}

export type JoinGame = {
    $$type: 'JoinGame';
    gameId: bigint;
    move: bigint;
    count: bigint;
    betAmount: bigint;
}

export function storeJoinGame(src: JoinGame) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3909166337, 32);
        b_0.storeUint(src.gameId, 256);
        b_0.storeUint(src.move, 32);
        b_0.storeUint(src.count, 8);
        b_0.storeUint(src.betAmount, 256);
    };
}

export function loadJoinGame(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3909166337) { throw Error('Invalid prefix'); }
    let _gameId = sc_0.loadUintBig(256);
    let _move = sc_0.loadUintBig(32);
    let _count = sc_0.loadUintBig(8);
    let _betAmount = sc_0.loadUintBig(256);
    return { $$type: 'JoinGame' as const, gameId: _gameId, move: _move, count: _count, betAmount: _betAmount };
}

function loadTupleJoinGame(source: TupleReader) {
    let _gameId = source.readBigNumber();
    let _move = source.readBigNumber();
    let _count = source.readBigNumber();
    let _betAmount = source.readBigNumber();
    return { $$type: 'JoinGame' as const, gameId: _gameId, move: _move, count: _count, betAmount: _betAmount };
}

function storeTupleJoinGame(source: JoinGame) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.gameId);
    builder.writeNumber(source.move);
    builder.writeNumber(source.count);
    builder.writeNumber(source.betAmount);
    return builder.build();
}

function dictValueParserJoinGame(): DictionaryValue<JoinGame> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJoinGame(src)).endCell());
        },
        parse: (src) => {
            return loadJoinGame(src.loadRef().beginParse());
        }
    }
}

export type Fee = {
    $$type: 'Fee';
    fee: bigint;
}

export function storeFee(src: Fee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(835112006, 32);
        b_0.storeUint(src.fee, 32);
    };
}

export function loadFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 835112006) { throw Error('Invalid prefix'); }
    let _fee = sc_0.loadUintBig(32);
    return { $$type: 'Fee' as const, fee: _fee };
}

function loadTupleFee(source: TupleReader) {
    let _fee = source.readBigNumber();
    return { $$type: 'Fee' as const, fee: _fee };
}

function storeTupleFee(source: Fee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.fee);
    return builder.build();
}

function dictValueParserFee(): DictionaryValue<Fee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFee(src)).endCell());
        },
        parse: (src) => {
            return loadFee(src.loadRef().beginParse());
        }
    }
}

export type TransferEvent = {
    $$type: 'TransferEvent';
    amount: bigint;
    recipient: Address;
}

export function storeTransferEvent(src: TransferEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(772744475, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.recipient);
    };
}

export function loadTransferEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 772744475) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _recipient = sc_0.loadAddress();
    return { $$type: 'TransferEvent' as const, amount: _amount, recipient: _recipient };
}

function loadTupleTransferEvent(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _recipient = source.readAddress();
    return { $$type: 'TransferEvent' as const, amount: _amount, recipient: _recipient };
}

function storeTupleTransferEvent(source: TransferEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.recipient);
    return builder.build();
}

function dictValueParserTransferEvent(): DictionaryValue<TransferEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTransferEvent(src)).endCell());
        },
        parse: (src) => {
            return loadTransferEvent(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    amount: bigint;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(195467089, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 195467089) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function loadTupleWithdraw(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function storeTupleWithdraw(source: Withdraw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}

export type Resp = {
    $$type: 'Resp';
    balanceOf: Dictionary<Address, bigint>;
    fee: bigint;
    balance: string;
    gameListActive: Dictionary<bigint, GameSafe>;
    gamesActiveCounts: bigint;
    gamesCounts: bigint;
}

export function storeResp(src: Resp) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2657867789, 32);
        b_0.storeDict(src.balanceOf, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_0.storeInt(src.fee, 257);
        b_0.storeStringRefTail(src.balance);
        b_0.storeDict(src.gameListActive, Dictionary.Keys.BigInt(257), dictValueParserGameSafe());
        b_0.storeInt(src.gamesActiveCounts, 257);
        b_0.storeInt(src.gamesCounts, 257);
    };
}

export function loadResp(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2657867789) { throw Error('Invalid prefix'); }
    let _balanceOf = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
    let _fee = sc_0.loadIntBig(257);
    let _balance = sc_0.loadStringRefTail();
    let _gameListActive = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserGameSafe(), sc_0);
    let _gamesActiveCounts = sc_0.loadIntBig(257);
    let _gamesCounts = sc_0.loadIntBig(257);
    return { $$type: 'Resp' as const, balanceOf: _balanceOf, fee: _fee, balance: _balance, gameListActive: _gameListActive, gamesActiveCounts: _gamesActiveCounts, gamesCounts: _gamesCounts };
}

function loadTupleResp(source: TupleReader) {
    let _balanceOf = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _fee = source.readBigNumber();
    let _balance = source.readString();
    let _gameListActive = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserGameSafe(), source.readCellOpt());
    let _gamesActiveCounts = source.readBigNumber();
    let _gamesCounts = source.readBigNumber();
    return { $$type: 'Resp' as const, balanceOf: _balanceOf, fee: _fee, balance: _balance, gameListActive: _gameListActive, gamesActiveCounts: _gamesActiveCounts, gamesCounts: _gamesCounts };
}

function storeTupleResp(source: Resp) {
    let builder = new TupleBuilder();
    builder.writeCell(source.balanceOf.size > 0 ? beginCell().storeDictDirect(source.balanceOf, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeNumber(source.fee);
    builder.writeString(source.balance);
    builder.writeCell(source.gameListActive.size > 0 ? beginCell().storeDictDirect(source.gameListActive, Dictionary.Keys.BigInt(257), dictValueParserGameSafe()).endCell() : null);
    builder.writeNumber(source.gamesActiveCounts);
    builder.writeNumber(source.gamesCounts);
    return builder.build();
}

function dictValueParserResp(): DictionaryValue<Resp> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeResp(src)).endCell());
        },
        parse: (src) => {
            return loadResp(src.loadRef().beginParse());
        }
    }
}

 type SimpleCounter_init_args = {
    $$type: 'SimpleCounter_init_args';
    id: bigint;
}

function initSimpleCounter_init_args(src: SimpleCounter_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
    };
}

async function SimpleCounter_init(id: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initSimpleCounter_init_args({ $$type: 'SimpleCounter_init_args', id })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const SimpleCounter_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    12389: { message: `no permission` },
    15509: { message: `Only deployer is allowed to withdraw` },
    32724: { message: `bet amount is not true` },
    36959: { message: `game round only can 1` },
    40368: { message: `Contract stopped` },
    53296: { message: `Contract not stopped` },
    54615: { message: `Insufficient balance` },
}

const SimpleCounter_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Player","header":null,"fields":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}},{"name":"choice","type":{"kind":"simple","type":"uint","optional":true,"format":8}},{"name":"ready","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"Game","header":null,"fields":[{"name":"player1","type":{"kind":"simple","type":"Player","optional":false}},{"name":"player2","type":{"kind":"simple","type":"Player","optional":true}},{"name":"betAmount","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"currentBetAmount","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"status","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"creater","type":{"kind":"simple","type":"address","optional":false}},{"name":"win_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"lose_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"win_last_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"current_count","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"count","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"lose_stop","type":{"kind":"simple","type":"bool","optional":false}},{"name":"finish","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"GameSafe","header":null,"fields":[{"name":"player1","type":{"kind":"simple","type":"Player","optional":false}},{"name":"player2","type":{"kind":"simple","type":"Player","optional":true}},{"name":"betAmount","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"currentBetAmount","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"status","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"creater","type":{"kind":"simple","type":"address","optional":false}},{"name":"win_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"lose_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"win_last_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"current_count","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"count","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"lose_stop","type":{"kind":"simple","type":"bool","optional":false}},{"name":"finish","type":{"kind":"simple","type":"bool","optional":false}},{"name":"roomId","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"JoinGame","header":3909166337,"fields":[{"name":"gameId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"move","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"count","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"betAmount","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"Fee","header":835112006,"fields":[{"name":"fee","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"TransferEvent","header":772744475,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"recipient","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Withdraw","header":195467089,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Resp","header":2657867789,"fields":[{"name":"balanceOf","type":{"kind":"dict","key":"address","value":"int"}},{"name":"fee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"balance","type":{"kind":"simple","type":"string","optional":false}},{"name":"gameListActive","type":{"kind":"dict","key":"int","value":"GameSafe","valueFormat":"ref"}},{"name":"gamesActiveCounts","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"gamesCounts","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const SimpleCounter_getters: ABIGetter[] = [
    {"name":"gameListActiveUnSafe","arguments":[],"returnType":{"kind":"dict","key":"int","value":"Game","valueFormat":"ref"}},
    {"name":"respAll","arguments":[],"returnType":{"kind":"simple","type":"Resp","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const SimpleCounter_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Fee"}},
    {"receiver":"internal","message":{"kind":"text","text":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw safe"}},
    {"receiver":"internal","message":{"kind":"text","text":"ResetGame"}},
    {"receiver":"internal","message":{"kind":"text","text":"ResetBalances"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JoinGame"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
]

export default class SimpleCounter implements Contract {
    
    static async init(id: bigint) {
        return await SimpleCounter_init(id);
    }
    
    static async fromInit(id: bigint) {
        const init = await SimpleCounter_init(id);
        const address = contractAddress(0, init);
        return new SimpleCounter(address, init);
    }
    
    static fromAddress(address: Address) {
        return new SimpleCounter(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  SimpleCounter_types,
        getters: SimpleCounter_getters,
        receivers: SimpleCounter_receivers,
        errors: SimpleCounter_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Fee | 'Withdraw' | 'withdraw safe' | 'ResetGame' | 'ResetBalances' | JoinGame | Deploy | ChangeOwner) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Fee') {
            body = beginCell().store(storeFee(message)).endCell();
        }
        if (message === 'Withdraw') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'withdraw safe') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'ResetGame') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'ResetBalances') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JoinGame') {
            body = beginCell().store(storeJoinGame(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGameListActiveUnSafe(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('gameListActiveUnSafe', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserGame(), source.readCellOpt());
        return result;
    }
    
    async getRespAll(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('respAll', builder.build())).stack;
        const result = loadTupleResp(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}