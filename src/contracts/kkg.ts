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

export type GameResults = {
    $$type: 'GameResults';
    player1: Address;
}

export function storeGameResults(src: GameResults) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.player1);
    };
}

export function loadGameResults(slice: Slice) {
    let sc_0 = slice;
    let _player1 = sc_0.loadAddress();
    return { $$type: 'GameResults' as const, player1: _player1 };
}

function loadTupleGameResults(source: TupleReader) {
    let _player1 = source.readAddress();
    return { $$type: 'GameResults' as const, player1: _player1 };
}

function storeTupleGameResults(source: GameResults) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.player1);
    return builder.build();
}

function dictValueParserGameResults(): DictionaryValue<GameResults> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGameResults(src)).endCell());
        },
        parse: (src) => {
            return loadGameResults(src.loadRef().beginParse());
        }
    }
}

export type GameListFinish = {
    $$type: 'GameListFinish';
    list: Dictionary<bigint, Game>;
}

export function storeGameListFinish(src: GameListFinish) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(89072877, 32);
        b_0.storeDict(src.list, Dictionary.Keys.BigUint(256), dictValueParserGame());
    };
}

export function loadGameListFinish(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 89072877) { throw Error('Invalid prefix'); }
    let _list = Dictionary.load(Dictionary.Keys.BigUint(256), dictValueParserGame(), sc_0);
    return { $$type: 'GameListFinish' as const, list: _list };
}

function loadTupleGameListFinish(source: TupleReader) {
    let _list = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), dictValueParserGame(), source.readCellOpt());
    return { $$type: 'GameListFinish' as const, list: _list };
}

function storeTupleGameListFinish(source: GameListFinish) {
    let builder = new TupleBuilder();
    builder.writeCell(source.list.size > 0 ? beginCell().storeDictDirect(source.list, Dictionary.Keys.BigUint(256), dictValueParserGame()).endCell() : null);
    return builder.build();
}

function dictValueParserGameListFinish(): DictionaryValue<GameListFinish> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGameListFinish(src)).endCell());
        },
        parse: (src) => {
            return loadGameListFinish(src.loadRef().beginParse());
        }
    }
}

export type GameListActive = {
    $$type: 'GameListActive';
    list: Dictionary<bigint, Game>;
}

export function storeGameListActive(src: GameListActive) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2540337212, 32);
        b_0.storeDict(src.list, Dictionary.Keys.BigUint(256), dictValueParserGame());
    };
}

export function loadGameListActive(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2540337212) { throw Error('Invalid prefix'); }
    let _list = Dictionary.load(Dictionary.Keys.BigUint(256), dictValueParserGame(), sc_0);
    return { $$type: 'GameListActive' as const, list: _list };
}

function loadTupleGameListActive(source: TupleReader) {
    let _list = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), dictValueParserGame(), source.readCellOpt());
    return { $$type: 'GameListActive' as const, list: _list };
}

function storeTupleGameListActive(source: GameListActive) {
    let builder = new TupleBuilder();
    builder.writeCell(source.list.size > 0 ? beginCell().storeDictDirect(source.list, Dictionary.Keys.BigUint(256), dictValueParserGame()).endCell() : null);
    return builder.build();
}

function dictValueParserGameListActive(): DictionaryValue<GameListActive> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGameListActive(src)).endCell());
        },
        parse: (src) => {
            return loadGameListActive(src.loadRef().beginParse());
        }
    }
}

export type GameListWaiting = {
    $$type: 'GameListWaiting';
    list: Dictionary<bigint, Game>;
}

export function storeGameListWaiting(src: GameListWaiting) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3903868703, 32);
        b_0.storeDict(src.list, Dictionary.Keys.BigUint(256), dictValueParserGame());
    };
}

export function loadGameListWaiting(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3903868703) { throw Error('Invalid prefix'); }
    let _list = Dictionary.load(Dictionary.Keys.BigUint(256), dictValueParserGame(), sc_0);
    return { $$type: 'GameListWaiting' as const, list: _list };
}

function loadTupleGameListWaiting(source: TupleReader) {
    let _list = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), dictValueParserGame(), source.readCellOpt());
    return { $$type: 'GameListWaiting' as const, list: _list };
}

function storeTupleGameListWaiting(source: GameListWaiting) {
    let builder = new TupleBuilder();
    builder.writeCell(source.list.size > 0 ? beginCell().storeDictDirect(source.list, Dictionary.Keys.BigUint(256), dictValueParserGame()).endCell() : null);
    return builder.build();
}

function dictValueParserGameListWaiting(): DictionaryValue<GameListWaiting> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGameListWaiting(src)).endCell());
        },
        parse: (src) => {
            return loadGameListWaiting(src.loadRef().beginParse());
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

export type StopGame = {
    $$type: 'StopGame';
    gameId: bigint;
}

export function storeStopGame(src: StopGame) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3405909699, 32);
        b_0.storeUint(src.gameId, 256);
    };
}

export function loadStopGame(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3405909699) { throw Error('Invalid prefix'); }
    let _gameId = sc_0.loadUintBig(256);
    return { $$type: 'StopGame' as const, gameId: _gameId };
}

function loadTupleStopGame(source: TupleReader) {
    let _gameId = source.readBigNumber();
    return { $$type: 'StopGame' as const, gameId: _gameId };
}

function storeTupleStopGame(source: StopGame) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.gameId);
    return builder.build();
}

function dictValueParserStopGame(): DictionaryValue<StopGame> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStopGame(src)).endCell());
        },
        parse: (src) => {
            return loadStopGame(src.loadRef().beginParse());
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
    const __system = Cell.fromBase64('te6cckECUgEAD5YAAQHAAQEFoJ0fAgEU/wD0pBP0vPLICwMCAWIuBAIBIBoFAgEgEgYCASAPBwIBIA0IAgEgCwkCFa7K7Z4qg+2eNkDAUAoBdoEwZfhCKccF8vSBAQElAln0DW+hkjBt3yBukjBtjofQ2zxsH28P4iBu8tCAby8Qvl8OIG7y0IBvIzAxTQIRrCrtnm2eNkDAUAwAAiECEbBF9s82zxsgYFAOAAIlAgEgERAAdbJu40NWlwZnM6Ly9RbVF5R2t0VGYzSzU2bVZaQ2dyYW00eFZ2YUNNdWl6czFiQ0xuRlQ4MmlZZXNrggABGwr7tRNDSAAGACASAXEwICdhUUANunowTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwThOy6ctWadluZ0HSzbKM3RSQTh5c7/V80L0FnItVoVdgtilQTggZzq084r86ShYDrC3EyPZQIPphW2ebZ42QNQFgACIgIRttgbZ5tnjZAwUBgBDvgnbxB52zwZANogwQEhwk2x8tCGyCLBAJiALQHLBwKjAt5/cG8ABI4bBHqpDCDAAFIwsLObcDOmMBRvjASkBAORMOIE5AGzlwKALm+MAqTejhADeqkMpjATb4wDpCLAABA05jMipQOaUxJvgQHLBwKlAuRsIcnQAgEgKRsCASAnHAIBIB8dAhGypPbPNs8bIGBQHgACIAIRsya2zzbPGyBgUCACWG1xkyDBZY8iJYEBASJZ9A1voZIwbd8gbpIwbY6H0Ns8bB9vD+Jus+MApOgwTSED/iWBAQEiWfQNb6GSMG3fIG6SMG2Oh9DbPGwfbw/iIG7y0IBvL3BTAZIxDpE/4k8NTBoIBkS0UJ8XFVQTDVYRbVWwVhJus44ePBERIG7y0IBvIxERklcRkTDiAgEREAEPbwMQ7wkNmQIREgJXEFcQMOJVHYEBAREQyBEQVeDbPMlNIyIAJiIQNAEgbpUwWfRaMJRBM/QV4gEC4AMREANP7Vog10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYibrOXfwHKABLLB5UycFjKAOLKAClus5Y5cFAJygDjDRfL/wXIy/8Uy/9YINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFgmJAH+IG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuJYIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuJQAyBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiEyUAVMsHFssHFMoAEsoAyCJus5p/AcoAEoEBAc8AlTJwWMoA4skBzMlYzMkBzACCfwHKAAkgbvLQgG8jEDtaINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WIm6zl38BygASyweVMnBYygDiygACEbSju2ebZ42QMFAoAAImAgEgLCoCFbSi+2eKoPtnjZAwUCsBZIEwZfhCKccF8vSBAQElAln0DW+hkjBt3yBukjBtjofQ2zxsH28P4iBu8tCAby8Q3l8OTQIRtcG7Z5tnjZAwUC0AFoEwZfhCKMcF8vQjA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVF9s88uCCUDAvAJDI+EMBzH8BygBVcFB4gQEBzwBQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhPLH8sf9ADL/wHIy/8S9ADJAczJ7VQE4O2i7fsBkjB/4HAh10nCH5UwINcLH94gghAxxsxGuo4UMNMfAYIQMcbMRrry4IHTHwExNn/gIIIQ6QElAbqOmjDTHwGCEOkBJQG68uCB0//TH9MH0/9VMGwU4CCCEJRqmLa64wIgghCBnb6ZuuMCwAA+OjgxAQqRMOMNcDIE9vkBIILwJQt24rlXb8a0xFEpSDAGsAA6DDm2965BPRd/TjR528q6joYw2zx/2zHgIILwvrKTWoIImxVNMvmcQ3eqlgqhFTZswsYCdV42uX9QXOy64wIggvD3DV15ru6bNKhZQatFeBKaWzKw4XgOnFWH8NrlqgQ72rrjAjY1NDMAaILwmw4rfX3Cc9CaL3u5j1i2I2GCHL3zKeVSmMCG27rEQRa6nzCBMGX4QifHBfL0bX/bMeAAKDBsMYEwZfhCJccF8vRwIG0Df9sxAVowgTyV+EJSgMcF8vT4Qn/4J28Q+EFvJBNfA6GCCJiWgKGAQhAjbW1t2zx/2zE8AsSBAQv4QiJZgQEBQTP0Cm+hlAHXADCSW23iIG7y0ID4QW8kE18DoYIImJaAoYIA1VchwgDy9IEBC/hCECNwgQEBIW6VW1n0WTCYyAHPAEEz9EHi+EJ/I4BCECNtbW3bPPhCEjw3AI7IWYIQLg8lG1ADyx8B+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AALuMNMfAYIQgZ2+mbry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBJVcds8NlGHyFmCEDJ7K0pQA8sfyz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyRBoEEYQNUQw+EIBf23bPH85OwAS+EJScMcF8uCEAVAw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/OwE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zw8AcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AD0AmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwD7IF/1PhBbyQTXwMiuvL0ggCQXyLAAfL0gQEL+EImWYEBAUEz9ApvoZQB1wAwkltt4m6OHoEBC/hCECZwgQEBIW6VW1n0WTCYyAHPAEEz9EHiBN4ngQEBJVn0DW+hkjBt3yBukjBtjofQ2zxsH28P4iBu4w9QI39NSD8CwiAgbvLQgG8vEI5fDsADkjB/nSBu8tCAby8Qjl8OwALijr34QlADf21x+EJtbW0kKxCsEJsQigcJcHAREqQREaRV0IEBARETyFXg2zzJEDZFUCBulTBZ9FowlEEz9BXi4w5JQAPmWyWBAQEjWfQNb6GSMG3fIG6SMG2Oh9DbPGwfbw/iIG7y0IBvLzA1NjiBf9T4QW8kE18DKLry9PhCUAx/bwNUepAgbvLQgG8jMFYXJMcFjh9sIjNWFHMkcSFukltwkbrikTSbBHIhbpJbcJG64jDi4w4gbk1GQQP+jvc9gQELLSBu8tCAVhBZgQEBQTP0Cm+hlAHXADCSW23iIG7y0ICBAQsuIG7y0IBRKaApVheoVhapBKADEREDEoEBASFulVtZ9FkwmMgBzwBBM/RB4ojIgljAAAAAAAAAAAAAAAABActnzMlw+wAsfxESpQ4REA5O4OMNEDoQR0VDQgFUBREQBRAkERAeQzCBAQERE8hV4Ns8yRA2RVAgbpUwWfRaMJRBM/QV4kEwSQH6U8IgbvLQgG8jW1YRgQELI4EBAUEz9ApvoZQB1wAwkltt4iBu8tCAVhKBAQskgQEBQTP0Cm+hlAHXADCSW23iIG7y0ICBAQssVhqoVhmpBBOgAxEUAxSBAQEhbpVbWfRZMJjIAc8AQTP0QeKBAQsqVhioVhepBBOgEwEREgFEADKBAQEhbpVbWfRZMJjIAc8AQTP0QeJ/ERKlACYAAAAAd2luZXIgZ290IG1vbmV5Af5WFyLHBY52ICBu8tCAUjAhbpJbcJG64pRfBHJtjl01IXEhbpJbcJG64pokciFukltwkbrikXDikX+OGCFyIW6SW3CRuuKaJHMhbpJbcJG64pFw4uKTMTN/jhkBcyFukltwkbrimgNxIW6SW3CRuuKSM3Di4pFzkgJz4gHiE+MNRwA8WzNWFHMkcSFukltwkbrikTSbBHIhbpJbcJG64jDiAXww+EJQA39tcfhCbW1tJCsQrBCbEIoHCXBwERKkERGkVdCBAQERE8hV4Ns8yRA2RVAgbpUwWfRaMJRBM/QV4kkC3BA/TtxaINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WIm6zl38BygASyweVMnBYygDiygAobrOWOHBQCMoA4w0Wy/8EyMv/E8v/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshYTEoB/iBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiUAMgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4lADIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuJLACIWywcUywcSygDKAMlYzMkBzACCfwHKAAggbvLQgG8jEDpaINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WIm6zl38BygASyweVMnBYygDiygAB4vpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gABktMHkm0B4tIAVSAD0gABjjD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIAAZLTB5JtAeLSAFUgbwORbeIB0//UAdDT/9P/TgH2+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUMND6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iAfpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIBTwB2+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gHTB9MH0gDSADAQrxCsEKsByu1E0NQB+GPSAAGOQ4EBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTH9Mf9ATT/9QB0NP/9AQwECgQJxAmECUQJBAjbBjg+CjXCwqDCbry4ImBAQHXAAEB0ds8UQAebW34QnBUEwCAXwSAZFUwycZVrg==');
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
    {"name":"GameResults","header":null,"fields":[{"name":"player1","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GameListFinish","header":89072877,"fields":[{"name":"list","type":{"kind":"dict","key":"uint","keyFormat":256,"value":"Game","valueFormat":"ref"}}]},
    {"name":"GameListActive","header":2540337212,"fields":[{"name":"list","type":{"kind":"dict","key":"uint","keyFormat":256,"value":"Game","valueFormat":"ref"}}]},
    {"name":"GameListWaiting","header":3903868703,"fields":[{"name":"list","type":{"kind":"dict","key":"uint","keyFormat":256,"value":"Game","valueFormat":"ref"}}]},
    {"name":"JoinGame","header":3909166337,"fields":[{"name":"gameId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"move","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"count","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"betAmount","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"StopGame","header":3405909699,"fields":[{"name":"gameId","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"Fee","header":835112006,"fields":[{"name":"fee","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"TransferEvent","header":772744475,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"recipient","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Withdraw","header":195467089,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
]

const SimpleCounter_getters: ABIGetter[] = [
    {"name":"gameListActive","arguments":[],"returnType":{"kind":"dict","key":"int","value":"GameSafe","valueFormat":"ref"}},
    {"name":"gameListActiveUnSafe","arguments":[],"returnType":{"kind":"dict","key":"int","value":"Game","valueFormat":"ref"}},
    {"name":"gamesActiveCounts","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"gamesCounts","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"gamesPlay1Choice","arguments":[{"name":"gameId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"gamesPlay2Choice","arguments":[{"name":"gameId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"fee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"balanceOf","arguments":[],"returnType":{"kind":"dict","key":"address","value":"int"}},
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
    
    async getGameListActive(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('gameListActive', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserGameSafe(), source.readCellOpt());
        return result;
    }
    
    async getGameListActiveUnSafe(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('gameListActiveUnSafe', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserGame(), source.readCellOpt());
        return result;
    }
    
    async getGamesActiveCounts(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('gamesActiveCounts', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGamesCounts(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('gamesCounts', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGamesPlay1Choice(provider: ContractProvider, gameId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(gameId);
        let source = (await provider.get('gamesPlay1Choice', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getGamesPlay2Choice(provider: ContractProvider, gameId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(gameId);
        let source = (await provider.get('gamesPlay2Choice', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getFee(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('fee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getBalanceOf(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balanceOf', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}