using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AccessLayer.Ef;

namespace Sticky.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StickersController : ControllerBase
    {
        private readonly StickyDBContext _context;

        public StickersController(StickyDBContext context)
        {
            _context = context;
        }

        // GET: api/stickers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sticker>>> GetSticker()
        {
            var stickers = await _context
                .Sticker
                .OrderBy(f => f.Num)
                .ToListAsync();

            return stickers;
        }

        // GET: api/stickers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sticker>> GetSticker(int id)
        {
            var sticker = await _context.Sticker.FindAsync(id);

            if (sticker == null)
            {
                return NotFound();
            }

            return sticker;
        }

        // PUT: api/stickers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSticker(int id, Sticker sticker)
        {
            if (id != sticker.Id)
            {
                return BadRequest();
            }

            _context.Entry(sticker).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StickerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/stickers
        [HttpPost]
        public async Task<ActionResult<Sticker>> PostSticker(Sticker sticker)
        {
            _context.Sticker.Add(sticker);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSticker", new { id = sticker.Id }, sticker);
        }

        // DELETE: api/stickers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sticker>> DeleteSticker(int id)
        {
            var sticker = await _context
                .Sticker
                .FindAsync(id);

            if (sticker == null)
            {
                return NotFound();
            }

            _context.Sticker.Remove(sticker);
            await _context.SaveChangesAsync();

            return sticker;
        }

        private bool StickerExists(int id)
        {
            return _context
                .Sticker
                .Any(e => e.Id == id);
        }
    }
}
