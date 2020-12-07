function pront()print("New Version Available\nPlease Update Script Link Download On My Telegram\nJoin Telegram: https://t.me/droidtamvanreal")end
data = false
if data == false then
  local menu = gg.alert('New Version Available\nPlease Update Script Link Download On My Telegram\nJoin Telegram: https://t.me/droidtamvanreal', 'Copy Link Telegram', 'Exit')
  if menu == 0 then
    pront() error() os.exit()
  elseif menu == 1 then
    gg.copyText('https://t.me/droidtamvanreal') pront() error() os.exit()
  elseif menu == 2 then
    pront() error() os.exit()
  end
  pront()
  error()
  os.exit()
end
