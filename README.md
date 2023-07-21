```ts
 <TextInput
      id={"ws_name"}
      onReg={{ reg: regWorkspaceName, errorCode: "workspaceNameEntered" }}
      onRegFunction={() => {handlerWorkspaceNameValidFunction(4)}}
      onChange={debounce("name")}
      value={value.name}
      debounce={true}
      isRequ={true}
      name={"name"}
      //onKeyDown={enterKey}
  />
```
